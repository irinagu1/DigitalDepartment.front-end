import { Button, Container, Grid2, Stack, Typography } from "@mui/material";
import StyledContainer from "../components/StyledContainer";
import { useEffect, useState } from "react";
import ParamsDropDown from "../components/AllDocuments/ParamsDropDown";
import { baseurl } from "../shared";
import { useLocation, useNavigate } from "react-router-dom";
import RecipientsList from "../components/AllDocuments/InfoDocuments/RecipientsList";

const fetchDocumentParams = async (parameter) => {
  return fetch(baseurl + parameter, {
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

const updateDocument = async (doc) => {
  return fetch(baseurl + "documents/UpdateDocument", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(doc),
  })
    .then((res) => {
      console.log(res);
      if (res.status !== 204) throw error;
    })
    .then((data) => {
      return data;
    });
};

export default function DocumentsActions() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  console.log(state);
  const [docStatuses, setDocStatuses] = useState([]);
  const [docCategories, setDocCategories] = useState([]);

  useEffect(() => {
    const fetchStatuses = async () => {
      const docStatusesFromDB = await fetchDocumentParams("documentstatuses");
      setDocStatuses(docStatusesFromDB);
    };
    const fetchCategories = async () => {
      const docCategoriesFromDB = await fetchDocumentParams(
        "documentcategories"
      );
      setDocCategories(docCategoriesFromDB);
    };

    fetchStatuses();
    fetchCategories();
  }, []);

  const handleDocStatusChange = (docId, oldId, newId) => {
    if (oldId !== newId) {
      const newDocObject = {
        Id: docId,
        DocumentStatusId: newId,
      };
      updateDocument(newDocObject);
    }
  };
  const handleDocCategoryChange = (docId, oldId, newId) => {
    if (oldId !== newId) {
      const newDocObject = {
        Id: docId,
        DocumentCategoryId: newId,
      };
      updateDocument(newDocObject);
    }
  };
  const goToReport = () => {
    navigate("/document/report", { state: state });
  };

  return (
    <StyledContainer>
      {state ? (
        <Stack>
          <Typography sx={{ml:5, mb:1}}>Название документа: {state.name}</Typography>
          <Typography sx={{ml:5, mb:1}}>Автор: {state.author}</Typography>
          <Stack direction="row">
            <Button variant="outlined" sx={{ ml: 5 }} onClick={goToReport}>
              Отчет по ознакомлению
            </Button>
          </Stack>
          <Container sx={{ m: 2, width: "50%" }}>
            <Typography>Категория: </Typography>
            <ParamsDropDown
              docId={state.id}
              defId={state.documentCategoryId}
              defValue={state.documentCategoryName}
              handleChange={handleDocCategoryChange}
              data={docCategories}
            />
          </Container>
          <Container sx={{ m: 2, width: "50%" }}>
            <Typography>Статус: </Typography>
            <ParamsDropDown
              docId={state.id}
              defId={state.documentStatusId}
              defValue={state.documentStatusName}
              handleChange={handleDocStatusChange}
              data={docStatuses}
            />
          </Container>
          <RecipientsList letterId={state.letterId} />
        </Stack>
      ) : null}
    </StyledContainer>
  );
}
