import React from "react";

export default function SplashFooter() {
  return (
    <div class="content-section page-wrapper">
      <div class="top-yellow-footer">
        <div class="container">
          <div class="top-footer">
            <div class="columns-second w-row">
              <div class="column-no-padding w-col w-col-6 w-col-medium-6 w-col-small-small-stack">
                <a class="second-brand footer w-inline-block">
                  <img
                    src="images/ioAudio-logo_transparent-thin-margins.png"
                    width="180"
                    sizes="(max-width: 479px) 67vw, (max-width: 767px) 34vw, 180.00001525878906px"
                    alt=""
                    srcSet="images/ioAudio-logo_transparent-thin-margins-p-500.png 500w, images/ioAudio-logo_transparent-thin-margins-p-800.png 800w, images/ioAudio-logo_transparent-thin-margins-p-1080.png 1080w, images/ioAudio-logo_transparent-thin-margins.png 1672w"
                    class="logo-white footer-logo"
                  />
                </a>
              </div>
              <div class="column-no-padding w-col w-col-6 w-col-medium-6 w-col-small-small-stack">
                <div class="download">
                  <a class="cta-link w-inline-block">
                    <img
                      src="images/5d5a7d8683100b51fc095a35_app-store.svg"
                      width="120"
                      alt=""
                      class="play paddings"
                    />
                  </a>
                  <a class="w-inline-block">
                    <img
                      src="images/5d5a7d864a2e86db9cb4964e_google-play.svg"
                      width="120"
                      alt=""
                      class="play"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-wrapper">
        <div class="container">
          <div class="footer-column-wrapper">
            <div class="footer-block about-us">
              <h1 class="footer-heading white">About Us</h1>
              <p class="lighter-paragraph">
                The best years of your life are the ones in which you decide
                your problems are your own. You do not blame them on your
                mother, the ecology, or the president. You realize that you
                control your own destiny.
              </p>
            </div>
            <div class="footer-block">
              <h1 class="footer-heading white">NAvigation</h1>
              <a
                href="product/why-ioaudio.html"
                class="footer-sub-link lighter"
              >
                Why ioAudio?
              </a>
              <a href="solutions.html" class="footer-sub-link lighter">
                Solutions
              </a>
              <a href="pricing.html" class="footer-sub-link lighter">
                Pricing
              </a>
              <a href="compare.html" class="footer-sub-link lighter">
                Comparisons
              </a>
              <a href="integrations.html" class="footer-sub-link last lighter">
                Integrations
              </a>
              <a href="blog.html" class="footer-sub-link last lighter">
                Blog
              </a>
            </div>
            <div class="footer-block">
              <h1 class="footer-heading white">USEFUL LINKS</h1>
              <a href="401.html" class="footer-sub-link lighter">
                Protected Page
              </a>
              <a href="404.html" class="footer-sub-link lighter">
                404 Page
              </a>
              <a href="style-guide.html" class="footer-sub-link lighter">
                Style Guide
              </a>
              <a
                href="service-status.html"
                class="footer-sub-link last lighter"
              >
                Licensing
              </a>
              <a class="footer-sub-link last lighter">Changelog</a>
            </div>
            <div class="footer-block contact">
              <h1 class="footer-heading white">Social Icons</h1>
              <div class="social-wrapper-second">
                <a class="social-link-second line w-inline-block"></a>
                <a class="social-link-second instagram line w-inline-block"></a>
                <a class="social-link-second be line w-inline-block"></a>
                <a class="social-link-second facebook line w-inline-block"></a>
              </div>
            </div>
          </div>
          <div class="bottom-footer dark">
            <div class="columns-second w-row">
              <div class="column-no-padding w-col w-col-6 w-col-stack w-col-small-small-stack">
                <a class="second-brand footer w-inline-block"></a>
                <div class="copyright left">
                  <div class="copyright-text lighter">
                    Created with love by{" "}
                    <a target="_blank" class="lighter-link">
                      ioAudio
                    </a>
                  </div>
                </div>
              </div>
              <div class="column-no-padding w-col w-col-6 w-col-stack w-col-small-small-stack">
                <div class="copyright">
                  <a class="footer-social-link w-inline-block">
                    <div class="underline social-line"></div>
                  </a>
                  <a class="footer-social-link w-inline-block">
                    <div class="underline social-line"></div>
                  </a>
                  <div class="copyright-text lighter">
                    Powered by{" "}
                    <a target="_blank" class="lighter-link">
                      Webflow
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
