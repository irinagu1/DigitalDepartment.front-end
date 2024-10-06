import { styled } from "@mui/system";
import Container from "@mui/material/Container";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  position: "relative",
  backgroundColor: "transparent", // Make the center transparent
  border: `2px solid ${theme.palette.grey[300]}`, // Border color
  borderRadius: "8px",
  padding: theme.spacing(3),
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
}));
export default StyledContainer;
