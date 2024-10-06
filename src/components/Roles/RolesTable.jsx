import { DataGrid } from "@mui/x-data-grid";
import { ruRU } from "@mui/x-data-grid/locales";
import Actions from "./Actions";

export default function RolesTable(props) {
  const columns = [
    {
      field: "name",
      headerName: "Название",
      flex: 0.4,
      editable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "connectedUsers",
      headerName: "Количество пользователей",
      flex: 0.4,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Доступные действия",
      flex: 1,
      renderCell: (params) => (
        <Actions
          params={params}
          isActive={props.isActive}
          handleDeactivate={handleDeactivate}
          handleDelete={handleDelete}
        />
      ),
      headerAlign: "center",
      align: "center",
    },
  ];

  const handleDeactivate = (id) => {
    props.handleDeactivate(id);
  };
  const handleDelete = (id) => {
    props.handleDelete(id);
  };
  return (
    <>
      {!props.loading ? (
        <DataGrid
          rowWidth="auto"
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          rows={props.rows}
          columns={columns}
          loading={props.loading}
          pageSizeOptions={[5, 10, 100]}
        />
      ) : (
        <p>Wait</p>
      )}
    </>
  );
}
