import React, { useState, useEffect } from "react";
import { NativeSelect } from "@mui/material";

export default function SelectElement(info) {
  const [options, setOptions] = useState(info);
 
  return (
    <>
        {options ? (
            options.map((elem)=>{console.log('mapping')})
       
        ) : null}
    </>
  );
}
