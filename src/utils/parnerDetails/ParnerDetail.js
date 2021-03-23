import React from "react";

export default function ParnerDetail({ component }) {
  return (
    <div>
      {!component ? (
        <div className="column-2 w-col w-col-4">
          <img
            src="https://uploads-ssl.webflow.com/5f69a6dbc534d0c59f28d04f/5f6ce99df8963774eff0f835_gilles%20bertaux.png"
            loading="lazy"
            alt=""
            className="image"
          />
          <div className="div-block-2">
            <h5 className="heading">Giles Bertaux</h5>
            <div className="text-block">Co-founder &amp; CEO</div>
          </div>
          <div className="div-block-3">
            <img
              src="https://uploads-ssl.webflow.com/5f69a6dbc534d0c59f28d04f/5f6cf24951e3c55137148954_livestorm.png"
              loading="lazy"
              width="76"
              alt=""
              className="image-3"
            />
            <img
              src="https://uploads-ssl.webflow.com/5f69a6dbc534d0c59f28d04f/5f6cf24860f721393ac20e1f_lslogo.png"
              loading="lazy"
              alt=""
              className="image-2"
            />
            <p className="paragraph-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </p>
          </div>
        </div>
      ) : (
        <div className="lcolumn-2 w-col w-col-4">
          <img
            src="https://uploads-ssl.webflow.com/5f69a6dbc534d0c59f28d04f/5f6ce99df8963774eff0f835_gilles%20bertaux.png"
            loading="lazy"
            width="204"
            alt=""
            className="limage"
          />
          <div className="ldiv-block-2">
            <h5 className="heading">Giles Bertaux</h5>
            <div className="text-block">Co-founder &amp; CEO</div>
          </div>
          <div className="ldiv-block-3">
            <img
              src="https://uploads-ssl.webflow.com/5f69a6dbc534d0c59f28d04f/5f6cf24860f721393ac20e1f_lslogo.png"
              loading="lazy"
              alt=""
              className="image-2-copy"
            />
            <p className="paragraph-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique.
            </p>
            <img
              src="https://uploads-ssl.webflow.com/5f69a6dbc534d0c59f28d04f/5f6cf24951e3c55137148954_livestorm.png"
              loading="lazy"
              width="76"
              alt=""
              className="image-3-copy"
            />
          </div>
        </div>
      )}
    </div>
  );
}
