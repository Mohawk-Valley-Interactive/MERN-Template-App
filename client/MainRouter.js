import React, { Component } from "react";
import { Route, Switch } from "react-router";

import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./core/Menu";
import Home from "./core/Home";
import Users from "./user/Users";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import Signin from "./auth/Signin";
import Signup from "./user/Signup";

class MainRouter extends Component {
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if(jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <div>
        <Menu />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/users" component={Users} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <PrivateRoute path="/user/edit/:userId" component={EditProfile} authCallback={EditProfile.getAuthInfo}/>
          <Route path="/user/:userId" component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default MainRouter;