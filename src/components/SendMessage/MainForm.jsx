import TableFiles from "./TableFiles";
import { useState, useEffect } from "react";
import { baseurl } from "../../shared";
import MyRow from "./MyRow";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useReducer } from "react";
import ChooseRecipients from "./ChooseRecipients";
import Checkbox from "@mui/material/Checkbox";
import storeMessage from "./Logic/StoreMessage";
import SendMessage from "../../pages/SendMessage";

const reducer = (state, action) => {
  switch (action.type) {
    case "addFile": {
      return {...state, allFiles: [...state.allFiles, action.newFile] };
    }
    case "changeFile": {
      const oldFile = state.allFiles.find((el) => el.id == action.fileId);
      const arrayWithoutOld = state.allFiles.filter(
        (el) => el.id != action.fileId
      );
      const newFile = { ...oldFile, file: action.newFile };
      const newArray = [...arrayWithoutOld, newFile];
      return { ...state, allFiles: newArray };
    }
    case "changeDocCat": {
      const oldFile = state.allFiles.find((el) => el.id == action.fileId);
      const arrayWithoutOld = state.allFiles.filter(
        (el) => el.id != action.fileId
      );
      const newFile = { ...oldFile, docC: action.newDocCatId };
      const newArray = [...arrayWithoutOld, newFile];
      return { ...state, allFiles: newArray };
    }
    case "changeDocStat": {
      const oldFile = state.allFiles.find((el) => el.id == action.fileId);
      const arrayWithoutOld = state.allFiles.filter(
        (el) => el.id != action.fileId
      );
      const newFile = { ...oldFile, docS: action.newDocStatId };
      const newArray = [...arrayWithoutOld, newFile];
      return { ...state, allFiles: newArray };
    }
    case "changeRecipients": {
      console.log("in change recipients");
      console.log(action.newRecipients);
      return { ...state, recipients: action.newRecipients };
    }
    case "changeRecipientsToCheck":
      {
        console.log("in change recipientsToCheck");
        console.log(action.newRecipientsToCheck);
        return { ...state, recipientsToCheck: action.newRecipientsToCheck };
      }
      case "changeAsRecipients":
      {
        if(action.checked){
    
          return{...state, recipientsToCheck : state.recipients, asRecipients: true};
        }
        return {...state, recipientsToCheck: [], asRecipients: false}
      }
      defalut: {
        return state;
      }
  }
};

export default function MainForm(props) {
  const [loading, setLoading] = useState(true);
  const [docCategories, setDocCategories] = useState([]);
  const [docStatuses, setDocStatuses] = useState([]);
  const [inputsFiles, setInputsFiles] = useState([]);
  const [asRecipients, setAsRecipients] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    allFiles: [],
    recipients: [],
    recipientsToCheck: [],
    asRecipients: false
  });

  useEffect(() => {
    fetchDocCat();
  }, []);

  const fetchDocCat = async () => {
    const res = await fetch(baseurl + "documentcategories");
    const data = await res.json();
    const ds = await fetch(baseurl + "documentstatuses");
    const dsData = await ds.json();
    setDocCategories(data);
    setDocStatuses(dsData);
    setLoading(false);
  };

  function appendFile() {
    const newUuid = uuidv4();

    let obj = {
      id: newUuid,
      file: {},
      docC: "",
      docS: "",
    };

    dispatch({ type: "addFile", newFile: obj });

    let myRow = (
      <MyRow
        loading={loading}
        id={newUuid}
        fileChange={fileChange}
        docCatChange={docCatChange}
        docStatChange={docStatusChange}
        dc={docCategories}
        ds={docStatuses}
      />
    );

    setInputsFiles([...inputsFiles, myRow]);
  }

  function fileChange(objId, newFile) {
    dispatch({ type: "changeFile", fileId: objId, newFile: newFile });
  }

  function docCatChange(objId, docCatId) {
    dispatch({ type: "changeDocCat", fileId: objId, newDocCatId: docCatId });
  }
  function docStatusChange(objId, docStatId) {
    dispatch({ type: "changeDocStat", fileId: objId, newDocStatId: docStatId });
  }

  function recipientsChange(newRecipients) {
    dispatch({ type: "changeRecipients", newRecipients });
  }

  function recipientsToCheckChange(newRecipientsToCheck) {
    dispatch({ type: "changeRecipientsToCheck", newRecipientsToCheck });
  }

  function handleToCheck(checked) {
    setAsRecipients(!asRecipients);
    dispatch({ type: "changeAsRecipients", checked });

  }
  return (
    <form>
      <Button
        onClick={() => {
          appendFile();
        }}
      >
        Add
      </Button>
      <TableFiles inputsFiles={inputsFiles}></TableFiles>
      <Button
        onClick={() => {
          console.log(state.allFiles);
        }}
      >
        Send
      </Button>
      <Checkbox
        value={asRecipients}
        onChange={(event) => {
          handleToCheck(event.target.checked);
        }}
      />
      <p>As rec</p>
      <ChooseRecipients
        id="recipients"
        recipientsChange={recipientsChange}
      ></ChooseRecipients>
      <p>To check</p>
      {!asRecipients ? (
        <ChooseRecipients
          id="recipientsToCheck"
          recipientsChange={recipientsToCheckChange}
        ></ChooseRecipients>
      ) : null}
      <Button onClick={()=>{storeMessage(state);}}>AAA</Button>
    </form>
  );
}
