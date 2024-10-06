import {
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function PermissionsList(props) {
  const [checkedPermissions, setCheckedPermissions] = useState([]);
  const [permissions, setPermissions] = useState([]);

 /* useEffect(() => {
    const perms = props.permissions.map((el) => {
      return { id: el.id, name: el.name, checked: false };
    });
    setPermissions(perms);
  }, []);

  useEffect(() => {
    const perms = props.permissions.map((el) => {
      return { id: el.id, name: el.name, checked: false };
    });
    setPermissions(perms);
  }, [props.permissions]);*/


  const handlePermissionChange = (event) => {

    console.log("handlePermissionChange");
    console.log(event.target);
    props.handlePermissionChange(event.target.name);
  };
  return (
    <FormControl component="fieldset" sx={{ mb: 4 }}>
      <Typography variant="h6">Выберите возможности для роли:</Typography>
      <FormGroup>
        {props.permissions.map((permission) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={permission.checked}
                onChange={handlePermissionChange}
                name={permission.name}
              />
            }
            label={permission.name}
            key={permission.id}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
