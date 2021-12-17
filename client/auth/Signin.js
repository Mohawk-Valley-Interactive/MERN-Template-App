import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
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
import { useLocation, Navigate } from "react-router-dom";

import auth from "./auth-helper";
import { signin } from "./api-auth.js";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  error: {
    verticalAlign: "middle"
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
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

const Signin = ({ classes }) => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const onClickSubmit = (e) => {
    e.preventDefault();
    clickSubmit();
  };

  const clickSubmit = () => {
    const user = {
      email: email || undefined,
      password: password || undefined
    };

    signin(user).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        auth.authenticate(data, () => {
          setRedirectToReferrer(true);
        });
      }
    });
  };

  useEffect(() => {
    setRedirectToReferrer(auth.isAuthenticated());
  }, []);

  if (redirectToReferrer) {
    return <Navigate replace to={from} />;
  }

  return (
    <form onSubmit={onClickSubmit}>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            type="headline"
            component="h2"
            className={classes.title}
          >
            Sign In
          </Typography>
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
          <Button type="submit" color="primary" variant="contained" className={classes.submit}>
            Submit
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

Signin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signin);