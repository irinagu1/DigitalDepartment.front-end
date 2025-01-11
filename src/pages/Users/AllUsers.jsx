import { useEffect, useState } from "react";
import { baseurl } from "../../shared";
import RolesTable from "../../components/Roles/RolesTable";
import {
  Alert,
  Button,
  Container,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import ChoosePanel from "../../components/ChoosePanel";
import UsersTable from "../../components/Users/UsersTable";
import StyledContainer from "../../components/StyledContainer";
import { useNavigate } from "react-router-dom";

const fetchData = async (parameter) => {
  return fetch(baseurl + "users/forshow?isActive=" + parameter, {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
};

const deleteUser = async (userId) => {
  const path = baseurl + "authentication?userId=" + userId;
  let response = await fetch(path, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  });
  if (response.ok) return true;
  else return false;
};

const chipsIsActive = ["Активные", "Архив"];

export default function AllUsers() {
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [activeChip, setActiveChip] = useState(chipsIsActive[0]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchUsers();
    setLoading(false);
  }, []);

  useEffect(() => {
    updateList();
  }, [isActive]);

  const updateList = async () => {
    setLoading(true);
    fetchUsers();
    setLoading(false);
  };
  const fetchUsers = async () => {
    const usersFromDB = await fetchData(isActive);
    setUsers(usersFromDB);
  };
  const handleAdd = async () => {
    navigate("/users/add");
  };

  const handleChipChange = (newChip) => {
    setActiveChip(newChip);
    setIsActive(!isActive);
    console.log(newChip);
  };
  const handleDeactivate = (id) => {
    deactivateUser(id);
  };

  const deactivateUser = async (userId) => {
    const path = baseurl + "users/toArchive?userId=" + userId;
    return fetch(path, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.log(res);
          setSnackbarMessage("Не удалось выполнить действие. ");
          setSnackbarSeverity("error");
        } else {
          const newList = users.filter((el) => el.id !== userId);
          setUsers(newList);
          setSnackbarMessage("Успешно!");
          setSnackbarSeverity("success");
        }
        setSnackbarOpen(true);
        return res.json();
      })
      .then((data) => {
        return data;
      });
  };

  const handleDelete = async (id) => {
    const result = await deleteUser(id);
    if (!result) {
      setSnackbarMessage("Не удалось выполнить действие. ");
      setSnackbarSeverity("error");
    } else {
      const newList = users.filter((el) => el.id !== id);
      setUsers(newList);
      setSnackbarMessage("Успешно!");
      setSnackbarSeverity("success");
    }
    setSnackbarOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  return (
    <>
      <StyledContainer>
        <Typography variant="h4" gutterBottom>
          Управление пользователями
        </Typography>
        <Stack spacing={2}>
          <Stack direction="row" spacing={3} sx={{ mb: 1 }}>
            <ChoosePanel chips={chipsIsActive} changeChip={handleChipChange} />
            <Button variant="contained" color="primary" onClick={handleAdd}>
              Добавить нового пользователя
            </Button>
          </Stack>
          <UsersTable
            loading={loading}
            rows={users}
            chip={activeChip}
            handleDeactivate={handleDeactivate}
            handleDelete={handleDelete}
            isActive={isActive}
          />
        </Stack>
      </StyledContainer>
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
