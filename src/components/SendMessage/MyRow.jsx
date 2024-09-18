import { useState, useEffect } from "react";
import TableRow from "@mui/material/TableRow";
import { MenuItem, NativeSelect, Select } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import SelectElement from "./SelectElement";
import FileFolder from "./FileFolder";
export default function MyRow(props) {
  function handleDocCat(objId, docCatId) {
    props.docCatChange(objId, docCatId);
  }
  function handleDocStat(objId, docCatId) {
    props.docStatChange(objId, docCatId);
  }

  return (
    <TableRow
      key={props.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
      <FileFolder rowId={props.id} fileChange={props.fileChange} inf={props.inf}/>;
      </TableCell>

      {props.loading ? (
        <p>wait</p>
      ) : (
        <>
          <></>
          <TableCell component="th" scope="row">
            <SelectElement
              chan={handleDocCat}
              list={props.dc}
              rowId={props.id}
            />
          </TableCell>
          <TableCell component="th" scope="row">
            <SelectElement
              chan={handleDocStat}
              list={props.ds}
              rowId={props.id}
            />
          </TableCell>
        </>
      )}
      <TableCell component="th" scope="row">
        <Button
          onClick={() => {
            //props.cutFile(props.id);
            console.log("clock");
          }}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
