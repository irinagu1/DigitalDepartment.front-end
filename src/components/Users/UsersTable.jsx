import { DataGrid } from "@mui/x-data-grid";
import { ruRU } from "@mui/x-data-grid/locales";
import ActionsUsers from "./ActionsUsers";

export default function UsersTable(props) {
  const columns = [
    {
      field: "fullName",
      headerName: "fullname",
      flex: 1,
      editable: false,
    },
    {
      field: "actions",
      headerName: "actions",
      flex: 1,
      renderCell: (params) => (
        <ActionsUsers
          params={params}
          handleDeactivate={handleDeactivate}
          handlePassword={handlePassword}
        />
      ),
    },
  ];

  const handleDeactivate = (id) => {
    props.handleDeactivate(id);
  };
  const handlePassword = (id) => {
    // props.handleDeactivate(id);
  };
  return (
    <>
      {!props.loading ? (
        <DataGrid
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
