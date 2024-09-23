export default function FileFolder(props) {
  function handleChange(e) {
    const allInfo = e.target.files[0];
    props.fileChange(props.rowId, allInfo);
  }

  return (
    <input
      type="file"
      id={props.rowId}
      onChange={(e) => {
        handleChange(e);
      }}
    />
  );
}
