import MenuItem from "@mui/material/MenuItem";

export default function MyPhoneToolbar() {
  return (
    <>
      {localStorage.getItem("permissions").includes("Create") ? (
        <MenuItem key="toalldocs">
          К списку документов
        </MenuItem>
      ) : null}

      {localStorage.getItem("permissions").includes("Read") ? (
        <MenuItem >Загрузить документ</MenuItem>
      ) : null}

      {localStorage.getItem("permissions").includes("Update") ? (
        <MenuItem>Обо мне</MenuItem>
      ) : null}
    </>
  );
}
