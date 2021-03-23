import { Button } from "antd";
import React from "react";
import TextInput from "../../../utils/inputs/TextInput";

export default function EmailVerication({
  handleChange,
  handleVerification,
  formData,
  resendConfirmationCode,
  ...props
}) {
  return (
    <div className="conf-code-div" style={{ display: "flex" }}>
      <div id="conf-code-form" className="conf-code-form w-form">
        <div className="conf-code-text">
          <strong className="forget-passwrod-text">Confirmation Code</strong>
        </div>
        <a className="code-sent-text">
          We have sent a verification code to your email
        </a>
        <form
          onSubmit={handleVerification}
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
          <input
            type="number"
            className="new-password w-input"
            maxlength="256"
            name="New-Password"
            data-name="New Password"
            placeholder="Verification Code"
            id="New-Password"
            required=""
          />

          <Button
            type={"primary"}
            loading={formData.loading}
            // className="send-reset-email w-button"
            id="verifycodebtn"
            className="botten"
            onClick={handleVerification}
          >
            Verifry
          </Button>
          {/* <a className="need-on-login">Did not received code? </a> */}
          <p onClick={resendConfirmationCode} style={{cursor:"pointer"}} className="resend-code">
            Resend Code
          </p>
        </form>
        
        <div className="w-form-done">
          <div>Thank you! Your submission has been received!</div>
        </div>
        <div className="w-form-fail">
          <div>Oops! Something went wrong while submitting the form.</div>
        </div>
      </div>
    </div>
  );
}
