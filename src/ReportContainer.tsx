import useMainAppContext from './MainAppContext';
import styled from 'styled-components';
import { JSONTree } from 'react-json-tree';

const Wrapper = styled.div`
  width: 80%;
  textarea{
    width: 100%;
    height: 100%;
  }
`

const TextsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`

const ReportContainer = () => {
  const { diffReport, texts } = useMainAppContext();
  const text1 = texts ? texts[0] : '';
  const text2 = texts ? texts[1] : '';
  return (
    <Wrapper>
      <TextsContainer>
        <textarea rows={20} contentEditable={false} value={text1} onChange={() => {}}/>
        <textarea rows={20} contentEditable={false} value={text2} onChange={() => {}}/>
      </TextsContainer>
      <JSONTree data={diffReport} hideRoot />
    </Wrapper>
  );
}

export default ReportContainer;
