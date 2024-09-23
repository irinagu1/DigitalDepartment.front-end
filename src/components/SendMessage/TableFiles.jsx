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
