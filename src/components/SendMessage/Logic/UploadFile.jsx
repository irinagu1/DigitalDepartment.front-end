import { baseurl } from "../../../shared";
import { v4 as uuidv4 } from "uuid";

export default async function uploadFile(fileToBeUpload) {
  var todayDate = new Date().toISOString().slice(0, 10);
  let fileName = todayDate + "_" + fileToBeUpload.name;
  // let fileName = todayDate + '_' + fileToBeUpload.name.substring(0, fileToBeUpload.name.lastIndexOf("."));

  let chunkSize = 1048576 * 3;
  let counter = 0;
  //let fileToBeUpload ={};
  let beginingOfTheChunk = 0;
  let endOfTheChunk = chunkSize;
  let progress = 0;
  let fileGuid = "";
  let fileSize = 0;
  let chunkCount = 0;

  /* const [showProgress, setShowProgress] = useState(false);
  const [counter, setCounter] = useState(1);
  const [fileToBeUpload, setFileToBeUpload] = useState({});
  const [beginingOfTheChunk, setBeginingOfTheChunk] = useState(0);
  const [endOfTheChunk, setEndOfTheChunk] = useState(chunkSize);
  const [progress, setProgress] = useState(0);
  const [fileGuid, setFileGuid] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [chunkCount, setChunkCount] = useState(0);*/

  const uploadCompleted = async () => {
    const url = baseurl + "documents/UploadComplete?fileName=" + fileName;
    var formData = new FormData();
    formData.append("fileName", fileName);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      /*  body: JSON.stringify({
        data: formData,
        fileName: fileGuid,
      }),*/
    });

    if (!response.ok) {
      throw response.status;
    }
    console.log("completed UPLOAD");
  };

  const uploadChunk = async (chunk) => {
    const url =
      baseurl +
      "documents/UploadChunks?id=" +
      counter +
      "&fileName=" +
      fileName;
    try {
      //  debugger;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: chunk,
      });

      if (!response.ok) {
        throw response.status;
      }
      beginingOfTheChunk = endOfTheChunk;
      endOfTheChunk = endOfTheChunk + chunkSize;
      if (counter == chunkCount) {
        console.log("Process is complete, counter", counter);
        await uploadCompleted();
      } else {
        var percentage = (counter / chunkCount) * 100;
      }
      return "ok";
    } catch (error) {
      //debugger;
      console.log("error", error);
      return "error";
    }
  };
  const getFileContext = () => {
    const _file = fileToBeUpload;
    fileSize = _file.size;
    const _totalCount =
      _file.size % chunkSize == 0
        ? _file.size / chunkSize
        : Math.floor(_file.size / chunkSize) + 1; // Total count of chunks will have been upload to finish the file
    chunkCount = _totalCount;

    // const _fileID = uuidv4() + "." + _file.name.split(".").pop();
    //fileGuid =  _fileID;
  };

  const fileUpload = async () => {
    getFileContext();

    counter = counter + 1;
    if (counter <= chunkCount) {
      var chunk = fileToBeUpload.slice(beginingOfTheChunk, endOfTheChunk);
      const partRes = await uploadChunk(chunk);
      if (partRes !== "ok") return "error";
    }

    return "ok";
  };

  const resetChunkProperties = () => {
    progress = 0;
    counter = 1;
    beginingOfTheChunk = 0;
    endOfTheChunk = chunkSize;
  };

  const res = await fileUpload();
  if (res !== "ok") return "error";
  else return fileName;
}
