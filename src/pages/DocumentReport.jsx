import { useLocation } from "react-router-dom";
import { baseurl } from "../shared";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import StyledContainer from "../components/StyledContainer";

const formatDate = (oldDate) => {
  if (oldDate === "" || oldDate == null) return oldDate;

  const dateObject = new Date(oldDate);
  const formattedDate = dateObject
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, ".");
  return formattedDate;
};

const fetchInfo = async (parameter) => {
  return fetch(baseurl + "letters" + parameter, {
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

export default function DocumentReport() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const location = useLocation();
  const { state } = location;
  const [recipients, setRecipients] = useState();
  useEffect(() => {
    console.log(state);
    const fetchRecipients = async () => {
      const recipientsFromDB = await fetchInfo(
        "?letterId=" + state.letterId + "&documentId=" + state.id
      );
      console.log(recipientsFromDB);
      setRecipients(recipientsFromDB);
    };

    fetchRecipients();
  }, []);
  let count = 1;

  const toWord = () => {
    const params = "?letterId=" + state.letterId + "&documentId=" + state.id;
    return fetch(baseurl + "letters/CreateReport" + params, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }).then((res) => {
      if (!res.ok) {
        setSnackbarMessage("Не удалось создать отчет. ");
        setSnackbarSeverity("error");
      } else {
        setSnackbarMessage("Отчет создан успешно!");
        setSnackbarSeverity("success");
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
    <>
      {state ? (
        <StyledContainer>
          <Typography align="center">Документ: {state.name}</Typography>
          <Typography align="center">Лист ознакомления</Typography>
          <Button
            variant="outlined"
            sx={{ alignSelf: "center", width: "40%", mr: 2 }}
            onClick={toWord}
          >
            В WORD
          </Button>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">№</TableCell>
                <TableCell align="center">ФИО</TableCell>
                <TableCell align="center">Ознакомлен</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipients
                ? recipients.map((el) => {
                    return (
                      <TableRow>
                        <TableCell>{count++}</TableCell>
                        <TableCell>{el.user.fullName}</TableCell>
                        <TableCell>
                          {el.dateChecked == null
                            ? "Не ознакомлен"
                            : formatDate(el.dateChecked)}
                        </TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
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
        </StyledContainer>
      ) : (
        <p>Загрузка...</p>
      )}
    </>
  );
}
