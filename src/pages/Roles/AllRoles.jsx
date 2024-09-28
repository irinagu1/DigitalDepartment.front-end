import { useEffect, useState } from "react";
import { baseurl } from "../../shared";
import RolesTable from "../../components/Roles/RolesTable";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import ChoosePanel from "../../components/ChoosePanel";

const fetchData = async (parameter) => {
  return fetch(baseurl + "roles/GetWithParameters?isActive=" + parameter, {
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
      return res.json();
    })
    .then((data) => {
      return data;
    });
};

const chipsIsActive = ["Активные", "Архив"];
export default function AllRoles() {
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
    setLoading(true);
    fetchRoles();
    setLoading(false);
  };
  const fetchRoles = async () => {
    const rolesFromDB = await fetchData(isActive);
    setRoles(rolesFromDB);
  };
  const handleChipChange = (newChip) => {
    setActiveChip(newChip);
    setIsActive(!isActive);
    console.log(newChip);
  };
  const handleAdd = () => {
    console.log("add");
  };
  const handleDeactivate = (id) => {
    deactivateRole(id);
    const newList = roles.filter((el) => el.id !== id);
    setRoles(newList);
  };
  return (
    <>
      <Container sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Roles Management
        </Typography>
        <Stack spacing={2}>
          <Button
            sx={{ width: "100px", alignSelf: "left" }}
            variant="contained"
            color="primary"
            onClick={handleAdd}
          >
            Add
          </Button>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ChoosePanel chips={chipsIsActive} changeChip={handleChipChange} />
          </Paper>

          {loading ? (
            <CircularProgress />
          ) : (
            <RolesTable
              loading={loading}
              rows={roles}
              chip={activeChip}
              handleDeactivate={handleDeactivate}
            />
          )}
        </Stack>
      </Container>
    </>
  );
}
