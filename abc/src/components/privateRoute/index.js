import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /login page
    <Route
      {...rest}
      render={props => {
        return rest.user.loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: 'login/'
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
