import MenuItem from "@mui/material/MenuItem";

export default function MyPhoneToolbar() {
  return (
    <>
      {localStorage.getItem("permissions").includes("Create") ? (
        <MenuItem key="toalldocs" onClick={handleCloseNavMenu}>
          К списку документов
        </MenuItem>
      ) : null}

      {localStorage.getItem("permissions").includes("Read") ? (
        <MenuItem onClick={handleCloseNavMenu}>Загрузить документ</MenuItem>
      ) : null}

      {localStorage.getItem("permissions").includes("Update") ? (
        <MenuItem onClick={handleCloseNavMenu}>Обо мне</MenuItem>
      ) : null}
    </>
  );
}
