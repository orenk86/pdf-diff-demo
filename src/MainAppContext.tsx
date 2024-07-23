import React, { createContext, useEffect, useState } from 'react'
import { calculateSimilarity, DiffReportType, generateDiff } from './generator'
import { extractTextFromFile } from './extractor'
import { Change } from 'diff'

interface IMainAppContext {
  file1?: File
  file2?: File
  setFile1: (file: File) => void
  setFile2: (file: File) => void
  reportType: DiffReportType
  setReportType: (type: DiffReportType) => void
  text1?: string
  text2?: string
  setText1: (text: string) => void
  setText2: (text: string) => void
  diffReport?: Change[]
  similarity?: number
}

const MainAppContext = createContext<IMainAppContext>({
  setFile1: () => {},
  setFile2: () => {},
  setText1: () => {},
  setText2: () => {},
  reportType: DiffReportType.ByWord,
  setReportType: () => {},
})

export const MainAppContextProvider = (props: { children: React.ReactNode }) => {
  const [file1, setFile1] = useState<File | undefined>()
  const [file2, setFile2] = useState<File | undefined>()
  const [reportType, setReportType] = useState<DiffReportType>(DiffReportType.ByWord)
  const [text1, setText1] = useState<string | undefined>()
  const [text2, setText2] = useState<string | undefined>()
  const [diffReport, setDiffReport] = useState<Change[] | undefined>([])
  const [similarity, setSimilarity] = useState<number | undefined>()

  useEffect(() => {
    if (file1) {
      console.log('file1 selected', file1.name)
      extractTextFromFile(file1).then((text) => {
        setText1(text)
      })
    }
  }, [file1])

  useEffect(() => {
    if (file2) {
      console.log('file2 selected', file2.name)
      extractTextFromFile(file2).then((text) => {
        setText2(text)
      })
    }
  }, [file2])

  const generateDiffReport = async (type: DiffReportType) => {
    if (text1 !== undefined && text2 !== undefined) {
      const diff = await generateDiff(text1, text2, type)
      setDiffReport(diff)

      const similarity = await calculateSimilarity(text1, text2)
      setSimilarity(similarity)
    }
  }

  useEffect(() => {
    generateDiffReport(reportType)
      .then(() => {
        console.log('Diff report generated')
      })
  }, [text1, text2, reportType]);

  const value: IMainAppContext = {
    file1,
    file2,
    setFile1,
    setFile2,
    reportType,
    setReportType,
    text1,
    text2,
    setText1,
    setText2,
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
  const context = React.useContext(MainAppContext)
  if (!context) {
    throw new Error('useMainAppContext must be used within a MainAppContextProvider')
  }
  return context
}

export default useMainAppContext
