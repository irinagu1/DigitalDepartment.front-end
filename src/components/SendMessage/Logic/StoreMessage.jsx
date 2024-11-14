import { useState } from "react";
import { baseurl } from "../../../shared";
import uploadFile from "./UploadFile";
import storeRecipients from "./StoreRecipients";

export default async function storeMessage(props) {
  let isError = false;
  let letterId;
  let creationDate;

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
    letterId = data.id;
    creationDate = data.creationDate;
    console.log("created letter entity");

    //add documents entities and upload
    await addFiles(letterId, creationDate);
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
  const addFiles = async (info, creatDate) => {
    var todayDate = new Date().toISOString().slice(0, 10);
    for (const item of props.allFiles) {  
      //upload file

      const fileNameForDb = await uploadFile(item.file);

      if (fileNameForDb == "error") {
        isError = true;
        return "error";
      }


      let fn = todayDate + "_" + item.file.name;
      const documentDb = {
        Name: fn,
        DocumentStatusid: item.docS,
        DocumentCategoryId: item.docC,
        LetterId: info,
        isArchived: false,
        CreationDate: creatDate,
      };
    //  const res = await createDocument(documentDb);
      
      const createDocument =
        await fetch(baseurl + "documents/CreateDocument", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          body: JSON.stringify(documentDb),
        }).then((res) => {
          if (!res.ok) {
            isError = true;
            return "error";
          } else return "ok";
        });

        if (createDocument !== "ok") {
          isError = true;
          return "error";
        }

      //create doc entity
    };
  };

  

  await createLetter();
  if (isError) return "error";
  else return "ok";
}
