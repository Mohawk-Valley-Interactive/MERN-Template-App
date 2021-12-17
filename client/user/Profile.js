import React, { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import Edit from "@material-ui/icons/Edit";
import Person from "@material-ui/icons/Person";

import DeleteUser from "./DeleteUser";
import { read } from "./api-user.js";
import auth from "./../auth/auth-helper";

const styles = theme => ({
  root: {
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    }
  },
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.protectedTitle
  }
});

const Profile = ({ classes }) => {
  let [user, setUser] = useState({});
  let [redirectToSignin, setRedirectToSignin] = useState(false);

  const params = useParams();
  const isAuthenticated = auth.isAuthenticated();

  useEffect(() => {
    read(
      {
        userId: params.userId
      },
      { t: isAuthenticated.token }
    ).then(data => {
      if (data.error) {
        setRedirectToSignin(true);
      } else {
        setUser(data);
      }
    });
  }, []);

  if (redirectToSignin) {
    return (<Navigate replace to="/signin" />);
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography type="title" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <Person />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={user.name}
            secondary={user.email}
          />{" "}
          {isAuthenticated.user &&
            isAuthenticated.user._id == user._id && (
              <ListItemSecondaryAction>
                <Link to={"/user/edit/" + user._id}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={
              "Joined: " + new Date(user.created).toDateString()
            }
          />
        </ListItem>
      </List>
    </Paper>
  );
};


Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
