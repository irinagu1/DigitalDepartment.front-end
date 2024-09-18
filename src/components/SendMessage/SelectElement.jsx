import React, { useState, useEffect } from "react";
import { NativeSelect } from "@mui/material";

export default function SelectElement(props) {
  const [options, setOptions] = useState(props.list[0].id);

  return (
    <NativeSelect
      value={options}
      onChange={(e) => {  

        setOptions(e.target.value);

        props.chan(props.rowId, e.target.value);
      }}
    >
      {props.list.map((el) => {
        return (
          <option key={el.id} value={el.id}>
            {el.name}
          </option>
        );
      })}
    </NativeSelect>
  );
}
