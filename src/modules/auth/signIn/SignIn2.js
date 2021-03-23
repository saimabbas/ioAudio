import React, { useState, useEffect } from "react";
import { emailPattern } from "../../../utils/emailPatern/emailPatern";
import ParnerDetail from "../../../utils/parnerDetails/ParnerDetail";
import { Alert, Button, Spin } from "antd";
import TextInput from "../../../utils/inputs/TextInput";
import { AddUser } from "../../../redux/actions/userActions/userActions";
import { useDispatch } from "react-redux";
import { UserPool } from "../../../config/userPool/UserPoll";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { Alerterror, Alertsuccess } from "../../../utils/appAlert/AppAlert";
import { FederatedsignUp } from "../../../utils/FadralSignIn/FadralSignIn";
import { Auth } from "aws-amplify";
import { ClevertapReact } from "../../../utils/clevertap/clevertap";
import { socketCleint } from "../../../config/socket/socketConfig";
import Form from "antd/lib/form/Form";

function SignIn2(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    setPageLoading(true);
    Auth.currentAuthenticatedUser({ bypassCache: false })
      .then((data) =>
        dispatch(
          AddUser({
            ...data.signInUserSession.idToken.payload,
            ...data.signInUserSession,
          })
        )
      )
      .catch((err) => console.log("askdjf", err))
      .finally(setPageLoading(false));
  });
  const [forgetScreen, setForgetData] = useState(false);
  const [showResetScreen, setResetScreen] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    emailIsValid: false,
    emailHelp: "",
    emailValidateStatus: "",

    password: "",
    passwordIsValid: false,
    passwordHelp: "",
    passwordValidateStatus: "",
    loading: false,

    verificationCode: "",
    verificationCodeIsValid: false,
    verificationCodeHelp: "",
    verificationCodeValidateStatus: "",
  });
  const handleToLogin = () => {
    props.history.push("/");
    setTimeout(
      () => {
        document
          .getElementById("modalSignup")
          .setAttribute(
            "style",
            "overflow:  scroll;overflow-x : hidden ;opacity: 1; display: flex;"
          );
      },

      500
    );
  };
  const onChangeValidator = (name, value) => {
    switch (name) {
      case "password":
        if (value.trim() === "" || value.length < 5) {
          setFormData({
            ...formData,
            [name]: value,
            passwordValidateStatus: "error",
            passwordHelp: "Enter more than 5 digit password!",
            passwordIsValid: false,
          });
        } else {
          setFormData({
            ...formData,
            [name]: value,
            passwordValidateStatus: "success",
            passwordHelp: "",
            passwordIsValid: true,
          });
        }
        break;
      case "verificationCode":
        if (value.trim() === "") {
          setFormData({
            ...formData,
            [name]: value,
            verificationCodeValidateStatus: "error",
            verificationCodeHelp: "Enter your verification Code!",
            verificationCodeIsValid: false,
          });
        } else {
          setFormData({
            ...formData,
            [name]: value,
            verificationCodeValidateStatus: "success",
            verificationCodeHelp: "",
            verificationCodeIsValid: true,
          });
        }
        break;
      case "email":
        if (!emailPattern.test(value)) {
          setFormData({
            ...formData,
            [name]: value,
            emailValidateStatus: "error",
            emailHelp: "Enter a valid Email address!",
            emailIsValid: false,
          });
        } else {
          setFormData({
            ...formData,
            [name]: value,
            emailValidateStatus: "success",
            emailHelp: "",
            emailIsValid: true,
          });
        }
        break;
      default:
        setFormData({ ...formData, [name]: value });
    }
  };
  const handleChange = (e) => {
    onChangeValidator(e.target.name, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isFormValid = true;
    if (!formData.emailIsValid) {
      isFormValid = false;
      setFormData({
        ...formData,
        emailValidateStatus: "error",
        emailHelp: formData.emailHelp
          ? formData.emailHelp
          : "Enter your Email !",
      });
      return;
    }

    if (!formData.passwordIsValid) {
      isFormValid = false;
      setFormData({
        ...formData,
        passwordIsValid: false,
        passwordHelp: formData.passwordHelp
          ? formData.passwordHelp
          : "Enter your password !",
        passwordValidateStatus: "error",
      });
      return;
    }
    setFormData({ ...formData, loading: true });

    if (isFormValid) {
      const { email, password } = formData;
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });
      const auth = new AuthenticationDetails({
        Username: email,
        Password: password,
      });
      user.authenticateUser(auth, {
        onSuccess: (data) => {
          console.log("Logged In User data", data);
          console.log("email", email);
          socketCleint.connect();

          socketCleint.on("connect", function () {
            socketCleint.emit("authentication", {
              token: data.idToken.jwtToken,
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

          dispatch(AddUser({ ...data.idToken.payload, ...data }));
          setFormData({ ...formData, loading: false });
          //send clevertap event
          LoginClevertapEvent("Email", "success");
          //set identity
          setClevertapIdentity(email);
        },
        onFailure: (err) => {
          console.log(err);
          Alerterror(err.message);
          // console.log("email", email);
          // dispatch(AddUser({ email, password }));
          setFormData({ ...formData, loading: false });
          //send clevertap event
          LoginClevertapEvent("Email", "failure");
        },
      });
    } else {
      setFormData({ ...formData, loading: false });
      console.log("Validation Error");
    }
  };
  const handleLoginWith3rdParties = async (provider) => {
    try {
      // debugger
      const event = await FederatedsignUp(provider);
      //send clevertap event
      LoginClevertapEvent(provider, "success");
      // debugger
      console.log("Provider Login Event", event);
    } catch (err) {
      console.log(err);
      LoginClevertapEvent(provider, "failure");
    }
  };

  const handleForget = (e) => {
    e.preventDefault();
    let isFormValid = true;
    if (!formData.emailIsValid) {
      isFormValid = false;
      setFormData({
        ...formData,
        emailValidateStatus: "error",
        emailHelp: formData.emailHelp
          ? formData.emailHelp
          : "Enter your Email !",
      });
      return;
    }

    setFormData({ ...formData, loading: true });

    if (isFormValid) {
      const { email } = formData;
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      user.forgotPassword({
        onSuccess: (data) => {
          console.log(data);
          console.log("email", data);
          // dispatch(AddUser({ ...data.idToken.payload, ...data }));
          setFormData({ ...formData, loading: false });
          setResetScreen(true);
        },
        onFailure: (err) => {
          console.log(err);
          Alerterror(
            err.code === "InvalidParameterException"
              ? "This email wasn’t found, please try another."
              : err.message
          );
          // console.log("email", email);
          // dispatch(AddUser({ email, password }));
          setFormData({ ...formData, loading: false });
        },
      });
    } else {
      setFormData({ ...formData, loading: false });
      console.log("Validation Error");
    }
  };

  const handleResetAndVerify = (e) => {
    e.preventDefault();
    let isFormValid = true;
    if (!formData.verificationCodeIsValid) {
      isFormValid = false;
      setFormData({
        ...formData,
        verificationCodeValidateStatus: "error",
        verificationCodeHelp: "Enter your verification Code!",
        verificationCodeIsValid: false,
      });
      return;
    }
    if (!formData.passwordIsValid) {
      isFormValid = false;
      setFormData({
        ...formData,
        passwordIsValid: false,
        passwordHelp: formData.passwordHelp
          ? formData.passwordHelp
          : "Enter your password !",
        passwordValidateStatus: "error",
      });
      return;
    }
    setFormData({ ...formData, loading: true });

    if (isFormValid) {
      const { email, password, verificationCode } = formData;
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });
      user.confirmPassword(verificationCode, password, {
        onSuccess() {
          Alertsuccess(
            "Your passward has been reset successfully, Please login here"
          );
          setIntialState();
          setForgetData(false);
          setResetScreen(false);
          //send password reset clevertap event
          PasswordResetClevertapEvent("success");
          console.log("Password confirmed!");
        },
        onFailure(err) {
          console.log("Password not confirmed!");
          Alerterror(err.message);
          // console.log("email", email);
          // dispatch(AddUser({ email, password }));
          setFormData({ ...formData, loading: false });
          //send password reset clevertap event
          PasswordResetClevertapEvent("failure");
        },
      });
    } else {
      setFormData({ ...formData, loading: false });
      console.log("Validation Error");
    }
  };
  const setIntialState = () => {
    setFormData({
      email: "",
      emailIsValid: false,
      emailHelp: "",
      emailValidateStatus: "",

      password: "",
      passwordIsValid: false,
      passwordHelp: "",
      passwordValidateStatus: "",
      loading: false,

      verificationCode: "",
      verificationCodeIsValid: false,
      verificationCodeHelp: "",
      verificationCodeValidateStatus: "",
    });
  };

  const swicthForgetData = (value) => {
    setForgetData(value);
    setIntialState();
  };

  const LoginClevertapEvent = (option, status) => {
    ClevertapReact.event("Login", {
      "Login Option": option,
      "Login Status": status,
    });

    console.log("Login Event Sent", option, status);
  };

  const PasswordResetClevertapEvent = (status) => {
    ClevertapReact.event("Password Reset", {
      Status: status,
    });

    console.log("Password Reset Event Sent", status);
  };

  const setClevertapIdentity = (email) => {
    ClevertapReact.onUserLogin({
      Site: {
        Email: email,
      },
    });

    console.log("Set Clevertap Identity", email);
  };
  return (
    <div className="signin__container">
      {pageLoading ? (
        <div className="example">
          <Spin />
        </div>
      ) : (
        <div>
          <div className="signin__container_top">
            <div className="signtop_textbox">
              <img
                className="signtop_back"
                src="/images/girl_background.png"
                alt="girl_background"
              ></img>
              <span>
                <img src="/images/logoio.png" alt="logo" />
                <h1>
                  Welcome Back! <span>Please login to your account.</span>
                </h1>
              </span>
            </div>
          </div>
          <div className="signin__container_bottom">
            <div className="signin_bottom_right">
              {!forgetScreen ? (
                <form onSubmit={handleSubmit}>
                  <input
                    className="plain_signin_input"
                    type="text"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                  />
                  <p className="validationError">{formData.emailHelp}</p>

                  <input
                    className="plain_signin_input"
                    value={formData.password}
                    onChange={handleChange}
                    // loading={formData.loading}
                    name="password"
                    type="password"
                    placeholder="Password"
                  />

                  <p className="validationError">{formData.passwordHelp}</p>
                  <Button
                    type="primary"
                    loading={formData.loading}
                    onClick={handleSubmit}
                    className="signin_login_btn"
                  >
                    LOGIN
                  </Button>

                  <div className="signin_remember_forget">
                    <span>
                      <input type="checkbox" name="" id="" />
                      <label htmlFor="">Remember me</label>
                    </span>

                    <p
                      onClick={() => {
                        swicthForgetData(true);
                      }}
                    >
                      Forget password?
                    </p>
                  </div>

                  <div
                    onClick={() => handleLoginWith3rdParties("Google")}
                    className="auth_button_signin gg_signin_auth "
                  >
                    <img src="/images/google.jpg" alt="google" />
                    LOGIN WITH GOOGLE
                  </div>
                  <div
                    onClick={() => handleLoginWith3rdParties("Facebook")}
                    className="auth_button_signin fb_signin_auth "
                  >
                    <img src="/images/facebook-1.png" alt="facebook" />
                    LOGIN WITH FACEBOOK
                  </div>

                  <h6 onClick={handleToLogin} className="signin_bot_new">
                    New to ioAudio? <a href="#">Create free ioAudio Account!</a>
                  </h6>
                </form>
              ) : (
                <div
                  className="forget-password-div"
                  style={{ display: "flex" }}
                >
                  {!showResetScreen ? (
                    <div className="forget-password-form w-form">
                      <div className="welcome-back-ioaudio-login">
                        <strong className="forget-passwrod-text">
                          Forgot your password?
                          <br />
                          No problem, let&#x27;s get you reset!
                        </strong>
                      </div>
                      <form
                        onSubmit={handleForget}
                        id="wf-form-Reset-Form"
                        name="wf-form-Reset-Form"
                        data-name="Reset Form"
                        className="reset-pass-form"
                      >
                        <TextInput
                          type="email"
                          className="login-email-field w-input"
                          maxlength="256"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          help={formData.emailHelp}
                          data-name="Login Email"
                          placeholder="Email"
                          id="Login-Email"
                          required=""
                        />
                        <Button
                          type={"primary"}
                          onClick={handleForget}
                          loading={formData.loading}
                          id="forget-send"
                          className="signin_login_btn"
                          // className="send-reset-email w-button"
                        >
                          Send Reset Email
                        </Button>
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            swicthForgetData(false);
                          }}
                          className="forget-password-lin"
                        >
                          <strong> Go back to login</strong>
                        </p>
                        <p className="need-on-login">Need ioAudio? </p>
                        <p
                          onClick={handleToLogin}
                          className="create-free-account-on-login"
                        >
                          Create free ioAudio Account
                        </p>
                      </form>
                    </div>
                  ) : (
                    <div className="conf-code-div" style={{ display: "flex" }}>
                      <div
                        id="conf-code-form"
                        className="conf-code-form w-form"
                      >
                        <div className="conf-code-text">
                          <strong className="forget-passwrod-text">
                            Confirmation Code
                          </strong>
                        </div>
                        <p className="code-sent-text">
                          We have sent a verification code to your email
                        </p>
                        <form
                          onSubmit={handleResetAndVerify}
                          id="wf-form-Conf-Code-Form"
                          name="wf-form-Conf-Code-Form"
                          data-name="Conf Code Form"
                          className="reset-pass-form"
                        >
                          <TextInput
                            type="number"
                            className="login-email-field w-input"
                            maxlength="256"
                            name="verificationCode"
                            value={formData.verificationCode}
                            onChange={handleChange}
                            help={formData.verificationCodeHelp}
                            data-name="Verification Code"
                            placeholder="Verification Code"
                            id="Verification-Code"
                            required=""
                          />
                          <TextInput
                            type="password"
                            className="login-password-field w-input"
                            maxlength="256"
                            name="password"
                            data-name="Login Password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            help={formData.passwordHelp}
                            id="Login-Password"
                            required=""
                          />

                          <Button
                            type={"primary"}
                            onClick={handleResetAndVerify}
                            loading={formData.loading}
                            className="signin_login_btn"
                          >
                            Verifry and Reset
                          </Button>

                          <p
                            style={{ cursor: "pointer" }}
                            onClick={handleForget}
                            className="resend-code"
                          >
                            {" "}
                            Did not received code? Resend Code
                          </p>
                        </form>
                        {/* <div className="w-form-done">
                      <div>Thank you! Your submission has been received!</div>
                    </div>
                    <div className="w-form-fail">
                      <div>
                        Oops! Something went wrong while submitting the form.
                      </div>
                    </div> */}
                      </div>
                    </div>
                  )}
                </div>
                // </div>
              )}
            </div>
            <div className="signin_bottom_left">
              <span>
                <img
                  src="/images/rounded_picture_testimonial.png"
                  alt="rounded_picture_testimonial"
                  className="signin_testimont_img"
                />
                <h1>Phillip Abernathy</h1>
                <h2>VP of Digital Transformation</h2>
                <p>This is the app I’ve been waiting for.</p>
                <img
                  className="signin_livestream"
                  src="/images/logo_livestorm.png"
                  alt="logo_livestorm"
                />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignIn2;
