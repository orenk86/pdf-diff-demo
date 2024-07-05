import useMainAppContext from './MainAppContext';
import styled from 'styled-components';
import { JSONTree } from 'react-json-tree';
import Row from './Row';
import DiffViewer from './DiffViewer';

const Wrapper = styled.div`
  width: 80%;
  textarea {
    width: 100%;
  }
  margin-bottom: 2rem;
`

const TreeViewContainer = styled.div`
  text-align: left;
  flex: 2;
`

const DiffViewContainer = styled.div`
  text-align: left;
  flex: 3;
  overflow: scroll;
  background-color: #f5f5f5;
  margin-top: 0.5rem;
`

const ReportContainer = () => {
  const { diffReport, similarity = 0, texts } = useMainAppContext();
  const text1 = texts ? texts[0] : '';
  const text2 = texts ? texts[1] : '';
  return (
    <Wrapper>
      <Row>
        Similarity: {similarity.toFixed(2)}
      </Row>
      <Row>
        <textarea rows={20} contentEditable={false} value={text1} onChange={() => {}}/>
        <textarea rows={20} contentEditable={false} value={text2} onChange={() => {}}/>
      </Row>
      <Row>
        <TreeViewContainer>
          <JSONTree data={diffReport} hideRoot />
        </TreeViewContainer>
        <DiffViewContainer>
          <DiffViewer />
        </DiffViewContainer>
      </Row>
    </Wrapper>
  );
}

export default ReportContainer;
