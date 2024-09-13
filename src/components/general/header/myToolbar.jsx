import Button from "@mui/material/Button";


export default function MyToolbar() {
  return (
    <>
      {localStorage.getItem("permissions").includes("Create") ? (

        <Button
          variant="text" color="info" size="small"
        >
          К списку документов
        </Button>
      ) : null}

      {localStorage.getItem("permissions").includes("Read") ? (
        <Button
         variant="text" color="info" size="small"
        >
          Загрузить документ
        </Button>
      ) : null}

      {localStorage.getItem("permissions").includes("Update") ? (
        <Button
        variant="text" color="info" size="small"
        >
          Обо мне
        </Button>
      ) : null}
    </>
  );
}
