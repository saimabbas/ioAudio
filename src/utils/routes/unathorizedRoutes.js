import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const UnautorizedRoutes = ({ component: Component, ...rest }) => {
  let { user } = useSelector((state) => state.userReducer);

  return (
    <Route
      {...rest}
      render={(props) =>
        // if the user has profile
        user.email && user.email !== "" ? (
          <Redirect to="/mvp" /> 
        ) : (
          // if the not a user in redux
          <Component {...props} />
        )
      }
    />
  );
};

export default UnautorizedRoutes;
