import React from "react";

export default function BlogSecton() {
  return (
    <div class="section dark">
      <div class="container">
        <div
          data-w-id="c3961d69-b6c3-6f6a-ec27-615a273c9255"
          class="left-section-tittle"
        >
          <h4 class="small-sub-text">Artemas UI Kit Template</h4>
          <h1 class="section-title light">
            Our Latest Blog Posts
            <br />
          </h1>
        </div>
        <div>
          <div
            data-animation="slide"
            data-duration="500"
            data-infinite="1"
            class="blog-slider w-slider"
          >
            <div class="w-slider-mask">
              <div class="blog-slider w-slide">
                <div class="w-dyn-list">
                  <div role="list" class="w-dyn-items w-row">
                    <div
                      role="listitem"
                      class="blog-collection w-dyn-item w-col w-col-4"
                    >
                      <div class="blog-wrapper-card centered">
                        <div class="top-yellow"></div>
                        <a class="link-blog-image centerd-style w-inline-block">
                          <div class="blog-image big-size">
                            <div class="categories"></div>
                          </div>
                        </a>
                        <a class="link-block w-inline-block">
                          <h1 class="blog-header all-caps"></h1>
                        </a>
                        <p></p>
                        <p class="created"></p>
                      </div>
                    </div>
                  </div>
                  <div class="w-dyn-empty">
                    <div>No items found.</div>
                  </div>
                </div>
              </div>
              <div class="blog-slider w-slide">
                <div class="w-dyn-list">
                  <div role="list" class="w-dyn-items w-row">
                    <div role="listitem" class="w-dyn-item w-col w-col-4">
                      <div class="blog-wrapper-card centered">
                        <div class="top-yellow"></div>
                        <a class="link-blog-image centerd-style w-inline-block">
                          <div class="blog-image big-size">
                            <div class="categories"></div>
                          </div>
                        </a>
                        <a class="link-block w-inline-block">
                          <h1 class="blog-header all-caps"></h1>
                        </a>
                        <p></p>
                        <p class="created"></p>
                      </div>
                    </div>
                  </div>
                  <div class="w-dyn-empty">
                    <div>No items found.</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-w-id="c3961d69-b6c3-6f6a-ec27-615a273c92a0"
              class="left-over left-arrow-blog w-slider-arrow-left"
            >
              <img
                src="images/icons8-long-arrow-left-100-1_1icons8-long-arrow-left-100-1.png"
                width="30"
                alt=""
                class="left-gray-arrow"
              />
              <img
                src="images/icons8-long-arrow-left-100-2_1icons8-long-arrow-left-100-2.png"
                width="30"
                alt=""
                class="white-left-arrow"
              />
            </div>
            <div
              data-w-id="c3961d69-b6c3-6f6a-ec27-615a273c92a3"
              class="over-right right-arrow-blog white-outline w-slider-arrow-right"
            >
              <img
                src="images/icons8-right-arrow-100-2_1icons8-right-arrow-100-2.png"
                width="30"
                alt=""
                class="white-right-arrow"
              />
              <img
                src="images/icons8-right-arrow-100-1_1icons8-right-arrow-100-1.png"
                width="30"
                alt=""
                class="right-arrow-icon"
              />
            </div>
            <div class="slide-nav-second w-slider-nav w-round"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
