import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import { baseurl } from "../shared";
import { LoginContext } from "../App";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  height: "100%",
  width: "100%",
  padding: 20,
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

export default function SignIn() {
  const mode = "light";
  const defaultTheme = createTheme({ palette: { mode } });

  const [loginError, setLoginError] = React.useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [errorStatus, setErrorStatus] = React.useState();

  const url = baseurl + "authentication/login";
  const [loggedIn, setLoggedIn] = React.useContext(LoginContext);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (loginError || passwordError) throw "vvedite barahlo";

    const inputsValues = new FormData(event.currentTarget);
    const userCredentials = {
      username: inputsValues.get("login"),
      password: inputsValues.get("password"),
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    })
      .then((response) => {
        if (response.status === 401) {
          setErrorStatus(401);
          console.log("incorrect info");
          console.log(loggedIn);
          throw response.status;
        } else if (!response.ok) {
          console.log("Other error we dont know");
          throw response.status;
        }
        console.log("response passed");
        return response.json();
      })
      .then((data) => {
        console.log("success");
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        setLoggedIn(true);
        getPermissions();
        /*  navigate(location?.state?.previousUrl ?
          location.state.previousUrl : '/doccategories'
       );*/
        
     //   navigate("/documentstatuses");
        console.log(localStorage);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  function getPermissions(){

    fetch(baseurl + "users",{
      headers:{
        'Content-type':'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      }
    } )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      localStorage.setItem('permissions', data);
      console.log("perms");
      console.log(data);
    });
  }
  const validateInputs = () => {
    const login = document.getElementById("login");
    const password = document.getElementById("password");

    let isValid = true;

    if (!login.value) {
      setLoginError(true);
      setLoginErrorMessage("Введите логин");
      isValid = false;
    } else {
      setLoginError(false);
      setLoginErrorMessage("");
    }

    if (!password.value) {
      setPasswordError(true);
      setPasswordErrorMessage("Введите пароль");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };
  function getF(){
 fetch(baseurl + "users")
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log("perms");
            console.log(data);
          });
  }
  return (
    <ThemeProvider theme={defaultTheme}>
    
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography component="h4" variant="h4" align="center">
            АИС "Цифровая кафедра"
          </Typography>
          <Typography
            component="h5"
            variant="h5"
            sx={{ width: "100%", fontSize: "clamp(1rem, 10vw, 1.5rem)" }}
          >
            Вход
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="login">Логин</FormLabel>
              <TextField
                error={loginError}
                helperText={loginErrorMessage}
                id="login"
                type="text"
                name="login"
                placeholder="логин"
                autoComplete="on"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={loginError ? "error" : "primary"}
                sx={{ ariaLabel: "login" }}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <FormLabel htmlFor="password">Пароль</FormLabel>
              </Box>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>

            {errorStatus === 401 ? (
              <Typography sx={{ color: "red" }}>
                Неверный логин или пароль
              </Typography>
            ) : null}

            {errorStatus && errorStatus !== 401 ? (
              <Typography sx={{ color: "red" }}>
                Ошибка со стороны сервера
              </Typography>
            ) : null}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Войти
            </Button>
            <Button onClick={getF}>ddd</Button>
          </Box>
        </Card>
      </SignInContainer>
    </ThemeProvider>
  );
}
