import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect, useState } from "react";
import { baseurl } from "../../shared";
import { Box, FormControl, FormControlLabel, FormGroup, FormLabel, Typography } from "@mui/material";
import CheckBox from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckRoles(props) {
console.log(props.data);

const handleChange = (event) => {
  props.updateChecked(event.target.name);
};
  return (
    <>
      {!props.loading ? (
         <Box sx={{ display: 'flex' }}>
         <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
           <FormLabel component="legend">Assign responsibility</FormLabel>
           <FormGroup>
            {props.data.map(el=> <FormControlLabel
            control={
              <Checkbox checked={el.checked} onChange={handleChange} name={el.name} />
            }
            label={el.name}
          />)}
     </FormGroup>
     </FormControl>
       </Box>
      ) : (
        <p>wait</p>
      )}
    </>
  );
}
