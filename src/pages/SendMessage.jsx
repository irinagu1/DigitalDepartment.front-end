import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { v4 as uuidv4 } from "uuid";
import Container from "@mui/material/Container";
import { baseurl } from "../shared";
import List from "@mui/material/List";
import { LensTwoTone } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { ListItem, NativeSelect } from "@mui/material";
import TableFiles from "../components/SendMessage/TableFiles";
import MainForm from "../components/SendMessage/MainForm";

export default function SendMessage() {
  const [inputsFiles, setInputsFiles] = useState([]);

  const chunkSize = 1048576 * 3;

  const [showProgress, setShowProgress] = useState(false);
  const [counter, setCounter] = useState(1);
  const [fileToBeUpload, setFileToBeUpload] = useState({});
  const [beginingOfTheChunk, setBeginingOfTheChunk] = useState(0);
  const [endOfTheChunk, setEndOfTheChunk] = useState(chunkSize);
  const [progress, setProgress] = useState(0);
  const [fileGuid, setFileGuid] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [chunkCount, setChunkCount] = useState(0);

  const progressInstance = (
    <LinearProgress variant="determinate" value={progress} />
  );

  useEffect(() => {
    if (fileSize > 0) {
      fileUpload(counter);
    }
  }, [fileToBeUpload, progress]);

  const uploadCompleted = async () => {
    const url = baseurl + "documents/UploadComplete?fileName=" + fileGuid;
    var formData = new FormData();
    formData.append("fileName", fileGuid);
    const response = await fetch(url, {
      method: "POST",
      headers: {},
      /*  body: JSON.stringify({
        data: formData,
        fileName: fileGuid,
      }),*/
    });

    if (!response.ok) {
      throw response.status;
    }
    setProgress(100);
  };

  const uploadChunk = async (chunk) => {
    console.log(chunk[0]);
    const url =
      baseurl +
      "documents/UploadChunks?id=" +
      counter +
      "&fileName=" +
      fileGuid;
    try {
      //  debugger;
      const response = await fetch(url, {
        method: "POST",
        //   headers: { "Content-Type": "application/json" },
        body: chunk,
      });

      if (!response.ok) {
        throw response.status;
      }
      setBeginingOfTheChunk(endOfTheChunk);
      setEndOfTheChunk(endOfTheChunk + chunkSize);
      if (counter == chunkCount) {
        console.log("Process is complete, counter", counter);
        await uploadCompleted();
      } else {
        var percentage = (counter / chunkCount) * 100;
        setProgress(percentage);
      }
    } catch (error) {
      debugger;
      console.log("error", error);
    }
  };

  const fileUpload = () => {
    setCounter(counter + 1);
    if (counter <= chunkCount) {
      var chunk = fileToBeUpload.slice(beginingOfTheChunk, endOfTheChunk);
      uploadChunk(chunk);
    }
  };

  const resetChunkProperties = () => {
    setShowProgress(true);
    setProgress(0);
    setCounter(1);
    setBeginingOfTheChunk(0);
    setEndOfTheChunk(chunkSize);
  };

  const getFileContext = (e) => {
    resetChunkProperties();
    const _file = e.target.files[0];
    setFileSize(_file.size);
    const _totalCount =
      _file.size % chunkSize == 0
        ? _file.size / chunkSize
        : Math.floor(_file.size / chunkSize) + 1;
    setChunkCount(_totalCount);
    setFileToBeUpload(_file);
    const _fileID = uuidv4() + "." + _file.name.split(".").pop();
    setFileGuid(_fileID);
  };

  function sendFiles(){
    console.log('sendfiles');
  }

  return (
    <>
      <Container sx={{ mt: "100px", ml: "100px" }}>
       
      <MainForm></MainForm>
        {progressInstance}
      </Container>
    </>
  );
}
