import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Navigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Icon,
  TextField,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

import auth from "./../auth/auth-helper";
import { read, update } from "./api-user.js";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: "middle"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2)
  }
});

const getAuthInfo = (props) => {
  const authData = auth.isAuthenticated();

  const authInfo = {
    isAuthorized: false,
    errorMessage: ""
  };
  if (!authData || !authData.user || !authData.user._id) {
    authInfo.errorMessage = "Authorization data not available.";
  } else if (
    !props ||
    !props.match ||
    !props.match.params ||
    !props.match.params.userId
  ) {
    authInfo.errorMessage = "Component props does not contain 'userId'";
  } else if (authData.user._id != props.match.params.userId) {
    authInfo.errorMessage =
      "Not authorized to modify user. Please log in with authorized user.";
  }

  authInfo.isAuthorized = authInfo.errorMessage == "";

  return authInfo;
}

const EditProfile = ({ classes }) => {
  let [redirectToProfile, setRedirectToProfile] = useState(false);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");

  const params = useParams();
  const jwt = auth.isAuthenticated();

  const clickSubmit = () => {
    const user = {
      name: name || undefined,
      email: email || undefined,
      password: password || undefined
    };

    update(
      { userId: params.userId },
      { t: jwt.token },
      user
    ).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
        setEmail(data.email);
      }
    });
  }

  useEffect(() => {
    const jwt = auth.isAuthenticated();
    read(
      {
        userId: this.match.params.userId
      },
      { t: jwt.token }
    ).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setName(data.name);
        setEmail(data.email);
      }
    });
  });

  if (redirectToProfile) {
    return <Navigate to={"/user/" + userId} />;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h2" className={classes.title}>
          Edit Profile
        </Typography>
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <br />
        <TextField
          id="email"
          type="email"
          label="Email"
          className={classes.textField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          className={classes.textField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <br />{" "}
        {error && (
          <Typography component="p" color="error">
            <Icon color="error" className={classes.error}>
              error
            </Icon>
            {error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={clickSubmit}
          className={classes.submit}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditProfile);
