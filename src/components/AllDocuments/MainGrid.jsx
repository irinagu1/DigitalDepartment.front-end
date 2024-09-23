import { useState } from "react";
import { Box, Grid2 } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { baseurl } from "../../shared";

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Name',
    headerName: 'Name',
    width: 150,
  },
];

export default function MainGrid() {
  const [documents, setDocuments] = useState([]);

  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 5,
    page: 0,
  });
  fetchDocuments = async() =>{
    const url = baseurl + "documents/ForShow";
  }

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
      pageSizeOptions={[5, 10, 25]}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      />
    </Box>
  );
}
