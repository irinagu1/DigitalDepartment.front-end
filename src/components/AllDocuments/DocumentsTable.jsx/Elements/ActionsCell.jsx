import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ActionCell(props) {
  const navigate = useNavigate();
  const [document, setDocument] = useState({});
  useEffect(() => {
    console.log("ACTION CELL");
    console.log(props.document);
    setDocument(props.document);
  }, []);

  useEffect(() => {
    setDocument(props.document);
  }, [props.document]);

  const handleSign = () => {
    props.handleUpdate("sign", document.id);
  };
  const handleEdit = () => {
    navigate("/alldocuments/info", {state: props.document  });
  };
  return (
    <>
      {document.isSigned ? (
        <Typography sx={{ml:1, mb:1}}>Ознакомлен {document.signingDate}</Typography>
      ) : (
        <Button onClick={handleSign}> Подписать </Button>
      )}
      <Button onClick={handleEdit}> Редактировать </Button>
      <Button> Скачать </Button>
    </>
  );
}
