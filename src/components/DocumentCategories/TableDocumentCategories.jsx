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
import { styled } from "@mui/system";

const CustomHead = styled(TableCell)(({ theme }) => ({
  backgroundColor: "#1976d2",
  color: "#fff",
  fontWeight: "bold",
}));
export default function TableDocumentCategories(props) {
  const [info, setInfo] = useState(props.source);
  useEffect(() => {
    setInfo(props.source);
    console.log(info);
  });

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CustomHead align="center">Название</CustomHead>
              <CustomHead align="center">
                Количество связанных документов
              </CustomHead>
              <CustomHead align="center">Доступные действия</CustomHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {info
              ? info.map((row) => {
                  return (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {row.name}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {row.connectedDocuments}
                      </TableCell>
                      <TableCell align="center">
                        {" "}
                        {row.connectedDocuments === 0 ? (
                          <Button onClick={() => props.delete(row.id)}>
                            Удалить
                          </Button>
                        ) : null}
                        <Button onClick={() => props.hadleEnabling(row)}>
                          {props.isActive ? 'Деактивировать' : 'Активировать'}

                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
