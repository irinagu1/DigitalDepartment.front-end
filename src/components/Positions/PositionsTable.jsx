import { DataGrid } from "@mui/x-data-grid";
import { ruRU } from "@mui/x-data-grid/locales";
import ActionsForPosition from "./Actions";


export default function PositionsTable(props) {
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
            <ActionsForPosition
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
    
      const handleDeactivate = (id, isEnable) => {
        props.handleDeactivate(id, isEnable);
      };

      const handleDelete = (id) => {
        props.handleDelete(id);
      };

  return (
    <>
      <DataGrid
        rowWidth="auto"
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={props.rows}
        columns={columns}
        loading={props.loading}
        pageSizeOptions={[5, 10, 100]}
      />
    </>
  );
}
