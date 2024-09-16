import { Delete } from "@mui/icons-material";
import { useState, useEffect } from "react";

export default function useFetch(url, { method, headers, body } = {}) {
  const [data, setData] = useState([]);
  const [errorStatus, setErrorStatus] = useState("");

  function request() {
    fetch(url, {
      method: method,
      headers: headers,
      body: body,
    })
      .then((res) => res.json())
      .then((d) => {
        setData(d);
      })
      .catch((error) => {
        setErrorStatus(error);
      });
  }

  function getData(currUrl, currHeaders, query){
    fetch(currUrl + '?' + query, {
      method: 'GET',
      headers: currHeaders
    })
    .then((res) => res.json())
      .then((d) => {
        setData(d);
      })
      .catch((error) => {
        setErrorStatus(error);
      });
  }

  function appendData(currUrl, currHeaders, newData) {
    fetch(currUrl, {
      method: "POST",
      headers: currHeaders,
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
      })
      .then((d) => {
        const submitted = d;
        const newState = [...data];
        //    Object.values(newState)[0].push(submitted);
        newState.push(submitted);
        setData(newState);
      })
      .catch((e) => {
        setErrorStatus(e);
      });
  }
  function deleteData(currUrl, currHeaders, id) {
    fetch(currUrl, {
      method: "DELETE",
      headers: currHeaders
    })
      .then((response) => {
        if (!response.ok) {
          throw response.status;
        }
        const newState = data.filter(el => el.id !== id);

        console.log('newstate');
        console.log(newState);
        setData(newState);
        return response.json();
      })
      .catch((e) => {
        setErrorStatus(e);
      });
  }
  function updateData(currUrl, currHeaders, id, newObject) {
    fetch(currUrl + '/' + id, {
      method: "PUT",
      headers: currHeaders,
      body: JSON.stringify(newObject)
    })
      .then((response) => {
        if (!response.ok) {
          throw response.status;
        }
        const newState = data.filter(el => el.id !== id);
        const newObj = {id: id, ...newObject};
        newState.push(newObj);
        console.log('newstate');
        console.log(newState);
        setData(newState);
        console.log('success');
        return response.json();
      })
      .catch((e) => {
        setErrorStatus(e);
      });
    console.log(newObject);
  }

  return { data, errorStatus, request, getData, appendData, deleteData, updateData };
}
