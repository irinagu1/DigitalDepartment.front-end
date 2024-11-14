import { useEffect, useState } from "react";
import { baseurl } from "../../../../shared";
import { IconButton, MenuItem, Select } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";


export default function IsSigned(props) {
  const [list, setList] = useState([{id:1, name:"Подписан", val: true}, {id:2, name:"Не подписан", val: false}]);
  const [value, setValue] = useState("");

  useEffect(() => {
    const newObj = list.filter((e) => e.id === value);
    const newName =
      newObj[0] !== undefined && newObj[0].name ? newObj[0].val : null;
    props.handleUpdate(props.parameter, newName);
  }, [value]);

  const handleChange = (info) => {
    setValue(info);
  };
  return (
    <>
        <Select
          key={list[0].id}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          label="sth"
          value={value}
        >
          <IconButton onClick={() => setValue("")}>
            <ClearIcon />
          </IconButton>{" "}
          {list.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
    </>
  );
}
