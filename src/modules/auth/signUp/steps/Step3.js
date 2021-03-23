import React from "react";

export default function Step3() {
  return (
    <div
      data-animation="cross"
      data-hide-arrows="1"
      data-disable-swipe="1"
      data-duration="200"
      data-infinite="1"
      className="free-sign-up-steps w-slider"
    >
      <div className="mask-3 w-slider-mask">
        <div
          // className="free-signup-thank-you"
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <div className="text-block-2">
            <strong className="welcome-ioaudio">Welcome to ioAudio</strong>
          </div>
          <div className="text-block-3">
            Your ioAudio account has been created.
            <br />
            Pleasecheck your email to confirm and log in!
            <strong>
              <br />{" "}
            </strong>
          </div>
          <div className="welcome-ioaudio-copy">
            <strong className="bold-text">Earn Credit</strong>
          </div>
          <div className="text-block-3-copy">
            Invite a friend to ioAudio and you&#x27;ll both get a $10 credit!
          </div>
          <div className="w-form">
            <form
              id="email-form-2"
              name="email-form-2"
              data-name="Email Form 2"
            >
              <input
                type="email"
                className="text-field-signup-copy w-input"
                maxlength="256"
                name="email-2"
                data-name="Email 2"
                placeholder="Email"
                id="email-2"
                required=""
              />
              <a className="link-4">+</a>
            </form>
            <div className="w-form-done">
              <div>Thank you! Your submission has been received!</div>
            </div>
            <div className="w-form-fail">
              <div>Oops! Something went wrong while submitting the form.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
