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
import { NativeSelect } from "@mui/material";
import { v4 as uuid } from 'uuid'

export default function TableFiles(props) {
  const [inputsFiles, setInputsFiles] = useState([]);
  const [docCategories, setDocCategories] = useState([]);
  const [docStatuses, setDocStatuses] = useState([]);

  let InputFile = <input type="file" />;

  const url = baseurl + "documentcategories";
  const {
    data,
    errorStatus: allDocCatError,
    request,
    getData,
    appendData,
    deleteData,
    updateData,
    getInfo
  } = useFetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    props.sendData();
   fetchDocCat();

  }, []);

  
  const fetchDocCat = async ()=> {
    const res = await fetch('https://localhost:7156/api/documentcategories');
    const data = await res.json();

    const ds = await fetch('https://localhost:7156/api/documentstatuses');
    const dsData = await ds.json();
    setDocCategories(data);
    setDocStatuses(dsData);
    setLoading(false);
  }
  function appendFile() {
    const newUuid = uuid();
    let inF = <input type="file" id ={newUuid} />;
    setInputsFiles([...inputsFiles, inF]);
    console.log(inputsFiles);
  }



  function cutFile(id){
    console.log(id);
    const newinputsFiles = inputsFiles.filter((el) => el.props.id !== id);
    setInputsFiles(newinputsFiles);
  }

  function sendInfo(){
    console.log(inputsFiles);
  }
  return (
    <>
      <Button
        onClick={() => {
          appendFile();
        }}
      >
        Add
      </Button>
      <TableContainer component={Paper}>
        <Table id='mytable' sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Файл</TableCell>
              <TableCell align="right">Категория</TableCell>
              <TableCell align="right">Статус</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inputsFiles.map((row) => {

              return <TableRow key={row.props.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row}
                </TableCell>
              
                {loading ? (<p>wait</p>) :(<>
                     <TableCell component="th" scope="row">
                    <NativeSelect
                    defaultValue={30}
                    inputProps={{
                      name: "age",
                      id: "uncontrolled-native",
                    }}
                  >
                    {docCategories.map((el) => {
                      return <option key={el.id} value={el.id}>{el.name}</option>;
                    })}
                    
                  </NativeSelect>
                  
                  </TableCell>
                  <TableCell component="th" scope="row">
                  <NativeSelect
                    defaultValue={30}
                    inputProps={{
                      name: "age",
                      id: "uncontrolled-native",
                    }}
                  >
                    {docStatuses.map((el) => {
                      return <option key={el.id} value={el.id}>{el.name}</option>;
                    })}
                    
                  </NativeSelect>
                  </TableCell>
                  </>
                )}
                <TableCell component="th" scope="row">
                  <Button onClick={()=>{cutFile(row.props.id)}}>Delete</Button>
                </TableCell>
              </TableRow>;
            })}
          </TableBody>
        </Table>
        <Button onClick={()=>{sendInfo()}}>Send</Button>
      </TableContainer>
    </>
  );
}
