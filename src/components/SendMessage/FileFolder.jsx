import { useState } from "react";
import "../../css/App.css";

export default function FileFolder(props) {
  const [fname, setFname] = useState('');
  function handleChange(e) {
    const allInfo = e.target.files[0];
    props.fileChange(props.rowId, allInfo);
    setFname(e.target.files[0].name);
  }

  return (
    <label class="custom-file-upload">
      <input
        type="file"
        id={props.rowId}  
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <span class="fileName"> {fname  == '' ? 'Выберите файл! Файл не выбран' : fname } </span>
    </label>
  );
}
