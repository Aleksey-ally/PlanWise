import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppBar, Button, CircularProgress, Container, LinearProgress, Toolbar, Typography } from "@mui/material";
import { Login } from "features/auth/ui/login/login";
import { TodolistsList } from "features/todolists-list/todolists-list";
import { useActions } from "common/hooks";
import { selectIsLoggedIn } from "features/auth/model/auth.selectors";
import { selectAppStatus, selectIsInitialized } from "app/app.selectors";
import { authThunks } from "features/auth/model/auth.slice";
import { ErrorSnackbar } from "common/components";

function App() {
  const status = useSelector(selectAppStatus);
  const isInitialized = useSelector(selectIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { initializeApp, logout } = useActions(authThunks);

  useEffect(() => {
    initializeApp();
  }, []);

  const logoutHandler = () => logout();

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar />
        <AppBar position="static"
                style={{ backgroundColor: "#212327", display: "flex", alignItems: "end", color: "#ffffff", justifyContent:"center" }}>
          <Toolbar>
            {isLoggedIn ? (
                <Button color="inherit" variant={"outlined"} onClick={logoutHandler}>
                  Log out
                </Button>
              ) :
              <Typography style={{ color: "#ffffff" }}>Login</Typography>
            }
          </Toolbar>
          {status === "loading" && <LinearProgress />}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path={"/"} element={<TodolistsList />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
