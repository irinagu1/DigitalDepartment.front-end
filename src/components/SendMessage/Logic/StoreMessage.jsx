import { useState } from "react";
import { baseurl } from "../../../shared";
import uploadFile from "./UploadFile";
import storeRecipients from "./StoreRecipients";


export default function storeMessage(props) {
  let letterId;
  let documentsIds = [];

  const createLetter = async ()=> {
    const newLetter = {
      AuthorId: "9f8f4248-953c-409b-a048-ac08324f19fe",
    };

    const fetchNewMessageId = async () => {
      const res = await fetch(baseurl + "letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLetter),
      });
      if (!res.ok) throw res.status;
      const data = await res.json();
      letterId = data;
     addFiles(data);
      console.log(props);
      storeRecipients(props.recipients, props.asRecipients, props.recipientsToCheck, data);
      console.log("letter id: ");
      console.log(data);
    };

    fetchNewMessageId();
  }

  const createDocument = async (obj) => {
    const res = await fetch(baseurl + "documents/CreateDocument", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
    if (!res.ok) throw res.status;
    const data = await res.json();
    console.log("document id: ");
    console.log(data);
  }

  createLetter();
 // addFiles();
  function addFiles(info){
  props.allFiles.forEach((item)=>{
    let fileNameForDb = uploadFile(item.file);

    const documentDb = {
      Name : fileNameForDb,
      DocumentStatusid: item.docS,
      DocumentCategoryId: item.docC,
      LetterId: info,
      isArchived: false
    }

    console.log('finished uploading file');
    createDocument(documentDb);

  });
}



 console.log(props.allFiles);



  //add letter and get letter id

  //add documets as loop and get the mass of ids

  //add recipients

  console.log("in func");
  console.log(props);

  return "ok";
}
