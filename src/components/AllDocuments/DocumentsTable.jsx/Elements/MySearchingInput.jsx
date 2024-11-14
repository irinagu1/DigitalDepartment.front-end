import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function MySearchingInput(props) {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(value);
  const debounceDelay = 1000; // Delay in milliseconds

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, debounceDelay]);

  useEffect(() => {

    props.handleUpdate(props.parameter, debouncedValue);
  }, [debouncedValue]);

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <TextField  fullWidth label={props.label} variant="outlined" value={value} onChange={handleInputChange} />
  );
}
