import {
  PageHeader,
  Menu,
  Dropdown,
  Button,
  Row,
  Col,
  Avatar,
  Image,
  Popover,
  Tooltip,
  Typography,
} from "antd";
import {
  EllipsisOutlined,
  MenuUnfoldOutlined,
  QuestionCircleTwoTone,
  SettingTwoTone,
  BellFilled,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
// import "./style.css";
import React, { useState, useEffect } from "react";
import { style } from "./HeaderMvp";
import "./style.css";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";

import { getNotification } from "../../../serviceApi/getNotification";
import { ReponseOnInviteNotication } from "../../../serviceApi/inviteNotificationActione";
import { Alerterror } from "../../../utils/appAlert/AppAlert";
import CreateThreadModal from "../createThreadModal/CreateThreadModal";
import { socketCleint } from "../../../config/socket/socketConfig";
import { SocketEvent } from "../../../utils/socketEvents/socketEmits";
import { ClevertapReact } from "../../../utils/clevertap/clevertap";
import { UserPool } from "../../../config/userPool/UserPoll";
import { DeleteUser } from "../../../redux/actions/userActions/userActions";
const pusher = window.pusher;

const menu = (
  <Menu style={style.dropdown}>
    <Menu.Item>
      <MenuUnfoldOutlined style={style.menuText} />
      <span style={style.menuText}>Threads</span>
    </Menu.Item>
    <Menu.Item>
      <MenuUnfoldOutlined style={style.menuText} />
      <span style={style.menuText}>PlayList</span>
    </Menu.Item>
    <Menu.Item>
      <MenuUnfoldOutlined style={style.menuText} />
      <span style={style.menuText}>Archives</span>
    </Menu.Item>
    <Menu.Item>
      <MenuUnfoldOutlined style={style.menuText} />
      <span style={style.menuText}>Analytic</span>
    </Menu.Item>
    <Menu.Item>
      <MenuUnfoldOutlined style={style.menuText} />
      <span style={style.menuText}>integrations</span>
    </Menu.Item>
    <Menu.Item>
      <MenuUnfoldOutlined style={style.menuText} />
      <span style={style.menuText}>PlayList</span>
    </Menu.Item>
  </Menu>
);

const AppHeader = ({
  headerTabs,
  sethaderTab,
  selectedTab,
  setselectedHeader,
  allThreadsLength,
  activeThread,
}) => {
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
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });

  // const content = (notifications) => (
  //   <div
  //     style={{
  //       maxHeight: "500px",
  //       overflow: "auto",
  //       width: "350px",
  //       overflowX: "hidden",
  //     }}
  //   >
  //     {notifications && notifications.length > 0 ? (
  //       notifications.map((value, key) => {
  //         return (
  //           <div>
  //             {value.noticationType === "thread_Invitation" && (
  //               <Row
  //                 key={key}
  //                 justify="center"
  //                 style={{
  //                   border: "1px solid gray",
  //                   marginBottom: "5px",
  //                   padding: "5px",
  //                 }}
  //                 wrap={true}
  //                 align="middle"
  //                 gutter={[16, 16]}
  //               >
  //                 <Col span={24}>{value.title}</Col>
  //                 {value.userAction === "" ? (
  //                   <Row
  //                     justify="center"
  //                     style={{ width: "100%" }}
  //                     wrap={true}
  //                     align="middle"
  //                     gutter={[16, 16]}
  //                   >
  //                     {" "}
  //                     <Col span={12}>
  //                       <Button
  //                         onClick={() => onInviteButtonClick(value, "rejected")}
  //                         disabled={DisableButton}
  //                         style={{ width: "100%" }}
  //                       >
  //                         Reject
  //                       </Button>
  //                     </Col>
  //                     <Col span={12}>
  //                       <Button
  //                         onClick={() => onInviteButtonClick(value, "accepted")}
  //                         disabled={DisableButton}
  //                         style={{ width: "100%" }}
  //                         type={"primary"}
  //                       >
  //                         accept
  //                       </Button>
  //                     </Col>
  //                   </Row>
  //                 ) : (
  //                   <Col span={24}>
  //                     <Button style={{ width: "100%" }} type={"primary"}>
  //                       {value.userAction}
  //                     </Button>
  //                   </Col>
  //                 )}
  //               </Row>
  //             )}
  //           </div>
  //         );
  //       })
  //     ) : (
  //       <Row>No Nofication yet</Row>
  //     )}
  //   </div>
  // );
  // hi there
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
    <>
      {isDesktopOrLaptop && (
        <div
          justify="space-between"
          style={{
            paddingTop: "10px",
            color: "white",
          }}
        >
          <Col lg={12} md={0} style={{ height: "40px" }}>
            <Row justify="start" style={{ height: "50px" }}>
              <Col sm={2} md={2}></Col>

              <Col
                sm={4}
                md={3}
                style={{
                  textAlign: "center",
                }}
              >
                <img
                  src="/images/ioAudio-logo_white.png"
                  width="100%"
                  height="50%"
                  style={{
                    marginTop: "13px",
                  }}
                  alt="iAudioIcon"
                />
              </Col>
              <Col sm={2} md={2}></Col>
              <Col
                className="abc"
                key={headerTabs[0]}
                onClick={() => setselectedHeader(headerTabs[0])}
                sm={4}
                md={4}
                lg={3}
                style={
                  headerTabs[0] === selectedTab
                    ? style.selectedCol
                    : style.colStyle
                }
              >
                <div
                  style={
                    headerTabs[0] === selectedTab
                      ? style.selectedCol
                      : style.colStyle
                  }
                >
                  <MenuUnfoldOutlined
                    style={
                      headerTabs[0] === selectedTab ? style.selectedIcon : {}
                    }
                  />
                  <span
                    style={
                      headerTabs[0] === selectedTab
                        ? style.selectedSpan
                        : style.span
                    }
                  >
                    Threads
                  </span>
                </div>
              </Col>
              <Col
                key={headerTabs[1]}
                onClick={() => setselectedHeader(headerTabs[1])}
                sm={4}
                md={4}
                lg={3}
                style={
                  headerTabs[1] === selectedTab
                    ? style.selectedCol
                    : style.colStyle
                }
              >
                <MenuUnfoldOutlined
                  style={
                    headerTabs[1] === selectedTab ? style.selectedIcon : {}
                  }
                />
                <span
                  style={
                    headerTabs[1] === selectedTab
                      ? style.selectedSpan
                      : style.span
                  }
                >
                  PlayList
                </span>
              </Col>
              <Col
                key={headerTabs[2]}
                onClick={() => setselectedHeader(headerTabs[2])}
                sm={4}
                md={4}
                lg={3}
                style={
                  headerTabs[2] === selectedTab
                    ? style.selectedCol
                    : style.colStyle
                }
              >
                <MenuUnfoldOutlined
                  style={
                    headerTabs[2] === selectedTab ? style.selectedIcon : {}
                  }
                />
                <span
                  style={
                    headerTabs[2] === selectedTab
                      ? style.selectedSpan
                      : style.span
                  }
                >
                  Archives
                </span>
              </Col>
              <Col
                key={headerTabs[3]}
                onClick={() => setselectedHeader(headerTabs[3])}
                sm={4}
                md={4}
                lg={3}
                style={
                  headerTabs[3] === selectedTab
                    ? style.selectedCol
                    : style.colStyle
                }
              >
                <BarChartOutlined
                  style={
                    headerTabs[3] === selectedTab ? style.selectedIcon : {}
                  }
                />
                <span
                  style={
                    headerTabs[3] === selectedTab
                      ? style.selectedSpan
                      : style.span
                  }
                >
                  Analytic
                </span>
              </Col>
              <Col
                key={headerTabs[4]}
                onClick={() => setselectedHeader(headerTabs[4])}
                sm={4}
                md={4}
                lg={3}
                style={
                  headerTabs[4] === selectedTab
                    ? style.selectedCol
                    : style.colStyle
                }
              >
                <MenuUnfoldOutlined
                  style={
                    headerTabs[4] === selectedTab ? style.selectedIcon : {}
                  }
                />
                <span
                  style={
                    headerTabs[4] === selectedTab
                      ? style.selectedSpan
                      : style.span
                  }
                >
                  Integrations
                </span>
              </Col>
            </Row>
          </Col>
          <Col lg={12} md={24}>
            <Row
              justify="end"
              style={{ paddingBottom: "6px", paddingLeft: "100px" }}
            >
              <Col style={style.colStyle}>
                <Row justify="end">
                  <Col
                    style={{
                      // display: 'flex',
                      // justifyContent: "end",
                      position: "relative",
                      top: "-10px",
                    }}
                    sm={2}
                    md={3}
                    lg={2}
                    style={style.center}
                  >
                    {/* <Popover
                      onVisibleChange={onVisibleChange}
                      content={content(notifications)}
                      title="Nofication Center"
                    > */}
                    <Tooltip
                      color="white"
                      key="black"
                      visible={toolTip}
                      placement="top"
                      onClick={modalOpen}
                      title={notificationCount}
                    >
                      <BellFilled />
                    </Tooltip>
                    {/* </Popover> */}
                  </Col>
                  <Col
                    style={{
                      // display: 'flex',
                      // justifyContent: "end",
                      position: "relative",
                      top: "-10px",
                    }}
                    sm={8}
                    md={3}
                    lg={3}
                    style={style.center}
                  >
                    <span>Angela</span>
                  </Col>
                  <Col
                    sm={4}
                    md={3}
                    style={{
                      // display: 'flex',
                      justifyContent: "end",
                      position: "relative",
                      top: "-10px",
                    }}
                  >
                    <Avatar
                      src={
                        <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                    />
                  </Col>
                </Row>
                <Row
                  justify="end"
                  style={{
                    paddingBottom: "6px",
                    position: "relative",
                    top: "-10px",
                    paddingLeft: "100px",
                  }}
                >
                  <Col sm={6} md={6} lg={5} style={style.text}>
                    Free Plan
                  </Col>
                  <Col sm={7} md={6} lg={6} style={style.text}>
                    {allThreadsLength ? allThreadsLength : 0} of 10 Threads
                  </Col>
                  <Col sm={11} md={10} lg={8} style={style.LastText}>
                    {activeThread.threadRelated
                      ? activeThread.threadRelated.length
                      : 0}{" "}
                    of 10 Collaborators
                  </Col>
                </Row>
              </Col>

              <Col sm={8} md={2} lg={3} xl={3} style={style.colStyle}>
                <SettingTwoTone />
                <span style={style.span}>Settings</span>
              </Col>
              <Col sm={8} md={2} lg={3} xl={3} style={style.colStyle}>
                <QuestionCircleTwoTone height="6em" />
                <span style={style.span}>Help</span>
              </Col>
              <Col
                onClick={logoutMe}
                sm={8}
                md={2}
                lg={3}
                xl={3}
                style={style.colStyle}
              >
                <LogoutOutlined height="6em" />
                <span style={style.span}>logout</span>
              </Col>
              <Col lg={1}></Col>
            </Row>
          </Col>
        </div>
      )}
      {!isDesktopOrLaptop && (
        <Row
          justify="space-between"
          style={{
            paddingTop: "10px",
            color: "white",
          }}
        >
          <Col span={10}>
            <Row justify="start">
              <Col sm={1} md={1} lg={1}></Col>
              <Col
                sm={7}
                md={4}
                style={{
                  textAlign: "center",
                }}
              >
                {" "}
                <img
                  src="/images/ioAudio-logo_transparent1-p-1600.png"
                  width="100%"
                  height="60%"
                  alt="iAudioIcon"
                />
              </Col>
            </Row>
          </Col>

          <Col span={12}>
            <Row justify="end">
              <Col sm={18} md={18} lg={18} style={style.colStyle}>
                <Row justify="end">
                  <Col sm={4} md={4} lg={2} style={style.center}>
                    <span>Angela</span>
                  </Col>
                  <Col
                    sm={4}
                    md={4}
                    lg={3}
                    style={{
                      // display: 'flex',
                      justifyContent: "end",
                    }}
                  >
                    <Avatar
                      src={
                        <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                    />
                  </Col>
                </Row>
              </Col>
              <Col sm={4} md={3} lg={2} style={style.colStyle}>
                <Dropdown key="more" overlay={menu}>
                  <Button
                    style={{
                      border: "none",
                      padding: 0,
                    }}
                  >
                    <EllipsisOutlined
                      style={{
                        fontSize: 20,
                        verticalAlign: "top",
                      }}
                    />
                  </Button>
                </Dropdown>
              </Col>
              <Col md={1} lg={1}></Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default AppHeader;
