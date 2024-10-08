import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect, useState } from "react";
import { baseurl } from "../../shared";
import { useMediaQuery } from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const users = [
  { id: 1, name: "Ivan" },
  { id: 2, name: "Sergey" },
  { id: 3, name: "Hleb" },
];

export default function ChooseElement(props) {
  const [data, setData] = useState(props.data);
  const isMobile = useMediaQuery('(max-width:600px)');
  function handleChange(value) {
    props.handleChange(value);
  }

  return (
    <>
      {!props.loading ? (
        <Autocomplete
          multiple
          id="checkboxes-users"
          options={props.data}
          disableCloseOnSelect
    

          getOptionLabel={(option) => option.name}
          renderOption={(props, option, { selected }) => {
            const { key, ...optionProps } = props;
            return (
              <li key={key} {...optionProps}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </li>
            );
          }}
        
          renderInput={(params) => (
            <TextField {...params} label={props.content} placeholder={props.content} />
          )}
          onChange={(event, value) => {
            handleChange(value);
          }}
        />
      ) : (
        <p>wait</p>
      )}
    </>
  );
}
