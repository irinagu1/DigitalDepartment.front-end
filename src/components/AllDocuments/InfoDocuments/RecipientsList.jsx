import {
  Grid2,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { baseurl } from "../../../shared";
import styled from "@emotion/styled";

const fetchData = async (parameter) => {
  return fetch(baseurl  + parameter, {
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

export default function RecipientsList(props) {
  const [letterId, setLetterId] = useState(props.letterId);
  const [recipients, setRecipients] = useState();
  useEffect(() => {
    const fetchRecipients = async () => {
      const recipientsFromDB = await fetchData("letters/GetByCategories?letterId=" + letterId);
      console.log("getted recipients:");
      console.log(recipientsFromDB);
      setRecipients(recipientsFromDB);
    };
    fetchRecipients();
  }, []);

  return (
    <Grid2 sx={{ml:5}} container spacing={2}>
      {recipients ? (
        <Grid2 item xs={12} md={6}>
          <Stack direction="row">
            <Stack sx={{ backgroundColor: '#f1f8e9' }}>
              <Typography sx={{ mt: 1, mb: 1 }} variant="h6" component="div">
                Для просмотра:
              </Typography>
              <Typography sx={{ mt: 1, mb: 1 }} variant="h6" component="div">
                Роли:
              </Typography>
              <List dense={false}>
                {recipients.rolesToShow.map((e) => (
                  <ListItem>
                    <ListItemText primary={e.name} />
                  </ListItem>
                ))}
              </List>
              <Typography sx={{ mt: 1, mb: 1 }} variant="h6" component="div">
                Пользователи:
              </Typography>
              <List dense={false}>
                {recipients.userToShow.map((e) => (
                  <ListItem>
                    <ListItemText primary={e.fullName} />
                  </ListItem>
                ))}
              </List>
            </Stack>
            <Stack sx={{ backgroundColor: '#f1f8e9' }}>
              <Typography sx={{ mt: 1, mb: 1 }} variant="h6" component="div">
                Для ознакомления:
              </Typography>
              <Typography sx={{ mt: 1, mb: 1 }} variant="h6" component="div">
                Роли:
              </Typography>
              <List dense={false}>
                {recipients.rolesToCheck.map((e) => (
                  <ListItem>
                    <ListItemText primary={e.name} />
                  </ListItem>
                ))}
              </List>
              <Typography sx={{ mt: 1, mb: 1 }} variant="h6" component="div">
                Пользователи:
              </Typography>
              <List dense={false}>
                {recipients.userToCheck.map((e) => (
                  <ListItem>
                    <ListItemText primary={e.fullName} />
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Stack>
        </Grid2>
      ) : null}
    </Grid2>
  );
}
