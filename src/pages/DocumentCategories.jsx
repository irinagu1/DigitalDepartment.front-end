import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Alert, Button, Snackbar } from "@mui/material";
import Chip from "@mui/material/Chip";
import TableDocumentCategories from "../components/DocumentCategories/TableDocumentCategories";
import { useEffect, useState, useContext } from "react";
import useFetch from "../hooks/UseFetch";
import { baseurl } from "../shared";
import AddDocumentCategory from "../components/DocumentCategories/AddDocumentCategoryModal";
import AddDocumentCategoryModal from "../components/DocumentCategories/AddDocumentCategoryModal";
import Modal from "@mui/material/Modal";
import { LoginContext } from "../App";
import { Stack, styled } from "@mui/system";
import ChoosePanel from "../components/ChoosePanel";
import StyledContainer from "../components/StyledContainer";

const fetchData = async (parameter) => {
  return fetch(baseurl + "documentCategories?isEnable=" + parameter, {
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

const chipsIsActive = ["Активные", "Архив"];

export default function DocumentCategories() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [activeChip, setActiveChip] = useState(chipsIsActive[0]);
  const [isActive, setIsActive] = useState(true);

  const [docCategories, setDocCategories] = useState([]);

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [isActive]);

  const fetchCategories = async () => {
    const categoriesFromDB = await fetchData(isActive);
    setDocCategories(categoriesFromDB);
  };

  const handleClose = () => setOpen(false);

  function toggleShow() {
    setShow(!show);
  }

  function newDocCategory(name) {
    const newObj = { name: name, isEnable: true };
    manipulateDocCat(newObj, "POST");
    fetchCategories();

    toggleShow();
  }

  const manipulateDocCat = (newData, method, id) => {
    const str = "/" + id;
    const parameter = id !== undefined ? str : "";
    const way = baseurl + "documentCategories" + parameter;
    return fetch(way, {
      method: method,
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(newData),
    })
      .then((res) => {
        if (!res.ok) {
          console.log(res);
          setSnackbarMessage("Не удалось выполнить действие. ");
          setSnackbarSeverity("error");
        } else {
          setSnackbarMessage("Успешно!");
          setSnackbarSeverity("success");
        }
        setSnackbarOpen(true);
        if (method == "POST") {
          return res.json();
        }
      })
      .then((data) => {
        if (method == "POST") {
          return data;
        }
      });
  };

  function DeleteDocCategory(id) {
    manipulateDocCat({}, "DELETE", id);
    const newList = docCategories.filter((el) => el.id !== id);
    setDocCategories(newList);
  }

  function HandleEnablingDocCategory(oldData) {
    const newObj = { Name: oldData.name, IsEnable: !oldData.isEnable };
    manipulateDocCat(newObj, "PUT", oldData.id);
    const newList = docCategories.filter((el) => el.id !== oldData.id);
    setDocCategories(newList);
  }

  const handleChipChange = (newChip) => {
    setActiveChip(newChip);
    setIsActive(!isActive);
  };

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
          Категории документов
        </Typography>
        <Stack direction="row" spacing={3}>
        <ChoosePanel chips={chipsIsActive} changeChip={handleChipChange} />
          <AddDocumentCategoryModal
            newDocCategory={newDocCategory}
            show={show}
            toggleShow={toggleShow}
          />
        </Stack>
        <TableDocumentCategories
          source={docCategories}
          delete={DeleteDocCategory}
          hadleEnabling={HandleEnablingDocCategory}
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
