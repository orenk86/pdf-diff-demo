import useMainAppContext from './MainAppContext'
import styled from 'styled-components'
import { JSONTree } from 'react-json-tree'
import Row from './Row'
import DiffViewer from './DiffViewer'
import { useState } from 'react'

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
  overflow: auto;
  background-color: #f5f5f5;
  margin-top: 0.5rem;
`

const ReportContainer = () => {
  const { diffReport, similarity = 0, text1, setText1, text2, setText2 } = useMainAppContext()

  const [showDiffView, setShowDiffView] = useState<boolean>(true)
  const [showRawDiff, setShowRawDiff] = useState<boolean>(false)

  return (
    <Wrapper>
      <Row>
        Content to be compared:
      </Row>
      <Row>
        <textarea
          rows={20}
          contentEditable={false}
          value={text1}
          onChange={(e) => {
            setText1(e.target.value)
          }}/>
        <textarea
          rows={20}
          contentEditable={false}
          value={text2}
          onChange={(e) => {
            setText2(e.target.value)
          }}/>
      </Row>
      <Row>
        Similarity: {similarity.toFixed(3)}
      </Row>
      <Row>
        <input type="checkbox" checked={showDiffView} onChange={() => setShowDiffView(!showDiffView)} /> Show diff view
        <input type="checkbox" checked={showRawDiff} onChange={() => setShowRawDiff(!showRawDiff)} /> Show raw report
      </Row>
      <Row>
        {showDiffView ? (
          <DiffViewContainer>
            <DiffViewer/>
          </DiffViewContainer>
        ) : undefined}
        {showRawDiff ? (
          <TreeViewContainer>
            <JSONTree data={diffReport} hideRoot/>
          </TreeViewContainer>
        ) : undefined}
      </Row>
    </Wrapper>
  )
}

export default ReportContainer
