import { useState } from "react";

export default function useFetch(url, { method, headers, body } = {}) {
  const [data, setData] = useState([]);
  const [errorStatus, setErrorStatus] = useState();

  function request() {
    
    console.log('in the hook')
    fetch(url, {
      method: method,
      headers: headers,
      body: body,
    })
      .then((response) => {
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
      })
      .then((d) => {
        setData(d);
   //     console.log(data);
      })
      .catch((e) => {
        setErrorStatus(e);
      });
  }
  
  return { request, data, errorStatus };
}
