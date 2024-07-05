import useMainAppContext from './MainAppContext';

const styles = {
  added: {
    color: "green",
    backgroundColor: "#b5efdb"
  },
  removed: {
    color: "red",
    backgroundColor: "#fec4c0",
    textDecoration: "line-through"
  }
};

const DiffViewer = () => {
  const { diffReport } = useMainAppContext();

  const mappedNodes = (diffReport || []).map((group) => {
    let { value, added, removed } = group;
    if ((added || removed) && !/\S/.test(value)) {
      const linebreaks = value.match(/(\r\n|\r|\n)/g);
      // console.log(`contains ${linebreaks.length} new line`, linebreaks);
      if (linebreaks) {
        if (removed) value = `\u00b6`.repeat(linebreaks.length);
        if (added) value = `\u00b6\n`.repeat(linebreaks.length);
      }
    }
    let nodeStyles;
    if (added) nodeStyles = styles.added;
    if (removed) nodeStyles = styles.removed;

    return <span style={nodeStyles}>{value}</span>;
  });

  return <span style={{ whiteSpace: "pre" }}>{mappedNodes}</span>;
}

export default DiffViewer;
