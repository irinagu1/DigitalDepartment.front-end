import { DataGrid } from "@mui/x-data-grid";
import { ruRU } from "@mui/x-data-grid/locales";
import Actions from "./Actions";

export default function RolesTable(props) {
  const columns = [
    {
      field: "name",
      headerName: "name",
      flex: 1,
      editable: false,
    },
    {
      field: "normalizedName",
      headerName: "normalizedName",
      flex: 1,

      editable: true,
    },
    {
      field: "actions",
      headerName: "actions",
      flex: 1,
      renderCell: (params) => (
        <Actions params={params} handleDeactivate={handleDeactivate} />
      ),
    },
  ];

  const handleDeactivate = (id) => {
    props.handleDeactivate(id);
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
