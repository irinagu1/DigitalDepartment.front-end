import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function InputName(props) {
  const[name, setName] = useState(props.roleName);
  useEffect(()=>{
    setName(props.roleName);
  }, [props.roleName])

  const handleRoleNameChange = (event) => {

    props.handleRoleNameChange(event.target.value);
  };

    return (
        <TextField
        label={name ? "" : "NameRole"}
        variant="outlined"
        fullWidth
        value={name}
        onChange={handleRoleNameChange}
        sx={{ mb: 4 }}
      />
    );
  }
  