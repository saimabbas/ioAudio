import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let { user } = useSelector((state) => state.userReducer);
  // console.log(rest, "location");

  return (
    <Route
      {...rest}
      render={(props) =>
        // if the user has profile
        user.email && user.email !== "" ? (
          <Component {...props} />
        ) : (
          // if the not a user in redux
          <Redirect
            to={{
              pathname: "/",
              state: {
                accessToken: rest.location
                  ? rest.location.search
                    ? rest.location.search
                    : ""
                  : "",
              },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
