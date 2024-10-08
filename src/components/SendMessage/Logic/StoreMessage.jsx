import { useState } from "react";
import { baseurl } from "../../../shared";
import uploadFile from "./UploadFile";
import storeRecipients from "./StoreRecipients";

export default async function storeMessage(props) {
  let isError = false;
  let letterId;

  const createLetter = async () => {
    await fetchNewMessageId();
    if (isError) return "error";
    else return "ok";
  };
  const fetchNewMessageId = async () => {
    const newLetter = {};
    //create letter entity
    const res = await fetch(baseurl + "letters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(newLetter),
    });
    if (!res.ok) {
      isError = true;
      return;
    }
    const data = await res.json();
    //set created letter id
    letterId = data;
    console.log("created letter entity");

    //add documents entities and upload
    await addFiles(letterId);
    if (isError) {
      return;
    }
    //store recipients
    const resAddR = await storeRecipients(
      props.recipients,
      props.asRecipients,
      props.recipientsToCheck,
      letterId
    );
    if (resAddR !== "ok") {
      isError = true;
      return;
    }

    if (isError) {
      return "error";
    }
    return "ok";
  };

  //add documents entities and upload
  const addFiles = async (info) => {
    var todayDate = new Date().toISOString().slice(0, 10);
    props.allFiles.forEach(async (item) => {
      let fn =  todayDate + "_" + item.file.name;
      const documentDb = {
        Name: fn,
        DocumentStatusid: item.docS,
        DocumentCategoryId: item.docC,
        LetterId: info,
        isArchived: false,
      };
      let res = await createDocument(documentDb);
      if (res !== "ok") {
        isError = true;
        return "error";
      }
      //upload file
    
      let fileNameForDb = await uploadFile(item.file);
      if (fileNameForDb == "error") {
        isError = true;
        return "error";
      }
    
      //create doc entity
     
    });
 
  };

  const createDocument = async (obj) => {
    await fetch(baseurl + "documents/CreateDocument", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(obj),
    }).then((res) => {
      if (!res.ok) {
        isError = true;
        return "error";
      } else return "ok";
    });
  };

  await createLetter();
  if (isError) return "error";
  else return "ok";
}
