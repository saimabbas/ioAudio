import { Button, Row, Typography } from "antd";
import React from "react";
import { FederatedsignUp } from "../../../../utils/FadralSignIn/FadralSignIn";
import GuaranteeParner from "../../../../utils/guaranteedParner/GuaranteedParner";
import TextInput from "../../../../utils/inputs/TextInput";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Step0({
  formData,
  onChange,
  handleChange,
  next,
  setCurrent,
  current,
}) {
  const handleLoginWith3rdParties = async (provider) => {
    try {
      // debugger
      const event = await FederatedsignUp(provider);
      // debugger
      console.log(event);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
    // data-animation="cross"
    // data-hide-arrows="1"
    // data-disable-swipe="1"
    // data-duration="200"
    // data-infinite="1"
    // className="free-sign-up-steps w-slider"
    >
      <div>
        <div className="isthisYou">
          <div className="text-block-2">
            <h6 className="signIn_right_heading" level={3}>
              Create Your ioAudio Account
            </h6>
          </div>
          <TextInput
            type="email"
            className="tf-sign-up-email w-input sigIn_s_input"
            maxlength="256"
            name="email"
            value={formData.email}
            onChange={handleChange}
            help={formData.emailHelp}
            data-name="Email"
            placeholder="Email"
            id="email"
            required=""
          />
          <span className="s_span_btns">
            <label className="w-checkbox">
              <input
                type="checkbox"
                id="checkbox"
                name="terms"
                checked={formData.terms}
                data-name="Checkbox"
                onChange={onChange}
                className="w-checkbox-input"
              />
              <span className="checkbox-label-2 w-form-label">
                By clicking continue, you agree to ioAudio&#x27;s policies
              </span>
            </label>
            <label className="w-checkbox">
              <input
                type="checkbox"
                id="checkbox-2"
                name="marketingEmail"
                checked={formData.marketingEmail}
                onChange={onChange}
                data-name="Checkbox 2"
                className="w-checkbox-input"
              />
              <span className="checkbox-label w-form-label">
                I agree to receive occasional marketing emails
              </span>
            </label>
          </span>
          <div className="buttons-signup s_btn_signIn">
            <Button
              // disabled={formData.emailIsValid && formData.terms ? false : true}
              className="sig-up-oo"
              className="botten signIn_btn_s"
              onClick={formData.emailIsValid && formData.terms && next}
              style={{ width: "100%" }}
              type="primary"
              //   icon={<RightOutlined />}
            >
              Continue
              <MdKeyboardArrowRight className="signIn_btn_s_icon" />
            </Button>
          </div>
          <div
            style={{ cursor: "pointer" }}
            className="login-google gg_signin_auth auth_button_signin"
            onClick={() => handleLoginWith3rdParties("Google")}
            id="google_signup_btn"
          >
            <img src="/images/google.jpg" alt="google" />
            LOGIN WITH GOOGLE
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => handleLoginWith3rdParties("Facebook")}
            className="login-facebook auth_button_signin fb_signin_auth"
            id="fb_signup_btn"
          >
            <img src="/images/facebook-1.png" alt="facebook" />
            LOGIN WITH FACEBOOK
          </div>
          <div className="signin_already">
            <h1>Already have an account?</h1>
            <Link to="/signIn">
              <h2> Please sign in</h2>
            </Link>
          </div>
          <img
            src="/images/stripe_logos_copia.png"
            alt="stripe_logos copia.png"
			className="signIn_bottom_img"
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          // padding: "10px",
          // paddingLeft: "80%",
        }}
      >
        {/* <Row justifyContent="center" align="middle"> */}
        <div
          onClick={() => setCurrent(0)}
          className="dotInSign"
          style={{
            backgroundColor: current == 0 ? "#551a8b" : "gray",
          }}
        ></div>
        <div
          className="dotInSign"
          style={{
            backgroundColor: current == 1 ? "#551a8b" : "gray",
          }}
        ></div>
        {/* </Row> */}
      </div>
    </div>
  );
}
