import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useLogoutMutation } from "../apis/backend/mutations.ts";
import { useNavigate } from "react-router-dom";

export const TopAppBar = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation();

  const onLogoutClick = () => {
    logoutMutation.mutate(
      {},
      {
        onSuccess: () => {
          navigate("/login");
        },
      },
    );
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography color="inherit" component="div" sx={{ flexGrow: 1 }}>
            Todo-aholic
          </Typography>
          <Button color="inherit" onClick={onLogoutClick}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
