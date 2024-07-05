import useMainAppContext from './MainAppContext';
import { DiffReportType } from './generator';
import Row from './Row';

const GenerateReportMenu = () => {
  const { reportType, setReportType } = useMainAppContext();

  return (
    <Row>
      <input
        type="radio"
        checked={reportType === DiffReportType.ByWord}
        onChange={(e) => {
          if (e.target.checked) {
            setReportType(DiffReportType.ByWord)
          }
        }}
      />
      By Words
      <input
        type="radio"
        checked={reportType === DiffReportType.BySentence}
        onChange={(e) => {
          if (e.target.checked) {
            setReportType(DiffReportType.BySentence)
          }
        }}
      />
      By Sentences
    </Row>
  )
}

export default GenerateReportMenu;
