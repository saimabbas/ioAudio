import React from "react";

export default function HeroSection() {
  return (
    <div className="hero-section dark">
      <div className="hero-div center">
        <p className="hero-paragraph white">
          {" "}
          You can save your time and help you get inspired. Explore its features
          which are unique and easy to customize.
        </p>
        <div
          data-w-id="20c31805-a1af-6ed2-396b-932acb9163b8"
          // style={{opacity:"0"}}
          className="hero-div-info"
        >
          <div
            data-w-id="b0a7983f-6e92-d112-80f0-aad89aaf99f3"
            // style={{opacity:"0"}}
            className="hero-info-block center"
          >
            <h4 className="small-sub-text light">
              Introducing Athena UI Kit Template
            </h4>
            <p className="hero-paragraph white right-algiment">
              Athena comes not only with over 6 pre-made homepage layouts, but
              also hundreds of page block components
            </p>
            <div className="baner-big-text white center">
              Action is the Foundational <br />
              Key to all Success.
              <br />
            </div>
            <div className="button-wrapper"></div>
          </div>
          <img
            src="images/Laptop-Mockup11.png"
            width="940"
            sizes="(max-width: 479px) 100vw, (max-width: 767px) 92vw, (max-width: 991px) 95vw, 940.0000610351562px"
            alt=""
            srcSet="images/Laptop-Mockup11-p-500.png 500w, images/Laptop-Mockup11-p-800.png 800w, images/Laptop-Mockup11-p-1080.png 1080w, images/Laptop-Mockup11.png 1142w"
            className="image-second"
          />
        </div>
      </div>
      <a className="mouse-link w-inline-block">
        <div className="mouse-scroll yellow">
          <div className="scroll-wheel dark"></div>
        </div>
      </a>
    </div>
  );
}
