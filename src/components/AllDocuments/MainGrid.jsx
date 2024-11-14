import { useEffect, useMemo, useState, useCallback } from "react";
import { Box, Grid2 } from "@mui/material";
import { baseurl } from "../../shared";
import getParametersList from "./Logic/GetParametersList";
import ChoosePanel from "../ChoosePanel";
import Table from "./Table";
import MyDataGrid from "./DocumentsTable.jsx/MyDataGrid";
import TableWithOptions from "./DocumentsTable.jsx/TableWithOptions";



const chipsForWho = ["Общие", "Лично мне"];
const chipsWhatType = ["Для просмотра", "К ознакомлению"];

export default function MainGrid() {
  const [chipsState, setSchipsState] = useState({
    forWho: chipsForWho[0],
    whatType: chipsWhatType[0],
  });

  const [pageInfo, setPageInfo] = useState({
    isLoading: false,
    data: [],
    total: 0,
  });

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  useEffect(() => {
    setPageInfo({ ...pageInfo, isLoading: true });
    fetchData();
    setPageInfo({ ...pageInfo, isLoading: false });
  }, [paginationModel]);

  useEffect(() => {
    console.log(chipsState);
    fetchData();
  }, [chipsState]);

  function fetchData() {
    setPageInfo({ ...pageInfo, isLoading: true });
    const numberPage = paginationModel.page + 1;
    let total;
    let parameters =
      "?PageNumber=" +
      numberPage +
      "&PageSize=" +
      paginationModel.pageSize +
      "&ForWho=" +
      chipsState.forWho +
      "&WhatType=" +
      chipsState.whatType;

    fetch(baseurl + "documents/ForShow" + parameters, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        total = JSON.parse(res.headers.get("x-pagination")).TotalCount;
        return res.json();
      })
      .then((data) => {
        console.log("getted docs");
        setPageInfo({ ...pageInfo, data: data, total: total });
        console.log(data);
      });
    setPageInfo({ ...pageInfo, isLoading: false });
  }

  function changeChipForWho(name) {
    setSchipsState({ ...chipsState, forWho: name });
  }
  function changeChipWhatType(name) {
    setSchipsState({ ...chipsState, whatType: name });
  }

  function archive(params) {
    updateAfterArchive(params.id);
    fetchData();
  }

  const updateAfterArchive = (id) => {
    fetch(baseurl + "documents/ArchiveDocument?" + "documentId=" + id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (res.status !== 204) throw error;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function sign(params) {
    updateAfterSign(params.id);
    fetchData();
  }

  function updateAfterSign(id) {
    fetch(baseurl + "documents/SignDocument?" + "documentId=" + id, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        console.log("result");
        console.log(res);
        if (res.status !== 204) throw error;
      })
      .catch((error) => {
        console.log(error);
      });
  }



  return (
    <>
    <TableWithOptions/>

    </>
  );
 /* return (
    <>
      <ChoosePanel chips={chipsForWho} changeChip={changeChipForWho} />
      <p></p>
      <ChoosePanel chips={chipsWhatType} changeChip={changeChipWhatType} />
      <Table
        type={chipsState}
        sign={sign}
        archive={archive}
        rows={pageInfo.data}
        rowCount={pageInfo.total}
        loading={pageInfo.isLoading}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
      <Box sx={{ height: 400, width: "100%" }}></Box>
    </>
  );*/
}
