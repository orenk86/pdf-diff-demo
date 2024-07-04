import useMainAppContext from './MainAppContext';

const GenerateReportButton = () => {
  const { generateDiffReport, areFilesSelected } = useMainAppContext();

  const handleClick = () => {
    generateDiffReport()
  }

  return (
    <button disabled={!areFilesSelected} onClick={() => handleClick()}>
      Generate Report
    </button>
  );
}

export default GenerateReportButton;
