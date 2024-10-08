import TableFiles from "./TableFiles";
import { useState, useEffect, useContext } from "react";
import { baseurl } from "../../shared";
import MyRow from "./MyRow";
import {
  Alert,
  Button,
  Container,
  Divider,
  FormControlLabel,
  Paper,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useReducer } from "react";
import ChooseRecipients from "./ChooseRecipients";
import Checkbox from "@mui/material/Checkbox";
import storeMessage from "./Logic/StoreMessage";
import { StarTwoTone, ThreeKOutlined } from "@mui/icons-material";
import { LoginContext } from "../../App";

const reducer = (state, action) => {
  switch (action.type) {
    case "addInput": {
      return { ...state, inputsFiles: [...state.inputsFiles, action.newInput] };
    }
    case "addFile": {
      return { ...state, allFiles: [...state.allFiles, action.newFile] };
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
    case "changeRecipientsToCheck": {
      console.log("in change recipientsToCheck");
      console.log(action.newRecipientsToCheck);
      return { ...state, recipientsToCheck: action.newRecipientsToCheck };
    }
    case "deleteFile": {
      const newFiles = state.allFiles.filter((el) => el.id !== action.fileId);
      const newInputs = state.inputsFiles.filter(
        (el) => el.props.id !== action.fileId
      );

      return { ...state, allFiles: newFiles, inputsFiles: newInputs };
    }
    case "changeAsRecipients": {
      if (action.checked) {
        return {
          ...state,
          recipientsToCheck: state.recipients,
          asRecipients: true,
        };
      }
      return { ...state, recipientsToCheck: [], asRecipients: false };
    }
    case "clear":
      {
        return { ...state, inputsFiles: [], allFiles: [] };
      }
      defalut: {
        return state;
      }
  }
};

export default function MainForm(props) {
  const logged = useContext(LoginContext);
 
  const isMobile = useMediaQuery("(max-width:600px)");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [loading, setLoading] = useState(true);
  const [docCategories, setDocCategories] = useState([]);
  const [docStatuses, setDocStatuses] = useState([]);
  const [asRecipients, setAsRecipients] = useState(false);

  const [state, dispatch] = useReducer(reducer, {
    inputsFiles: [],
    allFiles: [],
    recipients: [],
    recipientsToCheck: [],
    asRecipients: false,
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
      docC: docCategories[0].id.toString(),
      docS: docStatuses[0].id.toString(),
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
        handleDelete={handleDeleteFile}
      />
    );
    dispatch({ type: "addInput", newInput: myRow });
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

  function handleDeleteFile(fileId) {
    dispatch({ type: "deleteFile", fileId });
  }

  async function handleUpload() {
    const ifOk = checkState();

    if (ifOk) {
      const result = await storeMessage(state);

      if (result == "ok") {
        setSnackbarMessage("Документы добавлены успешно! ");
        setSnackbarSeverity("success");
        clear();
      } else {
        setSnackbarMessage("Не удалось загрузить данные. ");
        setSnackbarSeverity("error");
      }
    } else {
      setSnackbarMessage("Заполните необходимые данные. ");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  }

  const clear = () => {
    dispatch({ type: "clear" });
  };

  const checkState = () => {
    let flag = true;
    if (state.allFiles.length === 0) return false;
    if (checkRecipients()) return false;
    state.allFiles.forEach((item) => {
      if (item.file.name === undefined) {
        flag = false;
        return;
      }
    });

    return flag;
  };
  const checkRecipients = () => {
    const emptyRec =
      state.recipients.roles.length === 0 &&
      state.recipients.users.length === 0;
    const emptyToCheck =
      state.recipientsToCheck.roles.length === 0 &&
      state.recipientsToCheck.users.length === 0;
    return emptyRec && emptyToCheck;
  };
  const handleClose = () => setSnackbarOpen(false);
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  return (
    <>
      <Button
        sx={{ width: "30%", alignSelf: "left" }}
        variant="outlined"
        color="primary"
        onClick={() => {
          appendFile();
        }}
      >
        Добавить документ
      </Button>
      <TableFiles inputsFiles={state.inputsFiles}></TableFiles>
      <Paper elevation={3}>
        <Stack
          sx={{ pt: 3, pb: 3, pl: 2 }}
          direction={isMobile ? "column" : "row"}
          spacing={4}
        >
          <Stack spacing={2} sx={{ flex: 1, pr: 2 }}>
            <Typography align="center">Получатели:</Typography>
            <Stack direction="row" spacing={2}>
              <FormControlLabel
                label="Одинаковые"
                control={
                  <Checkbox
                    value={asRecipients}
                    onChange={(event) => {
                      handleToCheck(event.target.checked);
                    }}
                  />
                }
              />
            </Stack>
            <ChooseRecipients
              id="recipients"
              recipientsChange={recipientsChange}
            ></ChooseRecipients>
          </Stack>
          <Stack spacing={2} sx={{ flex: 1, pr: 2 }}>
            {!asRecipients ? (
              <>
                <Typography align="center">Для ознакомления:</Typography>
                <ChooseRecipients
                  id="recipientsToCheck"
                  recipientsChange={recipientsToCheckChange}
                ></ChooseRecipients>
              </>
            ) : null}
          </Stack>
        </Stack>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        sx={{ width: "30%", alignSelf: "center" }}
        onClick={() => {
          handleUpload();
        }}
      >
        Загрузить
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
