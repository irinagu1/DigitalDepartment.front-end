import { Box, Button, TextField, Typography } from "@mui/material";
import StyledContainer from "../../components/StyledContainer";
import { useLocation } from "react-router-dom";

export default function ChangePassword(props) {
    const location = useLocation();
    const { state } = location;
    console.log(state);
console.log(props.state);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography>Смена пароля для пользователя: {state.fullName}</Typography>
      <Typography sx={{m:2}}>Новый пароль:</Typography>
      <TextField></TextField>
      <Typography sx={{m:2}}>Повторите пароль:</Typography>
      <TextField></TextField>
      <Button>cc</Button>
    </Box>
  );
}
