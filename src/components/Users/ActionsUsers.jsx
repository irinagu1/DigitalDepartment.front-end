import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../shared";


export default function ActionsUsers(props) {
  const navigate = useNavigate();
  const dataToSend = { id: props.params.row.id };
  const handleEdit = () => {
    // console.log(props);
    navigate("/users/update", { state: dataToSend });
  };
  const handleDeactivate = () => {
    props.handleDeactivate(props.params.row.id);
  };
  const handlePassword = () => {
    //props.handleDeactivate(props.params.row.id);
  };
  return (
    <>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDeactivate}>Deactivate</Button>
      <Button onClick={handlePassword}>Set pass</Button>
    </>
  );
}
