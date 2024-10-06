import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../shared";

export default function ActionsUsers(props) {
  const navigate = useNavigate();

  const dataToSend = { id: props.params.row.id };

  const handleEdit = () => {
    navigate("/users/update", { state: dataToSend });
  };
  const handleDeactivate = () => {
    props.handleDeactivate(props.params.row.id);
  };
  const handlePassword = () => {
    navigate("/users/password", { state: props.params.row });
  };

  return (
    <>
      <Button onClick={handleEdit}>Редактировать</Button>
      <Button onClick={handleDeactivate}>
        {" "}
        {props.isActive === true ? "Деактивировать" : "Активировать"}
      </Button>
      <Button onClick={handlePassword}>Смена пароля</Button>

    </>
  );
}
