import { useState, useEffect } from "react";

export default function useFetch(url, options) {
  const [data, setData] = useState([]);
  const [errorStatus, setErrorStatus] = useState('');

  function request() {
    fetch(url, options)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        console.log('result ' + d);
      })
      .catch((error) => {
        setErrorStatus(error);
      });
  }

  return { data, errorStatus, request };
}
