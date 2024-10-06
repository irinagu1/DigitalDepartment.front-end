import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

export default function SelectCategory(props) {
  const [cats, setCats] = useState(props.categories);
  useEffect(() => {
    setCats(props.categories);
  }, [props.categories]);
  const handleCategoryChange = (event) => {
    props.handleCategoryChange(event.target.value);
  };
  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <InputLabel id="permission-category-label">
        Категория прав доступа
      </InputLabel>
      <Select
        labelId="permission-category-label"
        id="permission-category"
        label="Категории прав доступа"
        value={props.value}
        onChange={handleCategoryChange}
        displayEmpty
      >
        {cats.map((cat) => {
          return (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
