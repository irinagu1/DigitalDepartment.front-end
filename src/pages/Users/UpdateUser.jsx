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
import { useLocation } from "react-router-dom";
import CheckRoles from "../../components/Users/CheckRoles";

const fetchData = async (param, id) => {
  const query = id !== null ? "?id=" + id : "";
  return fetch(baseurl + param + query, {
    method: "GET",
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

export default function UpdateUser() {
  const location = useLocation();
  const { state } = location;

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
    Roles: [],
  });

  useEffect(() => {
    fetchUser();
    // setRolesNames();
  }, []);

  const fetchUser = async () => {
    const userDB = await fetchData("users/byid", state.id);
    const currentUser = {
      firstName: userDB.firstName,
      secondName: userDB.secondName,
      lastName: userDB.lastName,
      username: userDB.username,
      Roles: userDB.roles,
    };
    setUser(currentUser);
    const allRoles = await fetchData("roles");
    const userRoles = await fetchData("roles/user", state.id);
    const rolesToState = allRoles.map((el) => {
      if (userRoles.find((r) => r.name == el.name)) {
        return { name: el.name, checked: true };
      } else {
        return { name: el.name, checked: false };
      }
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
  const handleRolesChange = async (newValue) => {
    const newRoles = roles.map((el) => {
      if (el.name == newValue) {
        return { ...el, checked: !el.checked };
      } else {
        return el;
      }
    });
    setRoles(newRoles);
  };

  const update = async () => {
    const newRoles = roles.filter((e) => e.checked == true).map((e) => e.name);
    const newUser = {
      ...user,
      email: user.username + "@mail.ru",
      phoneNumber: "12345",
      isActive: true,
      Roles: newRoles
    };

    updateUser(newUser);
  };
  const updateUser = async (newUser) => {
    //update user first
    //update his roles second
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Role
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
      <CheckRoles
        data={roles}
        loading={loading}
        updateChecked={handleRolesChange}
      />
      <Button onClick={update}>Update</Button>
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