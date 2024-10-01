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
import { styled } from "@mui/system";
import ChoosePanel from "../components/ChoosePanel";

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

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  position: "relative",
  backgroundColor: "transparent", // Make the center transparent
  border: `2px solid ${theme.palette.grey[300]}`, // Border color
  borderRadius: "8px",
  padding: theme.spacing(3),
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
}));

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
  const [changed, setChanged] = useState();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [isActive, changed]);

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
    setChanged(id);
  }

  function HandleEnablingDocCategory(oldData) {
    const newObj = { Name: oldData.name, IsEnable: !oldData.isEnable };
    manipulateDocCat(newObj, "PUT", oldData.id);
    setChanged(oldData.id);
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
        <div>
          <Typography variant="h3" gutterBottom>
            Категории документов
          </Typography>
        </div>
        <AddDocumentCategoryModal
          newDocCategory={newDocCategory}
          show={show}
          toggleShow={toggleShow}
        />

        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "row",
            gap: 3,
            overflow: "auto",
          }}
        >
          <ChoosePanel chips={chipsIsActive} changeChip={handleChipChange} />
        </Box>
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
