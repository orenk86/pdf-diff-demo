import React, { createContext, useEffect, useState } from 'react';
import { calculateSimilarity, DiffReportType, generateDiff } from './generator';
import { extractTextFromFiles } from './extractor';
import { Change } from 'diff';

interface IMainAppContext {
  file1?: File;
  file2?: File;
  setFile1: (file: File) => void;
  setFile2: (file: File) => void;
  areFilesSelected: boolean;
  reportType: DiffReportType;
  setReportType: (type: DiffReportType) => void;
  texts?: string[];
  diffReport?: Change[];
  similarity?: number;
}

const MainAppContext = createContext<IMainAppContext>({
  setFile1: () => {},
  setFile2: () => {},
  reportType: DiffReportType.ByWord,
  setReportType: () => {},
  areFilesSelected: false,
})

export const MainAppContextProvider = (props: { children: React.ReactNode }) => {
  const [file1, setFile1] = useState<File | undefined>()
  const [file2, setFile2] = useState<File | undefined>()
  const [reportType, setReportType] = useState<DiffReportType>(DiffReportType.ByWord)
  const [texts, setTexts] = useState<string[] | undefined>([])
  const [diffReport, setDiffReport] = useState<Change[] | undefined>([])
  const [similarity, setSimilarity] = useState<number | undefined>()

  const areFilesSelected = !!file1 && !!file2;

  useEffect(() => {
    if (file1) {
      console.log('file1 selected', file1.name);
    }
  }, [file1]);

  useEffect(() => {
    if (file2) {
      console.log('file2 selected', file2.name);
    }
  }, [file2]);

  const generateDiffReport = async (type: DiffReportType) => {
    if (areFilesSelected) {
      const texts = await extractTextFromFiles([file1, file2])
      setTexts(texts);

      const diff = await generateDiff(texts[0], texts[1], type);
      setDiffReport(diff);

      const similarity = await calculateSimilarity(texts[0], texts[1]);
      setSimilarity(similarity);
    }
  }

  useEffect(() => {
    generateDiffReport(reportType)
      .then(() => {
        console.log('Diff report generated')
      });
  }, [file1, file2, reportType]);

  const value: IMainAppContext = {
    file1,
    file2,
    setFile1,
    setFile2,
    areFilesSelected,
    reportType,
    setReportType,
    texts,
    diffReport,
    similarity,
  }

  return (
    <MainAppContext.Provider value={value}>
      {props.children}
    </MainAppContext.Provider>
  )
}

const useMainAppContext = () => {
  const context = React.useContext(MainAppContext);
  if (!context) {
    throw new Error('useMainAppContext must be used within a MainAppContextProvider');
  }
  return context;
}

export default useMainAppContext;
