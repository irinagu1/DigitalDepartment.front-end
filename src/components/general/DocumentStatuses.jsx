import { baseurl } from "../../shared";
import Button from "@mui/material/Button";
export default function DocumentStatuses() {
  function getF() {
    fetch(baseurl + "users",{
        headers:{
          'Content-type':'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        }
      } )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("perms");
        console.log(data);
      });
  }
  return (
    <>
      <h1>DocStatuses</h1> <Button onClick={getF}>ddd</Button>
    </>
  );
}
