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
import { useScrollTrigger } from "@mui/material";
import MyPhoneToolbar from "./myPhoneToolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../../App";

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

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <div>
      {React.cloneElement(children, {
        style: {
          transition: "transform 0.3s ease-in-out",
          transform: trigger ? "translateY(-100%)" : "translateY(0)",
        },
      })}
    </div>
  );
}

export default function Header(props) {
  const [logged, setLogged] = React.useContext(LoginContext);

  const navigate = useNavigate();
  const mode = "light";
  const defaultTheme = createTheme({ palette: { mode } });
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  function logout() {
    setLogged(false);
    navigate("/login");
  }

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <HideOnScroll>
          <AppBar
            position="fixed"
            sx={{ bgcolor: "AliceBlue", boxShadow: "none" }}
          >
            <Container maxWidth="lg">
              <Toolbar variant="dense" disableGutters>
                <Typography sx={{ flexGrow: 1, color: "black" }}>
                  АИС "Цифровая кафедра"
                </Typography>
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {logged ? (
                    <>
                      {" "}
                      <Button
                        variant="text"
                        color="info"
                        size="small"
                        onClick={() => {
                          navigate("/main");
                        }}
                      >
                        Главная
                      </Button>
                      {localStorage.getItem("permissions") ? (
                        <MyToolbar />
                      ) : null}
                      <Button
                        color="primary"
                        variant="text"
                        size="small"
                        onClick={logout}
                      >
                        Выйти
                      </Button>
                    </>
                  ) : null}
                </Box>

                <Box sx={{ display: { sm: "flex", md: "none" } }}>
                  <IconButton
                    aria-label="Menu button"
                    onClick={toggleDrawer(true)}
                  >
                    <MenuIcon />
                  </IconButton>

                  <Drawer
                    anchor="top"
                    open={open}
                    onClose={toggleDrawer(false)}
                  >
                    <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <IconButton onClick={toggleDrawer(false)}>
                          <CloseRoundedIcon />
                        </IconButton>
                        <Typography sx={{ color: "black" }}>
                          АИС "Цифровая кафедра"
                        </Typography>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      {logged ? (
                        <>
                          {" "}
                          <MenuItem
                            onClick={() => {
                              navigate("/main");
                            }}
                          >
                            Главная
                          </MenuItem>
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
                        </>
                      ) : null}
                    </Box>
                  </Drawer>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </HideOnScroll>
        <Box sx={{ marginTop: "64px" }}>{props.children}</Box>
      </ThemeProvider>
    </>
  );
}
