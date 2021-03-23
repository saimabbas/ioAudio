import React, { useState } from "react";
import GuaranteeParner from "../../../utils/guaranteedParner/GuaranteedParner";
// import TextInput from "../../../utils/inputs/TextInput";
// import { Button, Steps } from "antd";
import ParnerDetail from "../../../utils/parnerDetails/ParnerDetail";
import { emailPattern } from "../../../utils/emailPatern/emailPatern";
import { useDispatch } from "react-redux";
import EmailVerication from "../emailVerification/EmailVerication";
import Step0 from "./steps/Step0";
import Step1 from "./steps/step1";
import Step3 from "./steps/Step3";
import { UserPool } from "../../../config/userPool/UserPoll";
import { CognitoUserAttribute, CognitoUser } from "amazon-cognito-identity-js";
import { Alerterror } from "../../../utils/appAlert/AppAlert";
import { Auth } from "aws-amplify";
import { Row, Col } from "antd";
import CreateThreadModal from "../../mvp/createThreadModal/CreateThreadModal";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    firstNameIsValid: false,
    firstNameHelp: "",
    firstNameValidateStatus: "",

    lastName: "",
    lastNameIsValid: false,
    lastNameHelp: "",
    lastNameValidateStatus: "",

    email: "",
    emailIsValid: false,
    emailHelp: "",
    emailValidateStatus: "",

    password: "",
    passwordIsValid: false,
    passwordHelp: "",
    passwordValidateStatus: "",

    company: "",
    companyIsValid: false,
    companyHelp: "",
    companyValidateStatus: "",

    verificationCode: "",
    verificationCodeIsValid: false,
    verificationCodeHelp: "",
    verificationCodeValidateStatus: "",

    terms: false,
    marketingEmail: false,
    loading: false,
  });
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
      case "firstName":
        if (value.trim() === "") {
          setFormData({
            ...formData,
            [name]: value,
            firstNameValidateStatus: "error",
            firstNameHelp: "Enter your first name!",
            firstNameIsValid: false,
          });
        } else {
          setFormData({
            ...formData,
            [name]: value,
            firstNameValidateStatus: "success",
            firstNameHelp: "",
            firstNameIsValid: true,
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
      case "lastName":
        if (value.trim() === "") {
          setFormData({
            ...formData,
            [name]: value,
            lastNameValidateStatus: "error",
            lastNameHelp: "Enter your last name!",
            lastNameIsValid: false,
          });
        } else {
          setFormData({
            ...formData,
            [name]: value,
            lastNameValidateStatus: "success",
            lastNameHelp: "",
            lastNameIsValid: true,
          });
        }
        break;
      case "company":
        if (value.trim() === "") {
          setFormData({
            ...formData,
            [name]: value,
            companyValidateStatus: "error",
            companyHelp: "Enter your company name!",
            companyIsValid: false,
          });
        } else {
          setFormData({
            ...formData,
            [name]: value,
            companyValidateStatus: "success",
            companyHelp: "",
            companyIsValid: true,
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
  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  }
  const dispatch = useDispatch();

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
          : "Enter your Email!",
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
          : "Enter your password!",
        passwordValidateStatus: "error",
      });
      return;
    }
    if (!formData.firstNameIsValid) {
      isFormValid = false;
      setFormData({
        ...formData,
        firstNameIsValid: false,
        firstNameHelp: "Enter your first Name!",
        firstNameValidateStatus: "error",
      });
      return;
    }
    if (!formData.lastNameIsValid) {
      isFormValid = false;
      setFormData({
        ...formData,
        lastNameIsValid: false,
        lastNameHelp: "Enter your last name!",
        lastNameValidateStatus: "error",
      });
      return;
    }
    if (!formData.companyIsValid) {
      isFormValid = false;
      setFormData({
        ...formData,
        companyIsValid: false,
        companyHelp: "Enter your company name!",
        companyValidateStatus: "error",
      });
      return;
    }
    if (isFormValid) {
      // next();
      const {
        email,
        password,
        firstName,
        company,
        lastName,
        // terms,
        // marketingEmail,
      } = formData;
      console.log(formData);
      setFormData({ ...formData, loading: true });
      Auth.signUp({
        username: email,
        password: password,
        attributes: {
          "custom:company": company,
          "custom:firstname": firstName,
          "custom:lastname": lastName,
        },
      })
        .then((data) => {
          setFormData({ ...formData, loading: false });
          console.log(data);
          next();
        })
        .catch((err) => {
          setFormData({ ...formData, loading: false });
          console.log("error signing up!:", err);
          console.log(err);
          Alerterror(err.message);
          return;
        });
      // UserPool.signUp(email, password, attributeList, null, (err, data) => {
      //   setFormData({ ...formData, loading: false });
      //   if (err) {
      //     console.log(err);
      //     Alerterror(err.message);
      //     return;
      //   }

      //   console.log(data);
      //   next();
      // });
    } else {
      console.log("Validation Error");
    }
  };

  const [current, setCurrent] = React.useState(0);
  const removeStyle = () => {
    document.getElementById("modalSignup").setAttribute("style", "");
  };
  const next = () => {
    setCurrent(current + 1);
  };

  const handleVerification = (e) => {
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
    if (isFormValid) {
      const userData = {
        Username: formData.email,
        Pool: UserPool,
      };

      const cognitoUser = new CognitoUser(userData);
      setFormData({ ...formData, loading: true });
      cognitoUser.confirmRegistration(
        formData.verificationCode,
        true,
        function (err, result) {
          setFormData({ ...formData, loading: false });

          if (err) {
            Alerterror(err.message || JSON.stringify(err));
            return;
          }
          next();
          console.log("call result: " + result);
          // const {
        }
      );

      //   email,
      //   password,
      //   firstName,
      //   lastName,
      //   phone,
      //   terms,
      //   privacy,
      // } = formData;
      // dispatch(
      //   AddUser({ email, password, firstName, lastName, phone, terms, privacy })
      // );
    } else {
      console.log("Validation Error");
    }
  };
  const resendConfirmationCode = () => {
    const userData = {
      Username: formData.email,
      Pool: UserPool,
    };

    const cognitoUser = new CognitoUser(userData);
    cognitoUser.resendConfirmationCode(function (err, result) {
      if (err) {
        Alerterror(err.message || JSON.stringify(err));
        return;
      }
      console.log("call result: " + result);
    });
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  return (
    <div
      className="modal-wrapper"
      id="modalSignup"
      style={{ overflow: "scroll", overflowX: "hidden" }}
    >
      <div className="modal s_modal">
        <div className="columns w-row signup_container_modal">
          {/* <ParnerDetail component={false} /> */}
          <div className="modal_static_left_side">
            <img
              src="/images/rounded_picture_testimonial.png"
              alt="rounded_picture_testimonial"
              className="signup_testimont_img"
            />
            <span>
              <h1>Phillip AbernathyVP</h1>
              <h2> of Digital TransformationQuote</h2>
            </span>
            <p>his is the app I’ve been waiting for.</p>
            <img
              className="signup_livestream"
              src="/images/logo_livestorm-2.png"
              alt="logo_livestorm"
            />
          </div>
          <div
            className="column-3 w-col w-col-8 modal_static_right_side"
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            {/* <Signupheader removeStyle={removeStyle} /> */}
            {/* <div>
              <img
                src="images/ioAudio-logo_transparent-1.png"
                loading="lazy"
                sizes="100vw"
                srcSet="images/ioAudio-logo_transparent-1-p-500.png 500w, images/ioAudio-logo_transparent-1-p-800.png 800w, images/ioAudio-logo_transparent-1-p-1080.png 1080w, images/ioAudio-logo_transparent-1.png 1493w"
                alt=""
                className="logoioaudio"
              />
            </div> */}
            <div
              // className="div-free-signup"
              style={{
                display: "flex",
                alignContent: "center",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <div
                id="free-sign-up-form"
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                }}
                className="free-sign-up-form"
              >
                <Row justify="center" style={{ height: "100%" }} align="middle">
                  <Col
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignContent: "flex-end",
                      position: "relative",
                      left: "2%",
                    }}
                    span={24}
                  >
                    {" "}
                    {/* <a
                      style={{ cursor: "pointer" }}
                      data-w-id="0aafe6b5-7e08-df35-c4dc-19826ea82dd2"
                      className="link-2"
                      onClick={removeStyle}
                    >
                      X
                    </a> */}
                  </Col>
                  <form
                    onSubmit={handleSubmit}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    // className="free-sign-up-form-div"
                  >
                    {current === 0 && (
                      <Step0
                        formData={formData}
                        handleChange={handleChange}
                        onChange={onChange}
                        next={next}
                        current={current}
                        setCurrent={setCurrent}
                      />
                    )}
                    {current === 1 && (
                      <Step1
                        formData={formData}
                        handleChange={handleChange}
                        onChange={onChange}
                        handleSubmit={handleSubmit}
                        current={current}
                        setCurrent={setCurrent}
                      />
                    )}

                    {current === 2 && (
                      <EmailVerication
                        formData={formData}
                        handleChange={handleChange}
                        onChange={onChange}
                        resendConfirmationCode={resendConfirmationCode}
                        handleVerification={handleVerification}
                      />
                    )}

                    {current === 3 && (
                      <Step3
                        formData={formData}
                        handleChange={handleChange}
                        onChange={onChange}
                        handleVerification={handleVerification}
                      />
                    )}
                  </form>
                </Row>
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
          </div>
        </div>
      </div>
    </div>
  );
}
