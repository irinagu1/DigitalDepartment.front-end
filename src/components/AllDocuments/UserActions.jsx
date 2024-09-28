import { Button } from "@mui/material";

export default function UserActions(props) {
  function handleSign() {
    props.sign(props.params);
  }
  function handleArchive() {
    props.archive(props.params);
  }
  function handleClick() {
    console.log(props.params);
  }
  return (
    <>
      {props.type.whatType == "К ознакомлению" && !props.params.row.isSigned ? (
        <Button onClick={handleSign}>Sign</Button>
      ) : null}
       {props.type.whatType == "К ознакомлению" && props.params.row.isSigned ? (
        <p>Signed {props.params.dateSigned}</p>
      ) : null}
    <Button onClick={handleClick}>Download </Button>
    <p></p>
    <Button onClick={handleArchive}>Toarchive </Button>
    </>
  );
}
