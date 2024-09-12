import { useState } from "react";

export default function useFetch(url, { method, headers, body } = {}) {
  const [data, setData] = useState();
  const [errorStatus, setErrorStatus] = useState();

  function request(prop) {
    console.log('in the hook')
    fetch(url, {
      method: method,
      headers: headers,
      body: prop,
    })
      .then((response) => {
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        setErrorStatus(e);
      });
  }

  return { request, data, errorStatus };
}
