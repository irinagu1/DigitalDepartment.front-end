import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function ParamsDropDown(props) {
  const handleChange = (newId) => {
    props.handleChange(props.docId, props.defId, newId);
  };
  return (
    <FormControl variant="outlined" fullWidth>
      <Select
        key={props.defId}
        defaultValue={props.defId}
        onChange={(e) => {
            handleChange(e.target.value);
        }}
        label="Status"
      >
        {props.data.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
