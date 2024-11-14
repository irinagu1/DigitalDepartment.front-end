import dayjs from "dayjs/locale/ru";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import { ruRU } from '@mui/x-date-pickers/locales';
import { Stack } from "@mui/material";

export default function MyDatePicker(props) {

  const [value, setValue] = useState(undefined);

  useEffect(() => {
    console.log(value);
  }, []);
  
  useEffect(() => {
    console.log(value);
    props.handleUpdate("date", value);
  }, [value]);
  return (
    <>
    <Stack direction="row" >
    
      <LocalizationProvider dateAdapter={AdapterDayjs}      adapterLocale="ru" localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}>
        <DatePicker
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </LocalizationProvider>
      <IconButton onClick={() => setValue(undefined)}>
        <ClearIcon />
      </IconButton>
      </Stack>
    </>
  );
}
