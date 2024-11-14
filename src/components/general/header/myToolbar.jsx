import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function MyToolbar() {
  const navigate = useNavigate();
  return (
    <>
      {localStorage
        .getItem("permissions")
        .includes("Просмотр пользователей") ? (
        <Button
          variant="text"
          color="info"
          size="small"
          onClick={() => {
            navigate("/alldocuments");
          }}
        >
          К списку документов
        </Button>
      ) : null}

      {localStorage
        .getItem("permissions")
        .includes("Просмотр пользователей") ? (
        <Button
          variant="text"
          color="info"
          size="small"
          onClick={() => {
            navigate("/sendmessage");
          }}
        >
          Загрузить документ
        </Button>
      ) : null}

      {localStorage
        .getItem("permissions")
        .includes("Просмотр пользователей") ? (
        <Button variant="text" color="info" size="small"
        onClick={() => {
          navigate("/users/about");
        }}>
          Обо мне
        </Button>
      ) : null}
    </>
  );
}
