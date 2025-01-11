import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import StyledContainer from "../../components/StyledContainer";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { baseurl } from "../../shared";
import { CheckCircleOutline } from "@mui/icons-material";

const updateRequest = async (data) => {
  let response = await fetch(baseurl + "authentication/password", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

export default function ChangePassword(props) {
  const location = useLocation();
  const { state } = location;

  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  const [errorMessage, setErrorMessage] = useState();
  const [success, setSuccess] = useState(false);

  const handleClick = async () => {
    setSuccess(false);
    const result = validatePassword();
    if (result) {
      const data = { UserId: state.id, NewPassword: first };
      const result = await updateRequest(data);
      if (result) clear();
      else setErrorMessage("Ошибка на сервере.");
    }
  };

  const clear = () => {
    setFirst("");
    setSecond("");
    setErrorMessage();
    setSuccess(true);
  };

  const containsNumber = (str) => {
    return /\d/.test(str);
  };

  const validatePassword = () => {
    if (first !== second) {
      setErrorMessage("Пароли не совпадают!");
      return false;
    }
    if (first.length < 5 || !containsNumber(first)) {
      setErrorMessage("Пароль не соотвествует требованиям!");
      return false;
    }
    return true;
  };

  const handleFirstChange = (event) => {
    setFirst(event.target.value);
  };
  const handleSecondChange = (event) => {
    setSecond(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f7f7f7",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: "10px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Смена пароля для пользователя: {state.fullName}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
        }}
      >
        <TextField
          label="Новый пароль"
          type="password"
          variant="outlined"
          sx={{
            marginBottom: "10px",
          }}
          value={first}
          onChange={handleFirstChange}
        />
        <TextField
          label="Повторите пароль"
          type="password"
          variant="outlined"
          sx={{
            marginBottom: "20px",
          }}
          value={second}
          onChange={handleSecondChange}
        />
        {errorMessage ? (
          <Typography
            sx={{
              textAlign: "center",
              mb: "10px",
              color: "red",
            }}
          >
            {errorMessage}
          </Typography>
        ) : null}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#3f9eb5",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            "&:hover": {
              backgroundColor: "#3f9eb5",
            },
          }}
          onClick={() => {
            handleClick();
          }}
        >
          Сбросить пароль
        </Button>
        <Typography
          sx={{
            textAlign: "center",
            marginTop: "10px",
            color: "blue",
          }}
        >
          *Пароль должен содержать минимум 1 цифру и иметь более 5 символов
        </Typography>
        {success ? (
          <Alert
            sx={{ mt: 1 }}
            icon={<CheckCircleOutline fontSize="inherit" />}
            severity="success"
          >
            Пароль был успешно сменен!
          </Alert>
        ) : null}
      </Box>
    </Box>
  );
}
