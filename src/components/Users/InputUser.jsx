import { Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function InputUser(props) {
  const [value, setValue] = useState(props.value);
  const [nameError, setNameError] = useState(false);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleValueChange = (event) => {
    props.handleValueChange(event.target.value);
    console.log("dd");
    console.log(event.target.value.length);
    setValue(event.target.value);
    if (props.labelName !== "Пароль" && event.target.value !== "") {
      setNameError(false);
    } else {
      setNameError(true);
    }
    if (props.labelName === "Пароль") forPassword(event.target.value);
  };

  const forPassword = (value) => {
    if (value.length < 6 || !/\d/.test(value)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  return (
    <Stack >
    <Typography sx={{ pr:1}}>{props.labelName}:</Typography>
    <TextField
      id={props.labelName}
      variant="outlined"
      fullWidth
      value={value}
      onChange={handleValueChange}
      error={nameError}
      helperText={
        nameError
          ? props.labelName === "Пароль"
            ? "Пароль должен содержать минимум 1 цифру и иметь более 5 символов"
            : "Обязательное поле"
          : ""
      }
      sx={{ mb: 2 }}
    />
    </Stack>
  );
}
