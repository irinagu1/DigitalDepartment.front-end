import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import MyDatePicker from "./Elements/MyDatePicker";
import MySearchingInput from "./Elements/MySearchingInput";
import MyPropsList from "./Elements/MyPropsList";
import IsSigned from "./Elements/IsSigned";
import { useEffect, useState } from "react";
import ActionCell from "./Elements/ActionsCell";
import { useNavigate } from "react-router-dom";

const formatDate = (oldDate) => {
  if (oldDate === "" || oldDate == null) return oldDate;

  const dateObject = new Date(oldDate);
  const formattedDate = dateObject
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, ".");
  return formattedDate;
};

export default function MyDataGrid(props) {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [mode, setMode] = useState("");

  useEffect(() => {
    setDocuments(props.data);
    setMode(props.mode);
  }, []);

  useEffect(() => {
    setDocuments(props.data);
  }, [props.data]);

  useEffect(() => {
    setMode(props.mode);
  }, [props.mode]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Дата добавления</TableCell>
            <TableCell align="center">Название документа</TableCell>
            <TableCell align="center">Категория</TableCell>
            <TableCell align="center">Статус</TableCell>
            <TableCell align="center">Автор</TableCell>
            <TableCell align="center">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">
              <MyDatePicker handleUpdate={props.handleUpdate} />
            </TableCell>
            <TableCell align="center">
              <MySearchingInput
                label="Название документа"
                parameter="name"
                handleUpdate={props.handleUpdate}
              />
            </TableCell>
            <TableCell align="center">
              <MyPropsList
                parameter="category"
                handleUpdate={props.handleUpdate}
              />
            </TableCell>
            <TableCell align="center">
              <MyPropsList
                parameter="status"
                handleUpdate={props.handleUpdate}
              />
            </TableCell>
            <TableCell align="center">
              <MySearchingInput
                label="Автор"
                parameter="author"
                handleUpdate={props.handleUpdate}
              />
            </TableCell>
            <TableCell align="center">
              {mode === "К ознакомлению" ? (
                <IsSigned
                  parameter="isSigned"
                  handleUpdate={props.handleUpdate}
                />
              ) : null}
            </TableCell>
          </TableRow>
          {documents
            ? documents.map((el) => {
                return (
                  <TableRow key={el.id}>
                    <TableCell align="center">
                      {formatDate(el.dateCreation)}
                    </TableCell>
                    <TableCell align="center">{el.name}</TableCell>
                    <TableCell align="center">
                      {el.documentCategoryName}
                    </TableCell>
                    <TableCell align="center">
                      {el.documentStatusName}
                    </TableCell>
                    <TableCell align="center">{el.author}</TableCell>
                    <TableCell align="center">
                      <ActionCell document={el} handleUpdate={props.handleUpdate}/>
                    </TableCell>
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
