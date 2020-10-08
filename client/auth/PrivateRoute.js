import React from "react";
import { Route, Redirect } from "react-router";

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
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location, error: authInfo.errorMessage}
          }}
        />
      );
    }}
  />
);

export default PrivateRoute;
