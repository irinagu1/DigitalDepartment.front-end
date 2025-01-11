import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../shared";

export default function Actions(props) {
  const navigate = useNavigate();
  const dataToSend = { id: props.params.row.id };
  const handleEdit = () => {
    // console.log(props);
    navigate("/roles/update", { state: dataToSend });
  };
  const handleDeactivate = () => {
    props.handleDeactivate(props.params.row.id);
  };
  const handleDelete = () => {
    props.handleDelete(props.params.row.id);
  };
  return (
    <>
    <Stack direction="row" spacing={1} justifyContent="center">
      <Button variant="outlined" onClick={handleEdit}>
        Редактировать
      </Button>
      <Button variant="outlined" onClick={handleDeactivate}>
        {props.isActive === true ? "Деактивировать" : "Активировать"}
      </Button>
      {props.params.row.connectedUsers === 0 ? (
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Удалить
        </Button>
      ) : null}
      </Stack>
    </>
  );
}
