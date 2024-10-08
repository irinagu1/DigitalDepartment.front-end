import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TableFiles(props) {

  return (
    <TableContainer component={Paper}>
      <Table id="mytable" sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Файл</TableCell>
            <TableCell align="center">Категория</TableCell>
            <TableCell align="center">Статус</TableCell>
            <TableCell align="center">Действия</TableCell>
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
