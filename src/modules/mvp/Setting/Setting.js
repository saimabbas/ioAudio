import React from "react";

import { BsCheckCircle } from "react-icons/bs";
import { MdCameraAlt, MdAdd, MdCancel, MdModeEdit } from "react-icons/md";
export default function Setting() {
  return (
    <div>
      <div className="settings_mvps-tabs">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <a class="nav-link " data-toggle="pill" href="#profile">
              Profile
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="pill" href="#team-management">
              Team Management
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="pill" href="#app-notifications">
              Apps and Notifications
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="pill" href="#billing-payment">
              Billing and Payments
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="pill" href="#settings-settings">
              Settings
            </a>
          </li>
        </ul>
      </div>
      <div className="content_main_con">
        <div class="tab-content">
          <div class="tab-pane active" id="profile">
            <div className="settings_gray_box">
              <span>
                <button className=" cancel">Cancel</button>
                <button className=" save_changes">Save changes</button>
              </span>
            </div>
            <div className="profile_ultimate_content">
              <div className="profile_ultimate_content_1">
                <img
                  src="/images/rounded_picture_testimonial.png"
                  alt="rounded_picture_testimonial"
                />
                <MdCameraAlt className="profile_camera" />
              </div>
              <div className="profile_ultimate_content_2">
                <h1>MUHAMMAD SAIM ABBAS</h1>
                <p>webexhaust@gmail.com</p>
                <div className="profile_addnewemail">
                  ADD NEW EMAIL
                  <MdAdd className="profile_iconmail" />
                </div>
              </div>
              <div className="profile_ultimate_content_3">
                <h1>COMPANY NAME</h1>
                <p>webexhaust</p>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="team-management">
            <div className="settings_gray_box"></div>
            <div className="settings_ultimate_content">
              <div className="settings_ultimate_content_1">
                <span>
                  <h1>LIST OF MEMBERS</h1>
                </span>
                <div className="set_set_lines">
                  <p>Lexicon 01</p>
                  <div>
                    <MdCancel className="set-set-icon" />
                  </div>
                </div>
                <div className="set_set_lines">
                  <p>Lexicon 01</p>
                  <div>
                    <MdCancel className="set-set-icon" />
                  </div>
                </div>
                <div className="set_set_lines">
                  <p>Lexicon 01</p>
                  <div>
                    <MdCancel className="set-set-icon" />
                  </div>
                </div>
                <div className="set_set_lines">
                  <p>Lexicon 01</p>
                  <div>
                    <MdCancel className="set-set-icon" />
                  </div>
                </div>
                <div className="set_set_lines">
                  <p>Lexicon 01</p>
                  <div>
                    <MdCancel className="set-set-icon" />
                  </div>
                </div>
              </div>
              <div className="settings_ultimate_content_2">
                <h1>INVITE NEW MEMBERS</h1>
                <input type="text" placeholder="Enter the email" />
                <button>Send an invite</button>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="app-notifications">
            <div className="settings_gray_box"></div>
            <div className="settings_ultimate_content abc_idk">
              <h1>PREFERNCES</h1>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="switch1"
                />
                <label className="custom-control-label" for="switch1">
                  News regarding ioAudio updates
                </label>
              </div>
              <div className="custom-control custom-switch">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="switch2"
                />
                <label className="custom-control-label" for="switch2">
                  Emails about invites to collaborate on threads, and update to
                  threads
                </label>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="billing-payment">
            <div className="settings_gray_box"></div>
            <div className="billing_ultimate_content">
              <div className="billing_ultimate_content_1">
                <h1>CURRENT SUBSCRIPTION</h1>
                <div className="billing_status_mvsp">
                  Premuim Plan
                  <BsCheckCircle className="bstmicon" />
                </div>
                <button>CHANGE PLAN</button>
              </div>
              <div className="billing_ultimate_content_2">
                <h1>BILLING INFORMATION</h1>
                <div className="billing_lines">
                  <p>Billing Address</p>
                  <p>Street Number 45632</p>
                  <p>State Number</p>
                  <p>Postcode Number</p>
                  <p>Country</p>
                </div>
                <button>UPDATE</button>
              </div>
              <div className="billing_ultimate_content_3">
                <h1>CREDIT CARD</h1>
                <div className="billing_lines">
                  <p>Billing Address</p>
                  <p>Street Number 45632</p>
                  <p>State Number</p>
                  <p>Postcode Number</p>
                  <p>Country</p>
                </div>
                <button>UPDATE</button>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="settings-settings">
            <div className="settings_gray_box"></div>
            <div className="settings_ultimate_content">
              <div className="settings_ultimate_content_1">
                <span>
                  <h1>LIST OF LEXICONS</h1>
                  <button>
                    <MdAdd className="abc_btn_set" /> Add Laxicons
                  </button>
                </span>
                <div className="set_set_lines">
                  <p>Lexicon 01</p>
                  <div>
                    <MdModeEdit className="set-set-icon" />
                    <MdCancel className="set-set-icon" />
                  </div>
                </div>
                <div className="set_set_lines">
                  <p>Lexicon 01</p>
                  <div>
                    <MdModeEdit className="set-set-icon" />
                    <MdCancel className="set-set-icon" />
                  </div>
                </div>
                <div className="set_set_lines">
                  <p>Lexicon 01</p>
                  <div>
                    <MdModeEdit className="set-set-icon" />
                    <MdCancel className="set-set-icon" />
                  </div>
                </div>
                <div className="set_set_lines">
                  <p>Lexicon 01</p>
                  <div>
                    <MdModeEdit className="set-set-icon" />
                    <MdCancel className="set-set-icon" />
                  </div>
                </div>
                <div className="set_set_lines">
                  <p>Lexicon 01</p>
                  <div>
                    <MdModeEdit className="set-set-icon" />
                    <MdCancel className="set-set-icon" />
                  </div>
                </div>
              </div>
              <div className="settings_ultimate_content_2">
                <h1>APPLY TEMPLATES</h1>
                <span className="set-ul-active">
                  <p>Apply enterprise templates</p>{" "}
                  <BsCheckCircle className="BsCheckCircle" />
                </span>
                <span>
                  <p>Apply health templates</p>
                </span>
                <span>
                  <p>Apply government templates</p>
                </span>
              </div>
              <div className="settings_ultimate_content_2">
                <h1>SPEECH MARKS</h1>
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="switch3"
                  />
                  <label className="custom-control-label" for="switch3"></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
