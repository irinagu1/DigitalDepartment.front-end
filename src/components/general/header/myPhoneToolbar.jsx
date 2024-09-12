import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

export default function MyPhoneToolbar() {
  return (
    <>
      {localStorage.getItem("permissions").includes("Create") ? (
        <MenuItem key="toalldocs" onClick={handleCloseNavMenu}>
          <Typography sx={{ textAlign: "center" }}>
            К списку документов
          </Typography>
        </MenuItem>
      ) : null}

      {localStorage.getItem("permissions").includes("Read") ? (
        <MenuItem key="adddoc" onClick={handleCloseNavMenu}>
          <Typography sx={{ textAlign: "center" }}>
            {" "}
            Загрузить документ
          </Typography>
        </MenuItem>
      ) : null}

      {localStorage.getItem("permissions").includes("Update") ? (
        <MenuItem key="aboutme" onClick={handleCloseNavMenu}>
          <Typography sx={{ textAlign: "center" }}> Обо мне</Typography>
        </MenuItem>
      ) : null}
    </>
  );
}
