import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import Chip from '@mui/material/Chip';
import TableDocumentCategories from "../components/DocumentCategories/TableDocumentCategories";
import { useEffect, useState, useContext } from "react";
import useFetch from "../hooks/UseFetch";
import { baseurl } from "../shared";

export default function DocumentCategories() {
  const mode = "light";
  const defaultTheme = createTheme({ palette: { mode } });

  const url = baseurl + "documentcategories";
  const [docCategories, setDocCategories] = useState([]);

  const { data : allDocCat, errorStatus : allDocCatError, request } = useFetch(url, {method: 'GET'});
  
 
  useEffect(()=>{
    request();
    console.log('alldoccat' + allDocCat);
    console.log('allddc error' + allDocCatError);
  }, []);



  const handleClick = () => {
    console.info('You clicked the filter chip.');
  };
  
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline enableColorScheme />
        <Container
          maxWidth="lg"
          sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
        >
          <div>
            <Typography variant="h3" gutterBottom>
            Категории документов
            </Typography>
            <Typography>
              Категории документов
            </Typography>
          </div>
         <Button>Добавить категорию</Button>
         <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            gap: 3,
            overflow: 'auto',
          }}
        >
          <Chip onClick={handleClick} size="medium" label="Активные" />
          <Chip
            onClick={handleClick}
            size="medium"
            label="Не активные"
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
        </Box>
        <TableDocumentCategories source={allDocCat}/>
        </Container>
      </ThemeProvider>
    </>
  );
}
