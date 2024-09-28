import { Button } from "@mui/material";
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
  return (
    <>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDeactivate}>Deactivate</Button>
    </>
  );
}
