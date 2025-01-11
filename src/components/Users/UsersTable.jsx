import { DataGrid } from "@mui/x-data-grid";
import { ruRU } from "@mui/x-data-grid/locales";
import ActionsUsers from "./ActionsUsers";

export default function UsersTable(props) {
  const columns = [
    {
      field: "fullName",
      headerName: "Полное имя",
      flex: 2 ,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "positionName",
      headerName: "Должность",
      flex: 1,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Доступные действия",
      flex: 3,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <ActionsUsers
          params={params}
          handleDeactivate={handleDeactivate}
          handleDelete={handleDelete}
          isActive={props.isActive}
        />
      ),
    },
  ];
  const handleDelete = (id) => {
    props.handleDelete(id);
  };
  const handleDeactivate = (id) => {
    props.handleDeactivate(id);
  };

  return (
    <>
      {!props.loading ? (
        <DataGrid
          pageSizeOptions={[5, 10, 100]}
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          rows={props.rows}
          columns={columns}
          loading={props.loading}
        />
      ) : (
        <p>Wait</p>
      )}
    </>
  );
}
