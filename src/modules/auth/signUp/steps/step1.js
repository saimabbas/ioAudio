import { Button, Row, Typography } from "antd";
import React from "react";
import GuaranteeParner from "../../../../utils/guaranteedParner/GuaranteedParner";
import TextInput from "../../../../utils/inputs/TextInput";
import { MdDone } from "react-icons/md";
export default function Step1({
  formData,
  handleChange,
  handleSubmit,
  setCurrent,
  current,
}) {
  return (
    <div
      data-animation="cross"
      data-hide-arrows="1"
      data-disable-swipe="1"
      data-duration="200"
      data-infinite="1"
      // className="free-sign-up-steps w-slider"
    >
      <div className="isThisYou_2">
        <div>
          <div className="text-block-2">
            <h6 className="signIn_right_heading" level={3}>
              Create Your ioAudio Account
            </h6>
          </div>
          <TextInput
            type="text"
            className="tb-signup-first-name w-input sigIn_s_input tf-sign-up-email"
            autofocus="true"
            maxlength="256"
            name="firstName"
            data-name="First Name"
            value={formData.firstName}
            onChange={handleChange}
            help={formData.firstNameHelp}
            placeholder="First Name"
            id="First-Name"
            required=""
          />
          <TextInput
            type="text"
            className="tf-signup-last-name w-input sigIn_s_input tf-sign-up-email"
            maxlength="256"
            name="lastName"
            data-name="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            help={formData.lastNameHelp}
            placeholder="Last Name"
            id="Last-Name"
            required=""
          />
          <TextInput
            type="text"
            className="tf-sign-up-comp-name w-input sigIn_s_input tf-sign-up-email"
            maxlength="256"
            name="company"
            value={formData.company}
            onChange={handleChange}
            help={formData.companyHelp}
            data-name="Companhy Name"
            placeholder="Company Name"
            id="Companhy-Name"
            required=""
          />
          <TextInput
            type="password"
            className="tf-signup-password w-input sigIn_s_input tf-sign-up-email"
            maxlength="256"
            name="password"
            value={formData.password}
            onChange={handleChange}
            help={formData.passwordHelp}
            data-name="Password"
            placeholder="Password"
            id="Password"
            required=""
          />
          <div
            // className="div-block-9-2"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <Button
              onClick={handleSubmit}
              className="submit-free-sinup-button w-button signIn_btn_s botten"
              type="primary"
              style={{ width: "100%", marginTop: "20px" }}
              loading={formData.loading}
              // icon={<CheckOutlined />}
            >
              Complete Signup
              <MdDone className="signIn_btn_s_icon" />
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%"
            }}
            className="div-block-9-2"
          >
            <img
              src="/images/stripe_logos_copia.png"
              alt="stripe_logos copia.png"
              className="signIn_bottom_img"
            />
          </div>
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
      </div>
    </div>
  );
}
