import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Chip from "@mui/material/Chip";
import TableDocumentCategories from "../components/DocumentCategories/TableDocumentCategories";
import { useEffect, useState, useContext } from "react";
import useFetch from "../hooks/UseFetch";
import { baseurl } from "../shared";
import AddDocumentCategory from "../components/DocumentCategories/AddDocumentCategoryModal";
import AddDocumentCategoryModal from "../components/DocumentCategories/AddDocumentCategoryModal";
import Modal from "@mui/material/Modal";
import { LoginContext } from "../App";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DocumentCategories() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const mode = "light";
  const defaultTheme = createTheme({ palette: { mode } });

  const url = baseurl + "documentcategories";
  const [docCategories, setDocCategories] = useState([]);

  const {
    data: allDocCat,
    errorStatus: allDocCatError,
    request,
    getData,
    appendData,
    deleteData,
    updateData,
  } = useFetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  const [show, setShow] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function toggleShow() {
    setShow(!show);
  }

  useEffect(() => {
    request();

    setDocCategories(allDocCat);
  }, []);
  useEffect(() => {
    setDocCategories(allDocCat);
  });

  function newDocCategory(name) {
    const newObj = { name: name, isEnable: true };
    appendData(
      url,
      {
        "Content-type": "application/json",
      },
      newObj
    );
    setDocCategories(allDocCat);

    toggleShow();
  }

  function DeleteDocCategory(id) {
    console.log(id);
    deleteData(
      url + "/" + id,
      {
        "Content-type": "application/json",
      },
      id
    );
  }

  function HandleEnablingDocCategory(oldData) {
    const newObj = { name: oldData.name, isEnable: !oldData.isEnable };
    updateData(
      url,
      {
        "Content-type": "application/json",
      },
      oldData.id,
      newObj
    );
  }

  function handleChips(isEnable) {
    getData(url,  {
      "Content-type": "application/json",
    }, 'isEnable='+isEnable);
  }

  return (
    <>
      {!loggedIn ? (
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline enableColorScheme />
          <Container
            maxWidth="lg"
            sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
          >
            <div>
              <Typography variant="h3" gutterBottom>
                Категории документов
              </Typography>
              <Typography>Категории документов</Typography>
            </div>
            <Button onClick={handleOpen}>Добавить категорию</Button>
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
              <Chip
                onClick={() => handleChips(true)}
                size="medium"
                label="Активные"
              />
              <Chip
                onClick={() => handleChips(false)}
                size="medium"
                label="Не активные"
                sx={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
              />
            </Box>
            <TableDocumentCategories
              source={docCategories}
              delete={DeleteDocCategory}
              hadleEnabling={HandleEnablingDocCategory}
            />
          </Container>
        </ThemeProvider>
      ) : (
        <h3>Not logged in</h3>
      )}
    </>
  );
}
