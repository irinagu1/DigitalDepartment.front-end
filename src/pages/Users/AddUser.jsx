import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { baseurl } from "../../shared";
import InputUser from "../../components/Users/InputUser";
import ChooseRecipients from "../../components/SendMessage/ChooseRecipients";
import ChooseElement from "../../components/SendMessage/ChooseElement";
import ChooseRoles from "../../components/Users/ChooseRoles";

const fetchRoles = async () => {
  return fetch(baseurl + "roles", {
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

export default function AddUser() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState({
    firstName: "",
    secondName: "",
    lastName: "",
    username: "",
    password: "",
    Roles: [],
  });

  useEffect(() => {
    setRolesNames();
  }, []);

  const setRolesNames = async () => {
    const rolesFromDB = await fetchRoles();
    const rolesToState = rolesFromDB.map((el) => {
      return el.name;
    });
    setRoles(rolesToState);
  };
  const handleFirstNameChange = async (newValue) => {
    setUser({ ...user, firstName: newValue });
  };
  const handleSecondNameChange = async (newValue) => {
    setUser({ ...user, secondName: newValue });
  };
  const handleLastNameChange = async (newValue) => {
    setUser({ ...user, lastName: newValue });
  };
  const handleLoginNameChange = async (newValue) => {
    setUser({ ...user, username: newValue });
  };
  const handlePasswordChange = async (newValue) => {
    setUser({ ...user, password: newValue });
  };
  const handleRoleshange = async (newValue) => {
    setUser({ ...user, Roles: newValue });
  };

  const register = async () => {
    const newUser = {
      ...user,
      email: user.username + "@mail.ru",
      phoneNumber: "12345",
      isActive: true,
    };

    registerUser(newUser);
  };
  const registerUser = async (newUser) => {
    return fetch(baseurl + "authentication", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then((res) => {
      console.log(res);
      if (!res.ok) {
        console.log(res);
        setSnackbarMessage("Не удалось создать пользователя. ");
        setSnackbarSeverity("error");
      } else {
        setSnackbarMessage("Пользователь создан успешно!");
        setSnackbarSeverity("success");
        clear();
      }
      setSnackbarOpen(true);
    });
  };

  const clear = () => {
    setUser({
      firstName: "",
      secondName: "",
      lastName: "",
      username: "",
      password: "",
      Roles: [],
    });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Добавить нового пользователя
      </Typography>

      <InputUser
        value={user.lastName}
        handleValueChange={handleLastNameChange}
        labelName="Фамилия"
      />
      <InputUser
        value={user.firstName}
        handleValueChange={handleFirstNameChange}
        labelName="Имя"
      />
      <InputUser
        value={user.secondName}
        handleValueChange={handleSecondNameChange}
        labelName="Отчество"
      />
      <InputUser
        value={user.username}
        handleValueChange={handleLoginNameChange}
        labelName="Логин"
      />
      <InputUser
        value={user.password}
        handleValueChange={handlePasswordChange}
        labelName="Пароль"
      />
      <Typography sx={{ mb: 2 }}>Выберите роли:</Typography>
      <ChooseRoles
        data={roles}
        loading={loading}
        handleChange={handleRoleshange}
      />
      <Button
        sx={{ mt: 3}}
        variant="contained"
        color="primary"
        onClick={register}
      >
        Создать
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
