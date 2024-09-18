import { useState } from "react";

export default function FileFolder(props) {
  const [fileInfo, setFileInfo] = useState();



  function handleChange(e) {
    console.log('aaaa')
    console.log(props.inf);
    setFileInfo(e.target.files[0]);
    const allInfo = e.target.files[0];

    const currObject = props.inf.find((el)=> el.id == props.id);
    const newObject= {id: props.id,
        file: allInfo,
        docC: currObject.docC,
        docS: currObject.docS
    }
    const curArr= props.inf.filter((el)=> el.id !== props.id)
    const newinf= [...curArr, newObject];
    props.fileChange(props.rowId, allInfo, newinf);
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
