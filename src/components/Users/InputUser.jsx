import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function InputUser(props) {
  const [value, setValue] = useState(props.value);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleValueChange = (event) => {
    props.handleValueChange(event.target.value);
  };

  return (
    <TextField
      label={value ? "" : props.labelName}
      variant="outlined"
      fullWidth
      value={value}
      onChange={handleValueChange}
      sx={{ mb: 4 }}
    />
  );
}
