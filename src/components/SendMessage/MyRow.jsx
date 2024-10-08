import TableRow from "@mui/material/TableRow";
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

  const handleDelete = () => {
    props.handleDelete(props.id);
  };
  return (
    <TableRow
      key={props.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row" align="center">
        <FileFolder rowId={props.id} fileChange={props.fileChange} />
      </TableCell>

      {props.loading ? (
        <p>wait</p>
      ) : (
        <>
          <TableCell component="th" scope="row" align="center">
            <SelectElement
              chan={handleDocCat}
              list={props.dc}
              rowId={props.id}
            />
          </TableCell>
          <TableCell component="th" scope="row" align="center">
            <SelectElement
              chan={handleDocStat}
              list={props.ds}
              rowId={props.id}
            />
          </TableCell>
        </>
      )}
      <TableCell component="th" scope="row" align="center">
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            handleDelete();
          }}
        >
          Удалить
        </Button>
      </TableCell>
    </TableRow>
  );
}
