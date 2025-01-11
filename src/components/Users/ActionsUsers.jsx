import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../shared";
import { DeleteOutline } from "@mui/icons-material";

export default function ActionsUsers(props) {
  const navigate = useNavigate();

  const dataToSend = { id: props.params.row.id };

  const handleEdit = () => {
    navigate("/users/update", { state: dataToSend });
  };
  const handleDeactivate = () => {
    props.handleDeactivate(props.params.row.id);
  };
  const handleDelete = () => {
    props.handleDelete(props.params.row.id);
  };
  const handlePassword = () => {
    navigate("/users/password", { state: props.params.row });
  };

  return (
    <><Stack direction='row'>
      <Button onClick={handleEdit}>Редактировать</Button>
      <Button onClick={handleDeactivate}>
        {" "}
        {props.isActive === true ? "Деактивировать" : "Активировать"}
      </Button>
      <Button onClick={handlePassword}>Смена пароля</Button>
      {props.params.row.canDelete ? (
        <Button variant="text" color="error" onClick={handleDelete}>
          Удалить{" "}
        </Button>
      ) : null}
    </Stack>
    </>

  );
}
