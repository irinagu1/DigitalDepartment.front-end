import Button from "@mui/material/Button";

export default function MyToolbar() {
  return (
    <>
      {localStorage.getItem("permissions").includes("Create") ? (
        <Button
          key="toalldocs"
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          К списку документов
        </Button>
      ) : null}

      {localStorage.getItem("permissions").includes("Read") ? (
        <Button
          key="adddoc"
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          Загрузить документ
        </Button>
      ) : null}

      {localStorage.getItem("permissions").includes("Update") ? (
        <Button
          key="aboutme"
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          Обо мне
        </Button>
      ) : null}
    </>
  );
}
