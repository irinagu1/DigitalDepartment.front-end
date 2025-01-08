import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../shared";

export default function Actions(props) {
  const handleDeactivate = () => {
    props.handleDeactivate(props.params.row.id);
  };
  const handleDelete = () => {
    props.handleDelete(props.params.row.id);
  };
  return (
    <>
      <Button variant="outlined" onClick={handleDeactivate}>
        {props.isActive === true ? "Деактивировать" : "Активировать"}
      </Button>
      {props.params.row.connectedUsers === 0 ? (
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Удалить
        </Button>
      ) : null}
    </>
  );
}
