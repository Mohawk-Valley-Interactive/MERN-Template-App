import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  authCallback: authCallback,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      const authInfo = authCallback(props);
      if (authInfo.isAuthorized) {
        return <Component {...props} />;
      }
      return (
        <Navigate replace to="/signin" />
      );
    }}
  />
);

export default PrivateRoute;
