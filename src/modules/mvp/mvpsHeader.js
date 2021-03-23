import {
  MdReorder,
  MdPlaylistAddCheck,
  MdArchive,
  MdAssessment,
  MdCode,
  MdKeyboardTab,
  MdInfo,
  MdSettings,
  MdNotifications,
  MdSearch,
} from "react-icons/md";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";

import { ReponseOnInviteNotication } from "../../serviceApi/inviteNotificationActione";
import { Alerterror } from "../../utils/appAlert/AppAlert";
import { socketCleint } from "../../config/socket/socketConfig";
import { SocketEvent } from "../../utils/socketEvents/socketEmits";
import { ClevertapReact } from "../../utils/clevertap/clevertap";
import { UserPool } from "../../config/userPool/UserPoll";
import { DeleteUser } from "../../redux/actions/userActions/userActions";
import { getNotification } from "../../serviceApi/getNotification";
import { Row, Col, Button, Typography } from "antd";
import CreateThreadModal from "./createThreadModal/CreateThreadModal";
const pusher = window.pusher;

function MvpsHeader({ setselectedHeader, selectedTab }) {
  let { user: auth } = useSelector((state) => state.userReducer);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 992px)",
  });
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setnotificationCount] = useState(0);
  const [toolTip, settoolTip] = useState(false);
  const [DisableButton, setDisableButton] = useState(false);
  const [notificationCome, setnotificationCome] = useState({});
  var channel = pusher.subscribe(auth.email);
  const [isModalVisible, setisModalVisible] = useState(false);
  const onInviteButtonClick = async (thread, userAction, isModalOpen) => {
    setDisableButton(true);
    try {
      let payload = {
        createdAt: thread.createdAt,
        userAction,
        threadCreatedAt: thread.threadCreatedAt,
        threadId: thread.threadId,
        sender: thread.sender,
      };
      const response = await ReponseOnInviteNotication(payload, auth.idToken);
      if (isModalOpen) {
        setisModalVisible(false);
      }
      console.log(response.data.data.data);
      const { createdAt, userAction: userAc } = response.data.data.data;
      const toChangeNotication = [...notifications];
      const item = toChangeNotication.find(
        (value) => value.createdAt === createdAt
      );
      item.userAction = userAc;
      if (userAc == "accepted") {
        socketCleint.emit(
          SocketEvent.CREATE_THREAD,
          { threadId: thread.threadId },
          () => {
            console.log("created");
          }
        );
      }
      setNotifications(toChangeNotication);
    } catch (err) {
      console.log(err);
      Alerterror(err.response.data.response.msg);
    } finally {
      setDisableButton(false);
    }
  };

  const onVisibleChange = () => {
    settoolTip(false);
  };
  const modalOpen = () => {
    setisModalVisible(true);
    settoolTip(false);
  };
  useEffect(() => {
    async function getNoticationsFetch() {
      try {
        const response = await getNotification(auth.idToken);
        let {
          data: {
            data: { data },
          },
        } = response;
        // data = data.reverse();

        setNotifications([...data]);
        if (data.length !== 0) {
          settoolTip(true);
        }
        setnotificationCount(data.length);
      } catch (err) {
        console.log(err);
      }
    }

    channel.bind("newNotication", function (data) {
      setnotificationCount(notificationCount + 1);
      setNotifications([...notifications, { ...data.notication }]);
      setnotificationCome(data.notication);
      setisModalVisible(true);
      settoolTip(true);
    });
    setTimeout(() => {
      getNoticationsFetch();
    }, 1000);
  }, 1);
  const dispatch = useDispatch();
  const logoutMe = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
      socketCleint.disconnect();
    }
    dispatch(DeleteUser());
    ClevertapReact.logout();
  };
  return (
    <div className="header_main_con">
      <CreateThreadModal
        isModalVisible={isModalVisible}
        // showModal={showModal}
        handleOk={console.log}
        handleCancel={() => setisModalVisible(false)}
        // newThreadTile={newThreadTile}
        setnewThreadTile={console.log}
        BoxTitle="Create new Thread"
      >
        <Row gutter={[16, 16]} align="middle" justify="center">
          {/* <Col span={24}> */}

          <Typography.Title level={4}>Notifications</Typography.Title>
        </Row>
        {notifications.length ? (
          notifications.map((value, key) => {
            return (
              <div>
                {" "}
                {value.userAction === "" && (
                  <div>
                    <Row gutter={[16, 16]} align="middle" justify="center">
                      <Typography.Title level={4}>
                        {value.title}
                      </Typography.Title>
                      {/* </Col> */}
                    </Row>

                    <Row gutter={[16, 16]} align="middle" justify="center">
                      <Col span={24}>
                        <Row type="flex" justify="space-around" align="middle">
                          <Col span={8}>
                            <Button
                              onClick={() =>
                                onInviteButtonClick(value, "rejected", true)
                              }
                              style={{ width: "100%" }}
                              disabled={DisableButton}
                            >
                              Reject Invite
                            </Button>
                          </Col>
                          <Col span={8}>
                            <Button
                              style={{ width: "100%" }}
                              type={"primary"}
                              disabled={DisableButton}
                              onClick={() =>
                                onInviteButtonClick(value, "accepted", true)
                              }
                            >
                              Accept Invite
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <Row gutter={[16, 16]} align="middle" justify="center">
            {/* <Col span={24}> */}

            <Typography.Text>Not Any Notifications</Typography.Text>
          </Row>
        )}
        <Row
          // gutter={[16, 16]}
          align="middle"
          justify="center"
          style={{
            backgroundColor: "lightgray",
            maxHeight: "100px",
            borderBottomRightRadius: "20px",
            borderBottomLeftRadius: "20px",

            overflow: "auto",
            overflowX: "hidden",
          }}
        >
          {notifications.length ? (
            notifications.map((value, key) => {
              return (
                <div>
                  {" "}
                  {value.userAction === "rejected" && (
                    <div>
                      <Row gutter={[16, 16]} align="middle" justify="center">
                        <Typography.Text style={{ fontSize: "10px" }}>
                          You {value.userAction} a thread invite from{" "}
                          {value.title.split(" ")[0]} for
                          {value.title.slice(
                            value.title.indexOf("on ") + 3
                          )}{" "}
                        </Typography.Text>
                        {/* </Col> */}
                      </Row>
                    </div>
                  )}
                  {value.userAction === "accepted" && (
                    <div>
                      <Row gutter={[16, 16]} align="middle" justify="center">
                        <Typography.Text style={{ fontSize: "10px" }}>
                          {" "}
                          You {value.userAction} an invite from{" "}
                          {value.title.split(" ")[0]} to collaborate on
                          {value.title.slice(
                            value.title.indexOf("on ") + 3
                          )}{" "}
                        </Typography.Text>
                        {/* </Col> */}
                      </Row>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <Row gutter={[16, 16]} align="middle" justify="center">
              {/* <Col span={24}> */}

              <Typography.Text>Not Any Notifications</Typography.Text>
            </Row>
          )}
        </Row>
      </CreateThreadModal>
      <div className="header_mvps_con">
        <div className="header_mvps">
          <img className="logoio_h" src="/images/logoio.png" alt="logo" />
          <ul class="nav nav-pills">
            <li
              onClick={() => {
                setselectedHeader("threadDashboard");
              }}
              class="nav-item"
            >
              <a
                // class={
                //   selectedTab === "threadDashboard"
                //     ? "nav-link active"
                //     : "nav-link fade"
                // }
                className="nav-link active"
                data-toggle="pill"
                href="#threadDashboard"
              >
                <MdReorder className="mvps_h_icons" />
                Threads
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="pill" href="#playlists">
                <MdPlaylistAddCheck className="mvps_h_icons" />
                Platlists
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="pill" href="#archieves">
                <MdArchive className="mvps_h_icons" />
                Archieves
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="pill" href="#analytics">
                <MdAssessment className="mvps_h_icons" />
                Analytics
              </a>
            </li>
            <li
              onClick={() => {
                setselectedHeader("integrations");
              }}
              class="nav-item"
            >
              <a
                // class={
                //   selectedTab === "integrations"
                //     ? "nav-link active"
                //     : "nav-link fade"
                // }
                class="nav-link fade"
                data-toggle="pill"
                href="#integrations"
              >
                <MdCode className="mvps_h_icons" />
                Integrations
              </a>
            </li>
          </ul>
        </div>
        <div className="header_mvps_2">
          <span>
            <div onClick={modalOpen} className="header_pic_name">
              <MdNotifications className="mvps_h_icon" />
              <span>Saim Abbas</span>
              <img
                src="/images/rounded_picture_testimonial.png"
                alt="rounded_picture_testimonial"
              />
            </div>
            <div className="plan_status_info">
              <p>Premium Plan</p>
              <p>|</p>
              <p>3 of 10 Threads</p>
              <p>|</p>
              <p>7 of 10 Collaborators</p>
            </div>
          </span>
          <ul class="nav nav-pills">
            <li
              onClick={() => {
                setselectedHeader("settings");
              }}
              class="nav-item"
            >
              <a
                // class={
                //   selectedTab === "settings" ? "nav-link active" : "nav-link fade"
                // }
                className="nav-link fade"
                data-toggle="pill"
                href="#settings"
              >
                <MdSettings className="mvps_h_icons" />
                Settings
              </a>
            </li>
            <li
              onClick={() => {
                setselectedHeader("help");
              }}
              class="nav-item"
            >
              <a
                // class={
                //   selectedTab === "help" ? "nav-link active" : "nav-link fade"
                // }
                className="nav-link fade"
                data-toggle="pill"
                href="#help"
              >
                <MdInfo className="mvps_h_icons" />
                Help
              </a>
            </li>
          </ul>
          <button onClick={logoutMe}>
            <MdKeyboardTab className="mvps_h_icons" />
            Logout
          </button>
        </div>
      </div>
      <div className="mvps_search_bar">
        <MdSearch className="search_icon_mvps" />
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
}

export default MvpsHeader;
