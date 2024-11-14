import { useState } from "react";
import StyledContainer from "../StyledContainer";
import { baseurl } from "../../shared";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const fetchInfo = () => {
  return fetch(baseurl + "users/userInfo", {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("error");
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default function AboutUser() {
  const [info, setInfo] = useState();
  useState(() => {
    const fetchInfoFromDb = async () => {
      const dataFromDb = await fetchInfo();
      setInfo(dataFromDb);
    };
    fetchInfoFromDb();
  }, []);
  return <StyledContainer>{info ? <>
  <Typography sx={{ backgroundColor: '#f1f8e9' }} >Фамилия: {info.user.lastName}</Typography>
  <Typography>Имя: {info.user.firstName}</Typography>
  <Typography sx={{ backgroundColor: '#f1f8e9' }}  >Отчество: {info.user.secondName}</Typography>
  <Typography>Логин: {info.user.userName}</Typography>
  <Typography sx={{ backgroundColor: '#f1f8e9' }} >Роли: </Typography>
  <List dense={false} >
                {info.roles.map((e) => (
                  <ListItem>
                    <ListItemText primary={e.name} />
                  </ListItem>
                ))}
              </List>
  </> : <p>wait</p>}</StyledContainer>;
}
