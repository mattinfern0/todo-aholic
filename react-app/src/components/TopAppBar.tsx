import { AppBar, Avatar, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLogoutMutation } from "../integrations/firebase/mutations.ts";

export const TopAppBar = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation();
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const userMenuOpen: boolean = menuAnchorEl != null;

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

  const menuId = "user-menu";

  const onAvatarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const onUserMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      <Menu id={menuId} anchorEl={menuAnchorEl} open={userMenuOpen} onClose={onUserMenuClose}>
        <MenuItem>Settings</MenuItem>
        <MenuItem onClick={onLogoutClick}>Log Out</MenuItem>
      </Menu>
      <AppBar sx={{ zIndex: 1300, backgroundColor: "#333333" }}>
        <Toolbar>
          <Typography color="inherit" component="div" sx={{ flexGrow: 1 }}>
            Todo-aholic
          </Typography>

          <IconButton onClick={onAvatarClick}>
            <Avatar />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};
