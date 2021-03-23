import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  let { auth } = useSelector(state => state.AuthReducer);
  return (
    <Route
      {...rest}
      render={props =>
        auth.user ? (
          // basic user with the no profile
          auth.user._id && auth.user.role !== "admin" && !auth.user.profile ? (
            <Component {...props} />
          ) : (
          // admin user 
            auth.user &&
            auth.user.role === "admin" && <Redirect to="/dashboard" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
