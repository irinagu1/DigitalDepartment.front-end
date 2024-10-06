import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function InputName(props) {
  const [name, setName] = useState(props.roleName);

  useEffect(() => {
    setName(props.roleName);
  }, [props.roleName]);

  const handleRoleNameChange = (event) => {
    props.handleRoleNameChange(event.target.value);
    setName(event.target.value);
  };

  return (
    <>
    <Typography variant="h6">Имя:</Typography>
    <TextField
      variant="outlined"
      fullWidth
      value={name}
      onChange={handleRoleNameChange}
      sx={{ mb: 4 }}
    />
    </>
  );
}
