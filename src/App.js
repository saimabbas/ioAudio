import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import "./App.less";

import Amplify from "aws-amplify";
import { setting } from "./config/amplifyConfig/amplifyConfig";
import { UserPool } from "./config/userPool/UserPoll";
import SignIn2 from "./modules/auth/signIn/SignIn2";
import SignUp from "./modules/auth/signUp/SignUp";
import Mvp from "./modules/mvp/mvps";
import Solutions from "./modules/solutions/solutions";
import SplashWeb from "./modules/splashWeb/splahWeb";
import { AddUser } from "./redux/actions/userActions/userActions";
import PrivateRoute from "./utils/routes/privateRoutes";
import UnautorizedRoutes from "./utils/routes/unathorizedRoutes";
import { socketCleint } from "./config/socket/socketConfig";
import { ClevertapReact } from "./utils/clevertap/clevertap";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { Alerterror } from "./utils/appAlert/AppAlert";

Amplify.configure(setting);

function App(props) {
  const dispatch = useDispatch();
  const { run, setRun } = useState(true);
  useEffect(() => {
    async function fetchUser() {
      await new Promise((resolve, reject) => {
        const user = UserPool.getCurrentUser();
        console.log(user, "user asdf");
        if (user) {
          user.getSession((err, session) => {
            if (err) {
              reject();
            } else {
              console.log(props.location, "location");
              let googleToken = "";
              if (
                props.location.hasOwnProperty("search") &&
                props.location.search !== ""
              ) {
                googleToken = props.location.search;
                googleToken = googleToken.replace("?hithere=", "");
                var attributeList = [];
                var attribute = {
                  Name: "custom:accessToken",
                  Value: googleToken,
                };
                var attribute = new CognitoUserAttribute(attribute);
                attributeList.push(attribute);

                user.updateAttributes(attributeList, function (err, result) {
                  if (err) {
                    Alerterror(err.message || JSON.stringify(err));
                    return;
                  }
                  // alert("call result: " + result);
                });
              }
              socketCleint.connect();
              let updatedAttribute = {};
              user.getUserAttributes(function (err, result) {
                if (err) {
                  return;
                }
                for (let i = 0; i < result.length; i++) {
                  updatedAttribute[result[i].getName()] = result[i].getValue();
                  // console.log(
                  //   "attribute " +
                  //     result[i].getName() +
                  //     " has value " +
                  //     result[i].getValue()
                  // );
                }
              });
              socketCleint.on("connect", function () {
                socketCleint.emit("authentication", {
                  token: session.idToken.jwtToken,
                });

                socketCleint.on("authenticated", function () {
                  // use the socketCleint as usual
                  console.log("socketCleint is connected");
                });
                socketCleint.on("unauthorized", function (err) {
                  console.log(
                    "There was an error with the authentication:",
                    err.message
                  );
                });
              });
              let payload = {
                ...session.idToken.payload,
                ...session,
                ...updatedAttribute,
              };
              // idToken.jwtToken;
              if (googleToken) {
                payload = {
                  ...payload,
                  "custom:accessToken": googleToken,
                };
              }
              dispatch(AddUser(payload));
              resolve(session);
            }
          });
        } else {
          reject();
        }
      });
    }
    const script = document.createElement("script");
    script.setAttribute("id", "addedscript");
    script.src = "js/webflow.js";
    script.async = true;
    setTimeout(() => {
      document.body.appendChild(script);
    }, 100);
    fetchUser();
    return () => {
      // window.removeEventListener("scroll");

      document.getElementById("addedscript").remove();
    };
  }, [run]);

  useEffect(() => {
    ClevertapReact.initialize("46R-9ZW-7W6Z");
    console.log("Clevertap Initialized");
  }, [run]);

  return (
    <>
      <div
        className="page-wrapper"
        style={{ height: "100vh", overflow: "scroll", overflowX: "hidden" }}
      >
        <Switch>
          <UnautorizedRoutes
            key={"solution"}
            exact
            path="/solution"
            component={Solutions}
          />
          <UnautorizedRoutes
            exact
            key={"signIn"}
            path="/signIn"
            component={SignIn2}
          />
          <UnautorizedRoutes
            exact
            path="/SignUp"
            key={"signUp"}
            component={SignUp}
          />
          <PrivateRoute path="/mvp" key={"mvp"} component={Mvp} />

          <UnautorizedRoutes path="/" key={"home"} component={SplashWeb} />
          {/* <ProtectedRoute
              path="/createProfile"
              component={createProfilePage}
            /> */}
          {/* <PrivateRoute path="/chat" component={Chat} />
            <AdminRoute path="/dashboard" component={AdminDashbord} />

            <PrivateRoute path="/pages/feeds" component={Feeds} />
            <Route exact path="/" component={RegisterPage} /> */}
        </Switch>
      </div>
    </>
  );
}

export default withRouter(App);
