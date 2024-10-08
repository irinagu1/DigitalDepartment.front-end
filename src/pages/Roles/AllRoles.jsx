import { useEffect, useState } from "react";
import { baseurl } from "../../shared";
import RolesTable from "../../components/Roles/RolesTable";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import ChoosePanel from "../../components/ChoosePanel";
import StyledContainer from "../../components/StyledContainer";
import { useNavigate } from "react-router-dom";

const fetchData = async (parameter, withUsers) => {
  const ifWithUsers = withUsers ? "&WithUsersAmount=" + withUsers : "";
  const currUrl =
    baseurl + "roles/GetWithParameters?isActive=" + parameter + ifWithUsers;
  return fetch(currUrl, {
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

export default function AllRoles() {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [activeChip, setActiveChip] = useState(chipsIsActive[0]);
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchRoles();
    setLoading(false);
  }, []);

  useEffect(() => {
    updateList();
  }, [isActive]);

  const updateList = async () => {
    fetchRoles();
  };
  const fetchRoles = async () => {
    const rolesFromDB = await fetchData(isActive, true);
    setRoles(rolesFromDB);
  };
  const handleChipChange = (newChip) => {
    setActiveChip(newChip);
    setIsActive(!isActive);
    console.log(newChip);
  };

  const deactivateRole = async (roleId) => {
    const path = baseurl + "roles/toArchive?roleId=" + roleId;
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
          const newList = roles.filter((el) => el.id !== roleId);
          setRoles(newList);
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
  const deleteRole = async (roleId) => {
    const path = baseurl + "roles/" + roleId;
    return fetch(path, {
      method: "DELETE",
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
          setSnackbarMessage("Успешно!");
          setSnackbarSeverity("success");
          const newList = roles.filter((el) => el.id !== roleId);
          setRoles(newList);
        }
        setSnackbarOpen(true);
        
      });
  };
  const handleAdd = () => {
    navigate("/roles/add");
  };
  const handleDeactivate = (id) => {
    deactivateRole(id);
 
  };
  const handleDelete = (id) => {
    deleteRole(id);

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
        <Typography variant="h4"  gutterBottom>
          Управление ролями
        </Typography>
        <Stack spacing={2}>
          <Button
            sx={{ width: "30%", alignSelf: "left" }}
            variant="outlined"
            color="primary"
            onClick={handleAdd}
          >
            Добавить новую роль
          </Button>
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

          {loading ? (
            <CircularProgress />
          ) : (
            <RolesTable
              loading={loading}
              rows={roles}
              chip={activeChip}
              handleDeactivate={handleDeactivate}
              handleDelete={handleDelete}
              isActive={isActive}
            />
          )}
        </Stack>
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
