import { useEffect, useState } from "react";
import { baseurl } from "../../shared";
import RolesTable from "../../components/Roles/RolesTable";
import { Button, Container } from "@mui/material";
import ChoosePanel from "../../components/ChoosePanel";

const fetchData = async (parameter) => {
  return fetch(baseurl + "users/GetWithParameters?isActive=" + parameter, {
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
export default function AllUsers() {
  const [activeChip, setActiveChip] = useState(chipsIsActive[0]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchUsers();
    setLoading(false);
  }, []);

  useEffect(() => {
    updateList();
  }, [isActive]);

  const updateList = async () => {
    setLoading(true);
    fetchUsers();
    setLoading(false);
  };
  const fetchUsers = async () => {
    const usersFromDB = await fetchData(isActive);
    setUsers(usersFromDB);
  };
  const handleAdd = async () => {
    console.log(add);
  };

  const handleChipChange = (newChip) => {
    setActiveChip(newChip);
    setIsActive(!isActive);
    console.log(newChip);
  };
  return (
    <>
      <Container sx={{ mt: "100px", ml: "100px" }}>
        <Button onClick={handleAdd}>Register</Button>
        <ChoosePanel chips={chipsIsActive} changeChip={handleChipChange} />
        <RolesTable
          loading={loading}
          rows={users}
          chip={activeChip}
          handleDeactivate={handleDeactivate}
        />
      </Container>
    </>
  );
}
