import TableFiles from "./TableFiles";
import { useState, useEffect } from "react";
import { baseurl } from "../../shared";
import SelectElement from "./SelectElement";
import MyRow from "./MyRow";
import useFetch from "../../hooks/UseFetch";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { NativeSelect } from "@mui/material";
import FileFolder from "./FileFolder";
export default function MainForm(props) {

  const [opt, setOpt] = useState("2 ");
  const [docCategories, setDocCategories] = useState([]);
  const [docStatuses, setDocStatuses] = useState([]);
  const [inputsFiles, setInputsFiles] = useState([]);
  const url = baseurl + "documentcategories";

  const [inf, setInf] = useState([]);
  const {
    data,
    errorStatus: allDocCatError,
    request,
    getData,
    appendData,
    deleteData,
    updateData,
    getInfo,
  } = useFetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  let allI = [];
  const fetchDocCat = async () => {
    const res = await fetch("https://localhost:7156/api/documentcategories");
    const data = await res.json();

    const ds = await fetch("https://localhost:7156/api/documentstatuses");
    const dsData = await ds.json();
    setDocCategories(data);
    setDocStatuses(dsData);
    setLoading(false);
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // props.sendData();
    fetchDocCat();
  }, []);

 
  
  function appendFile() {
    console.log(inf);
    const newUuid = uuidv4();

    let inF = <FileFolder rowId={newUuid} fileChange={fileChange}/>;
    let obj = {
        id: newUuid,
        file: {},
        docC: '',
        docS: '',
      };
      setInf([...inf, obj]);
      setInf([...inf, obj]);
    let myRow = (
      <MyRow
        loading={loading}
        id={newUuid}
        inf={inf}
        fileChange={fileChange}
        docCatChange={docCatChange}
        docStatChange={docStatusChange}
        dc={docCategories}
        ds={docStatuses}
      />
    );


   
    setInputsFiles([...inputsFiles, myRow]);
    setInputsFiles([...inputsFiles, myRow]);
  }

  function fileChange(objId, newFile, nn) {
    setInf(nn);
 /*   const currObject = inf.find((el)=> el.id == objId);
    const newObject= {id: objId,
        file: newFile,
        docC: currObject.docC,
        docS: currObject.docS
    }
    setInf([...inf, newObject]);*/

  }

  function docCatChange(objId, docCatId) {
    console.log("obj" + objId + "  docc  " + docCatId);
  }
  function docStatusChange(objId, docStatId) {
    console.log("obj" + objId + "  docc  " + docStatId);
  }

  return (
    <form name="mainform">
      <Button
        onClick={() => {
          appendFile();
        }}
      >
       
        Add
      </Button>
      <TableFiles
        inf={inf}
        inputsFiles={inputsFiles}
        docCatChange={docCatChange}
      ></TableFiles>
      <Button
        onClick={() => {
          console.log(inf);
        }}
      >
       
        Send
      </Button>
    </form>
  );
}
