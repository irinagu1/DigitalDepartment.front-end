import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Construction } from "@mui/icons-material";
import SelectElement from "./SelectElement";
import useFetch from "../../hooks/UseFetch";
import { baseurl } from "../../shared";
import { MenuItem, NativeSelect, Select } from "@mui/material";
import { v4 as uuid } from "uuid";
import MyRow from "./MyRow";

export default function TableFiles(props) {
  const [docCategories, setDocCategories] = useState([]);
  const [docStatuses, setDocStatuses] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
console.log('table comp')
console.log(props.inf);
  const handleSelectOnChange = (event) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
  };

  function fileChange(objId, newFile) {

    const currObject = inf.find((el)=> el.id == objId);
    const newObject= {id: objId,
        file: newFile,
        docC: currObject.docC,
        docS: currObject.docS
    }
    setInf([...inf, newObject]);

  }


  return (
    
    <TableContainer component={Paper}>
      <Table id="mytable" sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Файл</TableCell>
            <TableCell align="right">Категория</TableCell>
            <TableCell align="right">Статус</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.inputsFiles.map((row) => {
            return  row;
          })}
        </TableBody>
      </Table>

    </TableContainer>
  );
}
