import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

import auth from "./../auth/auth-helper";

const isActive = (path) => {
  const location = useLocation();
  if (location.pathname == path) return { color: "#ff4081" };
  else return { color: "#ffffff" };
};

const Menu = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography type="title" color="inherit">
          MERN Template App
        </Typography>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive("/")}>
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/users">
          <Button style={isActive("/users")}>Users</Button>
        </Link>
        {!auth.isAuthenticated() && (
          <span>
            <Link to="/signup">
              <Button style={isActive("/signup")}>Sign up</Button>
            </Link>
            <Link to="/signin">
              <Button style={isActive("/signin")}>Sign In</Button>
            </Link>
          </span>
        )}
        {auth.isAuthenticated() && (
          <span>
            <Link to={"/user/" + auth.isAuthenticated().user._id}>
              <Button style={isActive("/user/" + auth.isAuthenticated().user._id)} >
                My Profile
              </Button>
            </Link>
            <Button
              color="inherit"
              onClick={() => {
                auth.signout(() => navigate("/"));
              }}
            >
              Sign out
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  )
};

export default Menu;
