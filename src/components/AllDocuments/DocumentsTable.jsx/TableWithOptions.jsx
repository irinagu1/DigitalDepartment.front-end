import { useEffect, useReducer, useState } from "react";
import { chipsForWho, chipsWhatType } from "./ChipsVariants";
import { reducer } from "./DocumentsReducer";
import MyDataGrid from "./MyDataGrid";
import ChoosePanel from "../../ChoosePanel";

import { baseurl } from "../../../shared";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";

const createQuery = (state) => {
  let url = baseurl + "documents/ForShow?";
  let parametes = "";

  //chipsstate
  parametes += "ForWho=" + state.chipsState.forWho;
  parametes += "&WhatType=" + state.chipsState.whatType;

  //filter
  if (state.filtering.date !== null)
    parametes += "&CreationDate=" + state.filtering.date;
  if (state.filtering.category !== null)
    parametes += "&Category=" + state.filtering.category;
  if (state.filtering.status !== null)
    parametes += "&Status=" + state.filtering.status;
  if (state.filtering.isSigned !== null)
    parametes += "&IsSigned=" + state.filtering.isSigned;

  //search
  if (state.searching.name !== null)
    parametes += "&SearchByName=" + state.searching.name;
  if (state.searching.author !== null)
    parametes += "&SearchByAuthor=" + state.searching.author;

  //query
  parametes += "&OrderBy=" + state.sorting;

  //pagination
  parametes +=
    "&PageNumber=" +
    state.paginationModel.page +
    "&PageSize=" +
    state.paginationModel.pageSize;

  url += parametes;

  return url;
};

export default function TableWithOptions() {
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    pageSize: 5,
    totalCount: 0,
    hasPrevious: false,
    hasNext: false,
  });

  const [state, dispatch] = useReducer(reducer, {
    paginationModel: {
      page: 1,
      pageSize: 5,
    },
    chipsState: {
      forWho: chipsForWho[0],
      whatType: chipsWhatType[0],
    },
    filtering: {
      date: null,
      filtering: null,
      category: null,
      status: null,
      isSigned: null,
    },
    searching: {
      name: null,
      author: null,
    },
    sorting: "CreationDate desc",
    lastSigned: null,
  });

  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const query = createQuery(state);
    fetchDocuments(query);
  }, []);

  useEffect(() => {
    const query = createQuery(state);
    fetchDocuments(query);
  }, [state]);

  function fetchDocuments(query) {
    fetch(query, {
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        setPaginationInfo(JSON.parse(res.headers.get("x-pagination")));
        return res.json();
      })
      .then((data) => {
        setDocuments(data);
      });
  }
  function setPaginationInfo(header) {
    console.log("PAGINATION INFO");
    console.log(header);
    setPagination({
      currentPage: header.CurrentPage,
      totalPages: header.TotalPages,
      pageSize: 10,
      totalCount: header.TotalCount,
      hasPrevious: header.HasPrevious,
      hasNext: header.HasNext,
    });
  }

  function signDocument(documentId) {
    fetch(baseurl + "documents/SignDocument?documentId=" + documentId, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    }).then((res) => {
      if (!res.ok) throw Error;
    });
    const newDocuments = documents.map((d) => {
      if (d.id === documentId) {
        return { ...d, isSigned: true };
      } else return d;
    });
    console.log(newDocuments);
  }

  const handleUpdate = (kind, value) => {
    switch (kind) {
      case "page": {
        dispatch({ type: "page", page: value });
        break;
      }
      case "pageSize": {
        dispatch({ type: "pageSize", pageSize: value });
        break;
      }
      case "forWho": {
        dispatch({ type: "forWho", forWho: value });
        break;
      }
      case "whatType": {
        if (value === "Для просмотра")
          dispatch({ type: "isSigned", whatType: null });
        dispatch({ type: "whatType", whatType: value });
        break;
      }
      case "date": {
        dispatch({ type: "date", date: value });
        break;
      }
      case "category": {
        dispatch({ type: "category", value: value });
        break;
      }
      case "status": {
        dispatch({ type: "status", value: value });
        break;
      }
      case "isSigned": {
        dispatch({ type: "isSigned", isSigned: value });
        break;
      }
      case "name": {
        dispatch({ type: "name", value: value });
        break;
      }
      case "author": {
        dispatch({ type: "author", value: value });
        break;
      }
      case "sorting": {
        dispatch({ type: "sorting", sorting: value });
        break;
      }
      case "sign": {
        signDocument(value);
        dispatch({ type: "signed", id: value });
        break;
      }
    }
  };

  const handlePrevious = () => {
    if (pagination.hasPrevious) {
      dispatch({ type: "page", page: pagination.currentPage - 1 });
    }
  };

  const handleNext = () => {
    if (pagination.hasNext) {
      dispatch({ type: "page", page: pagination.currentPage + 1 });
    }
  };
  return (
    <>
      <ChoosePanel
        chips={chipsForWho}
        changeChip={(chip) => {
          handleUpdate("forWho", chip);
        }}
      />
      <p></p>
      <ChoosePanel
        chips={chipsWhatType}
        changeChip={(chip) => {
          handleUpdate("whatType", chip);
        }}
      />
      <p></p>
      <MyDataGrid
        state={state}
        handleUpdate={handleUpdate}
        data={documents}
        mode={state.chipsState.whatType}
      />
      <p></p>
      <Stack
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {pagination.hasPrevious ? (
          <Button variant="outlined" onClick={handlePrevious}>
            Предыдущая
          </Button>
        ) : (
          <Button disabled>Предыдущая</Button>
        )}
        {pagination.hasNext ? (
          <Button variant="outlined" onClick={handleNext}>
            Следующая
          </Button>
        ) : (
          <Button disabled>Следующая</Button>
        )}
      </Stack>
    </>
  );
}
