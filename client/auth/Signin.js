import React, { Component } from "react";
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
import { Redirect } from "react-router";

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

class Signin extends Component {
  _isMounted = false;

  state = {
    email: "",
    password: "",
    error: "",
    redirectToReferrer: false
  };

  componentDidMount() {
    this._isMounted = true;

    if (
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.error
    ) {
      this.safeSetState({ error: this.props.location.state.error });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  safeSetState(data) {
    if (this._isMounted) {
      this.setState(data);
    }
  }

  clickSubmit = () => {
    const user = {
      email: this.state.email || undefined,
      password: this.state.password || undefined
    };

    signin(user).then(data => {
      if (data.error) {
        this.safeSetState({ error: data.error });
      } else {
        auth.authenticate(data, () => {
          this.safeSetState({ redirectToReferrer: true });
        });
      }
    });
  };

  onClickSubmit = e => {
    e.preventDefault();
    this.clickSubmit();
  };

  handleChange = name => event => {
    this.safeSetState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { from } = this.props.location.state || {
      from: {
        pathname: "/"
      }
    };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <form onSubmit={this.onClickSubmit}>
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
              value={this.state.email}
              onChange={this.handleChange("email")}
              margin="normal"
            />
            <br />
            <TextField
              id="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange("password")}
              margin="normal"
            />
            <br />{" "}
            {this.state.error && (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}>
                  error
                </Icon>
                {this.state.error}
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={this.clickSubmit}
              className={classes.submit}
            >
              Submit
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  }
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signin);
