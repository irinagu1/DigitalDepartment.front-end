import { DataGrid } from "@mui/x-data-grid";
import { ruRU } from "@mui/x-data-grid/locales";
import { Container, Typography, Box } from "@mui/material";
import { useEffect, useMemo, useState, useCallback } from "react";
import UserActions from "./UserActions";
import ParamsDropDown from "./ParamsDropDown";
import { baseurl } from "../../shared";

const formatDate = (dateString) => {
  // Преобразуем строку в объект Date
  const date = new Date(dateString);

  // Определяем массив месяцев
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  // Получаем день, месяц и год
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Формируем строку в нужном формате
  return `${day} ${month} ${year} г.`;
};

const fetchDocumentParams = async (parameter) => {
  return fetch(baseurl + parameter, {
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    });
};

const updateDocument = async (newDoc) => {
  return fetch(baseurl + "documents/UpdateDocument", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(newDoc),
  })
    .then((res) => {
      console.log(res);
      if (res.status !== 204) throw error;
    })
    .then((data) => {
      return data;
    });
};

export default function Table(props) {
  const [docStatuses, setDocStatuses] = useState([]);
  const [docCategories, setDocCategories] = useState([]);

  useEffect(() => {
    const fetchStatuses = async () => {
      const docStatusesFromDB = await fetchDocumentParams("documentstatuses");
      setDocStatuses(docStatusesFromDB);
    };
    const fetchCategories = async () => {
      const docCategoriesFromDB = await fetchDocumentParams(
        "documentcategories"
      );
      setDocCategories(docCategoriesFromDB);
    };
    fetchStatuses();
    fetchCategories();
  }, []);

  const columns = [
    {
      field: "dateCreation",
      valueGetter: (value) => {
        return formatDate(value);
      },
      headerName: "creation date",
      width: 150,
      editable: false,
    },
    {
      field: "name",
      headerName: "name",
      width: 150,
      editable: true,
    },
    {
      field: "documentCategoryName",
      headerName: "doc cat",
      width: 150,
      renderCell: (params) => (
        <ParamsDropDown
          docId={params.row.id}
          defId={params.row.documentCategoryId}
          defValue={params.row.documentCategoryName}
          handleChange={handleDocCategoryChange}
          data={docCategories}
        />
      ),
    },
    {
      field: "documentStatusName",
      headerName: "doc stat",
      width: 150,
      renderCell: (params) => (
        <ParamsDropDown
          docId={params.row.id}
          defId={params.row.documentStatusId}
          defValue={params.row.documentStatusName}
          handleChange={handleDocStatusChange}
          data={docStatuses}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      renderCell: (params) => (
        <UserActions
          type={props.type}
          params={params}
          sign={props.sign}
          archive={props.archive}
        />
      ),
    },
  ];

  const handleDocStatusChange = (docId, oldId, newId) => {
    if (oldId !== newId) {
      const newDocObject = {
        Id: docId,
        DocumentStatusId: newId,
      };
      updateDocument(newDocObject);
    }
  };
  const handleDocCategoryChange = (docId, oldId, newId) => {
    if (oldId !== newId) {
      const newDocObject = {
        Id: docId,
        DocumentCategoryId: newId,
      };
      updateDocument(newDocObject);
    }
  };
  return (
    <>
      {!props.loading ? (
        <DataGrid
          disableColumnFilter
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          rows={props.rows}
          columns={columns}
          rowCount={props.rowCount}
          loading={props.loading}
          pageSizeOptions={[5, 10, 100]}
          paginationMode="server"
          paginationModel={props.paginationModel}
          onPaginationModelChange={props.setPaginationModel}
          onCellEditStop={(params, event) => {
            console.log(params);
            console.log(event);
          }}
        />
      ) : (
        <p>Wait</p>
      )}
    </>
  );
}
