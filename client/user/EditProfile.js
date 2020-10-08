import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
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

class EditProfile extends Component {
  static getAuthInfo(props) {
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

  _isMounted = false;

  constructor({ match }) {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      redirectToProfile: false,
      error: ""
    };
    this.match = match;
  }

  componentDidMount() {
    this._isMounted = true;

    const jwt = auth.isAuthenticated();
    read(
      {
        userId: this.match.params.userId
      },
      { t: jwt.token }
    ).then(data => {
      if (this._isMounted) {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({ name: data.name, email: data.email });
        }
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  clickSubmit() {
    const jwt = auth.isAuthenticated();
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined
    };

    update(
      {
        userId: this.match.params.userId
      },
      {
        t: jwt.token
      },
      user
    ).then(data => {
      if (this._isMounted) {
        if (data.error) {
          this.setState({ error: data.error });
        } else {
          this.setState({ userId: data._id, redirectToProfile: true });
        }
      }
    });
  }

  handleChange = name => event => {
    if (this._isMounted) {
      this.setState({ [name]: event.target.value });
    }
  };

  render() {
    const { classes } = this.props;
    if (this.state.redirectToProfile) {
      return <Redirect to={"/user/" + this.state.userId} />;
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
            value={this.state.name}
            onChange={this.handleChange("name")}
            margin="normal"
          />
          <br />
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
            color="primary"
            variant="contained"
            onClick={this.clickSubmit.bind(this)}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>
    );
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditProfile);
