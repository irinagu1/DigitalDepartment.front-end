import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect, useState } from "react";
import { baseurl } from "../../shared";
import { InputLabel, MenuItem, Select } from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function ChoosePosition(props) {
  
  const [position, setPosition] = useState();

  function handleChange(event) {
    const newPosition = props.data.find((el) => el.id == event.target.value);
  setPosition(event.target.value);  
  props.handleChange(newPosition.id);
  }


  return (
    <>
      {!(props.data == undefined) ? (
        <>
         
          <Select
          sx={{mb:2, width:'500px'}}
 
            id="select"
            value={position}
         
            label="Должность"
            onChange={handleChange}
          >
            {props.data.map((el) => {
              return <MenuItem value={el.id}>{el.name}</MenuItem>;
            })}
          </Select>
        </>
      ) : (
        <p>wait</p>
      )}
    </>
  );
}
