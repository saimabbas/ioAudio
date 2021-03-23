import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SplashHeader({ setSignupForm }) {
  //   window.addEventListener('scroll', () => {
  //     let activeClass = 'normal';
  //     if(window.scrollY === 0){
  //         activeClass = 'top';
  //     }
  //     this.setState({ activeClass });
  //  });

  return (
    <div
      data-collapse="none"
      data-animation="default"
      data-duration="400"
      role="banner"
      className={`navbar w-nav  forbackground`}
    >
      <div className="container navigation w-container">
        <Link
          to="/"
          aria-current="page"
          className="brand w-nav-brand w--current"
        >
          <img
            src="images/logoio.png"
            width="156"
            srcSet="images/ioAudio-logo_transparent1-p-500.png 500w, images/ioAudio-logo_transparent1-p-800.png 800w, images/ioAudio-logo_transparent1-p-1080.png 1080w, images/ioAudio-logo_transparent1-p-1600.png 1600w, images/ioAudio-logo_transparent1.png 2000w"
            sizes="(max-width: 479px) 48.05555725097656px, (max-width: 767px) 14vw, (max-width: 991px) 16vw, 155.98959350585938px"
            alt=""
            className="logo-white invert"
          />
        </Link>
        <div className="navigation-div white">
          <nav role="navigation" className="nav-menu w-nav-menu">
            <Link to="/" className="nav-link white w-nav-link">
              Why ioAudio?
            </Link>
            <Link to="/solution" className="nav-link white w-nav-link">
              Solutions
            </Link>
            <Link to="/" className="nav-link white w-nav-link">
              Pricing
            </Link>
            <Link to="/" className="nav-link white w-nav-link">
              Comparisons
            </Link>
            <Link to="/" className="nav-link white w-nav-link">
              Integrations
            </Link>
            <Link to="/" className="nav-link white w-nav-link">
              Blog
            </Link>
          </nav>
        </div>
        <div className="div-block-8">
          <Link
            to="/signIn"
            className="yellow-line _w-button button"
            id="navloginbtn"
          >
            LOGIN
          </Link>
          <Link
            to="/"
            onClick={setSignupForm}
            data-w-id="435ddf1d-9f5d-ae4b-cc14-97b617b80072"
            className="yellow-line _w-button button"
            id="navsignupbtn"
          >
            SIGNUP
          </Link>
        </div>
        <div className="menu-button white-menu w-nav-button">
          <div className="w-icon-nav-menu"></div>
        </div>
      </div>
    </div>
  );
}
