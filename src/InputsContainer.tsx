import FileInput from './FileInput';
import styled from 'styled-components';
import useMainAppContext from './MainAppContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const InputsContainer = () => {
  const { setFile1, setFile2 } = useMainAppContext()

  return (
    <Wrapper>
      <div>
        <div>Choose the first file:</div>
        <FileInput onFileSelected={(file) => setFile1(file)} />
      </div>
      <div>
        <div>Choose the second file:</div>
        <FileInput onFileSelected={(file) => setFile2(file)} />
      </div>
    </Wrapper>
  );
}

export default InputsContainer;
