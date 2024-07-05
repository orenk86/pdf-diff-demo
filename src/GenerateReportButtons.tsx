import useMainAppContext from './MainAppContext';
import { DiffReportType } from './generator';
import Row from './Row';

const GenerateReportButtons = () => {
  const { generateDiffReport, areFilesSelected } = useMainAppContext();

  return (
    <Row>
      <button disabled={!areFilesSelected} onClick={() => generateDiffReport(DiffReportType.ByWord)}>
        Generate By Words
      </button>
      <button disabled={!areFilesSelected} onClick={() => generateDiffReport(DiffReportType.BySentence)}>
        Generate By Sentences
      </button>
    </Row>
  );
}

export default GenerateReportButtons;
