import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Typography from "@mui/material/Typography";
import MyToolbar from "./myToolbar";
import MyPhoneToolbar from "./myPhoneToolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
}));

export default function Header(props) {
  const mode = "light";
  const defaultTheme = createTheme({ palette: { mode } });
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  function logout() {
    localStorage.clear();
    navigate("login");
  }

  return (
    <>
          <ThemeProvider theme={defaultTheme}>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 1,
        }}
      >
        <Container maxWidth="lg">
          <StyledToolbar variant="dense" disableGutters>
            <Typography
              sx={{
                mr: "auto",
                color: "black",
                textDecoration: "none",
              }}
            >
              АИС "Цифровая кафедра"
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
            >
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Button variant="text" color="info" size="small">
                  Главная
                </Button>
                {localStorage.getItem("permissions") ? <MyToolbar /> : null}
              </Box>
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "center",
              }}
            >
              <Button
                color="primary"
                variant="text"
                size="small"
                onClick={logout}
              >
                Выйти
              </Button>
            </Box>

            <Box sx={{ display: { sm: "flex", md: "none" } }}>
              <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>

              <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton onClick={toggleDrawer(false)}>
                        <CloseRoundedIcon />
                      </IconButton>
                    </Box>
                    <Typography
                      sx={{
                        mr: "auto",
                        color: "black",
                        textDecoration: "none",
                      }}
                    >
                      АИС "Цифровая кафедра"
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 3 }} />

                  <MenuItem>Главная</MenuItem>
                  {localStorage.getItem("permissions") ? (
                    <MyPhoneToolbar />
                  ) : null}
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      fullWidth
                      onClick={logout}
                    >
                      Выйти
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </StyledToolbar>
        </Container>
      </AppBar>
      {props.children}
      </ThemeProvider>
    </>
  );
}
