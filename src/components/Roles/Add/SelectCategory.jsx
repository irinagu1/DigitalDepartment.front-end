import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function SelectCategory(props) {

  const handleCategoryChange =(event) =>{
 
    props.handleCategoryChange(event.target.value);
  }
  return (
    <FormControl fullWidth sx={{ mb: 4 }}>
      <InputLabel id="permission-category-label">
        Select Permission Category
      </InputLabel>
      <Select
        labelId="permission-category-label"
        value={props.value}
        onChange={handleCategoryChange}
        displayEmpty
      >
        {props.categories.map((cat) => {
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
