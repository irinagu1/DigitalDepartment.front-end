import { Alert, Button, Snackbar, Stack, Typography } from "@mui/material";
import StyledContainer from "../../components/StyledContainer";
import ChoosePanel from "../../components/ChoosePanel";
import { useEffect, useState } from "react";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import PositionsTable from "../../components/Positions/PositionsTable";
import { json, useNavigate } from "react-router-dom";
import { baseurl } from "../../shared";
import AddPositionModal from "../../components/Positions/AddPositionModal";

const chipsIsActive = ["Активные", "Архив"];

const fetchData = async (parameter, withUsers) => {
  const ifWithUsers = withUsers ? "&WithUsersAmount=" + withUsers : "";
  const currUrl =
    baseurl + "positions?isEnable=" + parameter + ifWithUsers;
  let response = await fetch(currUrl, {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {  
    return "error";
  }
};

const deleteData = async (positionId) => {
  const path = baseurl + "positions/" + positionId;
  let response = await fetch(path, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  if (response.ok) {
    console.log(response);
    return "ok";
  } else {
    console.log(response);
    return "error";
  }
};

const deactivateData = async (positionId, newObject) => {
  const path = baseurl + "positions/" + positionId;
  let response = await fetch(path, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(newObject),
  });
  if (response.ok) {
    return "ok";
  } else {
    return "error";
  }
};

const addData = async (newPosition) => {
  let response = await fetch(baseurl + "positions", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newPosition),
  });
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    return "error";
  }
};

export default function AllPositions() {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Успешно!");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [activeChip, setActiveChip] = useState(chipsIsActive[0]);

  const [positions, setPositions] = useState([]);

  const [showAdd, setShowAdd] = useState(false);
  const [changed, setChanged] = useState();

  useEffect(() => {
    setLoading(true);
    fetchPositions();
    setLoading(false);
  }, []);

  useEffect(() => {
    updateList();
  }, [isActive, changed]);

  const updateList = async () => {
    fetchPositions();
  };

  const fetchPositions = async () => {
    const positionsFromDB = await fetchData(isActive, true);

    if (positionsFromDB == "error") {
      console.log('error');
      setSnackbarMessage("Сервер недоступен");
      setSnackbarSeverity("error");
    } else {
      console.log('no error');
      setPositions(positionsFromDB);
    }
    setSnackbarOpen(true);
  };

  const handleChipChange = (newChip) => {
    setActiveChip(newChip);
    setIsActive(!isActive);
    console.log(newChip);
  };

  const deactivatePosition = async (positionId, isEnable) => {
    const newObject = returnPositionForUpdate(positionId, true,!isEnable);
    console.log(newObject);
    const deactivateResult = await deactivateData(positionId, newObject);
    if (deactivateResult == "error") {
      setSnackbarMessage("Не удалось деактивировать.");
      setSnackbarSeverity("error");
    } else {
      const newList = positions.filter((el) => el.id !== positionId);
      setPositions(newList);
      setSnackbarMessage("Успешно!");
      setSnackbarSeverity("success");
    }
    setSnackbarOpen(true);
  };

  const handleDeactivate = (id, isEnable) => {
    deactivatePosition(id, isEnable);
  };


  const deletePosition = async (positionId) => {
    const deleteResult = await deleteData(positionId);
    if (deleteResult == "error") {
      setSnackbarMessage("Не удалось удалить. ");
      setSnackbarSeverity("error");
    } else {
      setSnackbarMessage("Успешно!");
      setSnackbarSeverity("success");
      const newList = positions.filter((el) => el.id !== positionId);
      setPositions(newList);
    }
    setSnackbarOpen(true);
  };
  const handleDelete = (id) => {
    deletePosition(id);
  };

  const handleClose = () => setOpen(false);
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  function toggleShowAdd() {
    setShowAdd(!showAdd);
  }

  const newPosition = async (name) => {
    const newObj = { name: name, isEnable: true };
    const addResult = await addData(newObj);
    if (addResult == "error") {
      setSnackbarMessage("Не удалось добавить.");
      setSnackbarSeverity("error");
    } else {
      setSnackbarMessage("Успешно!");
      setSnackbarSeverity("success");
    }
    setSnackbarOpen(true);
    fetchPositions();
    toggleShowAdd();
  }

  const returnPositionForUpdate = (id, toDeactivate, isEnable, newName) => {
    let newElement = positions.find((el) => el.id == id);
    if(!newElement)
      throw new Error("Not found an element in list");
    if(toDeactivate)
      newElement= {...newElement, isEnable: !isEnable};
    if(newName)
      newElement={...newElement, name: newName};
    return newElement;
  }

  return (
    <>
      <StyledContainer>
        <Typography variant="h6" align="center" gutterBottom>
          Справочник должностей
        </Typography>
        <Stack direction="row" spacing={3}>
          <ChoosePanel chips={chipsIsActive} changeChip={handleChipChange} />
          <AddPositionModal
            newPosition={newPosition}
            show={showAdd}
            toggleShow={toggleShowAdd}
          />
        </Stack>
        <PositionsTable
          loading={loading}
          rows={positions}
          chip={activeChip}
          handleDeactivate={handleDeactivate}
          handleDelete={handleDelete}
          isActive={isActive}
        />
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
      </StyledContainer>
    </>
  );
}
