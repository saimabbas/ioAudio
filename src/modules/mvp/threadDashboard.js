import { Button, Col, Row, Input, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserPool } from "../../config/userPool/UserPoll";
import { DeleteUser } from "../../redux/actions/userActions/userActions";
import AudioPlayer from "./AudioPlayer/AudioPlayer";
// import MvpHeader from "./MvpHeader/MvpHeader";
import TextBox from "./TextBox/TextBox";
import {
  Alerterror,
  Alertsuccess,
  Alertwarning,
} from "../../utils/appAlert/AppAlert";
import "./mvp.css";
import MessageList from "./messageList/messageList";
import { fetchThreads } from "../../serviceApi/fetchThread";
import { AddThread } from "../../redux/actions/threadsAction/threadAction";
import { sendSmsForVoice } from "../../serviceApi/sendSMS";
import Skeleton from "react-loading-skeleton";
import { SearchOutlined } from "@ant-design/icons";
import ChatHeader from "./chatHeader/ChatHeader";
import Threads from "./Thread/threads";
import axios from "axios";
import CalenderSideBar from "./CalenderSideBar/CalenderSideBar";
import AppHeader from "./HeaderMVP/HeaderMvpComponent";
import { createThread } from "../../serviceApi/createThread";
import { SendInvite } from "../../serviceApi/sendInvite";
import { PlusOutlined } from "@ant-design/icons";
import CreateThreadModal from "./createThreadModal/CreateThreadModal";
import TextInput from "../../utils/inputs/TextInput";
import { getChatOfSingleThread } from "../../serviceApi/getChatOfThread";
import { emailPattern } from "../../utils/emailPatern/emailPatern";
import Password from "antd/lib/input/Password";
import { ClevertapReact } from "../../utils/clevertap/clevertap";
import { socketCleint } from "../../config/socket/socketConfig";
import { SocketEvent } from "../../utils/socketEvents/socketEmits";
import Integration from "../integration/Integration";
import {
  getNylasContacts,
  getNylasEvents,
} from "../../serviceApi/nylasService";
import { MdAdd } from "react-icons/md";

const pusher = window.pusher;

const prefix = (
  <SearchOutlined
    style={{
      fontSize: 10,
      color: "#1890ff",
    }}
  />
);
export default function Mvp(props) {
  let { user: auth } = useSelector((state) => state.userReducer);

  let [featch, setfetach] = useState();
  let [overAllLoading, setOverAllLoading] = useState(false);
  const [headerTabs, setheaderTab] = useState([
    "Threads",
    "PlayList",
    "Archives",
    "Analytic",
    "Integrations",
  ]);
  const [selectedTab, setselectedHeader] = useState("Threads");
  const [getChatOfUserLoading, setgetChatOfUserLoading] = useState(false);
  let [activeThread, setActiveThread] = useState({});
  const activeThreadRef = React.useRef(activeThread);

  let [threads, setThreads] = useState([]);
  const [chat, AppendChat] = useState([]);
  //contacts from nylas integrated account
  const [nylasContacts, setNylasContacts] = useState([]);
  //events from nylas integrated account
  const [nylasEvents, setNylasEvents] = useState([]);

  const chatRef = React.useRef(chat);

  const threadsRef = React.useRef(threads);
  React.useEffect(() => {
    // This effect executes on every render (no dependency array specified).
    // Any change to the "participants" state will trigger a re-render
    // which will then cause this effect to capture the current "participants"
    // value in "participantsRef.current".
    activeThreadRef.current = activeThread;
    threadsRef.current = threads;
    chatRef.current = chat;
  });

  //Effect to get nylas integrated contacts
  useEffect(() => {
    async function fetchNylasContacts() {
      try {
        const response = await getNylasContacts(
          { accessToken: auth["custom:accessToken"] },
          auth.idToken
        );
        setNylasContacts(response.data.data);

        console.log("Contacts response", response.data.data);
      } catch (error) {
        console.log("Error fetching nylas contacts");
      }
    }
    if (auth.hasOwnProperty("custom:accessToken")) {
      fetchNylasContacts();
    }
  }, [auth.idToken]);

  //Effect to get nylas integrated events
  useEffect(() => {
    async function fetchNylasEvents() {
      try {
        const response = await getNylasEvents(
          { accessToken: auth["custom:accessToken"] },
          auth.idToken
        );
        setNylasEvents(response.data.data);
        console.log("Events response", response.data.data);
      } catch (error) {
        console.log("Error fetching nylas contacts");
      }
    }
    if (auth.hasOwnProperty("custom:accessToken")) {
      fetchNylasEvents();
    }
  }, [auth.idToken]);

  const [newThreadTile, setnewThreadTile] = useState("");
  const [newThreadTileHelp, setnewThreadTileHelp] = useState("");
  const [audioUrl, setaudioUrl] = useState("");
  const [newThreadLoad, setNewThreadLoad] = useState(false);
  const [message, changeSms] = useState(
    "Some Sample Text. Are you planning to launch this week? Here is the beta version for you.I"
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
  const [invitedEmail, setInvitedEmail] = useState("");

  const [helpInvitedEmail, setHelpInvitedEmail] = useState("");
  const [threadWantToShare, setThreadWantToShare] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };
  const [threadCreatedAt, setThreadWantToBeShareCreatedAt] = useState(0);
  const [threadUserContain, setThreadUserContain] = useState([]);
  const [inviteThreadTitle, setInviteThreadTitle] = useState("");

  const showModalInvite = (e, threadId, threadCreatedAt, user, title) => {
    e.stopPropagation();
    setThreadWantToShare(threadId);
    setInviteThreadTitle(title);
    setThreadWantToBeShareCreatedAt(threadCreatedAt);
    setThreadUserContain(user);
    setIsInviteModalVisible(true);
  };
  const handleOk = (e) => {
    e.preventDefault();
    if (newThreadTile == "") {
      setnewThreadTileHelp("Please enter the title");
      return;
    }

    createNewThread();
  };

  const handleOkForInvite = async (e) => {
    e.preventDefault();

    if (invitedEmail == "") {
      setHelpInvitedEmail("Please enter the email");
      return;
    }
    if (!emailPattern.test(invitedEmail)) {
      setHelpInvitedEmail("Please enter the valid email");
      return;
    }
    if (threadUserContain.indexOf(invitedEmail) !== -1) {
      setHelpInvitedEmail(
        "This Email is Already Exist in the Thread shared Persons"
      );
      return;
    }
    setIsInviteModalVisible(false);
    let payload = {
      threadId: threadWantToShare,
      receiver: invitedEmail,
      threadCreatedAt,
      title: `${
        auth.email.split("@")[0]
      } invite you to collaborate on ${inviteThreadTitle}.`,
      noticationType: "thread_Invitation",
    };
    // createNewThread();
    try {
      const response = await SendInvite(payload, auth.idToken);
      //send clevertap event
      ClevertapReact.event("Collaborate on a Thread", {
        "Invited User": invitedEmail,
        "Thread ID": threadWantToShare,
      });
      Alertsuccess(response.data.data.msg);
    } catch (err) {
      console.log(err);

      Alerterror(err.response.data.response.msg);
    } finally {
      setInvitedEmail("");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCancelInvite = () => {
    setIsInviteModalVisible(false);
    setHelpInvitedEmail("");
  };

  const setClevertapIdentity = (email) => {
    ClevertapReact.onUserLogin({
      Site: {
        Email: email,
      },
    });

    console.log("Set Clevertap Identity", email);
  };

  const messageHandler = (data, activeThreadClone, threadsClone, chatClone) => {
    console.log(data);
    // let activeThreadClone = activeThreadRef.current;
    if (data.threadId === activeThreadClone.id) {
      activeThreadClone.lastMessage = data.textString;
      setActiveThread(activeThreadClone);
      AppendChat([...chatClone, data]);
      setnowPlayNumber(chatClone.length + 1);
    } else {
      // newComes
      let threadCloned = [...threadsClone];
      const thread = threadCloned.find((value) => value.id === data.threadId);
      if (thread) {
        if (thread.hasOwnProperty("newComes")) {
          thread.newComes += 1;
        } else {
          thread.newComes = 1;
        }
        thread.lastMessage = data.textString;

        setThreads(threadCloned);
      }
    }
    socketCleint.emit(
      SocketEvent.MESSAGE__RECIEVED,
      { received: true },
      (data) => {
        console.log("good job");
      }
    );
  };

  useEffect(() => {
    var channel = pusher.subscribe(auth.email);
    channel.bind("newThread", function (data) {
      fetchdata();
    });

    async function fetchdata() {
      try {
        setOverAllLoading(true);
        console.log(auth);
        const response = await fetchThreads(auth.idToken);
        let {
          data: {
            data: { data },
          },
        } = response;
        let sms = data.find((value) => value.active === true);
        console.log(data);
        console.log(sms);
        data = [...data].reverse();
        setActiveThread(sms);
        AppendChat([...sms.smsReference]);
        setThreads(data);
        // setaudioUrl(
        //   sms.smsReference.length ? sms.smsReference[0].audioUrl : ""
        // );
        setaudioUrl("");
        setOverAllLoading(false);
        //set identity
        setClevertapIdentity(auth.email);
        console.log(data);
      } catch (err) {
        setOverAllLoading(false);

        console.log(err);
      }
    }
    setTimeout(() => {
      fetchdata();
    }, 1000);
    const handler = (message) => {
      debugger;
      messageHandler(
        message,
        activeThreadRef.current,
        threadsRef.current,
        chatRef.current
      );
    };

    socketCleint.on(SocketEvent.MESSAGE_WILL_RECIEVED, handler);

    // return () => {
    //   socketCleint.off(SocketEvent.MESSAGE_WILL_RECIEVED, handler);
    // };
  }, [featch]);
  const onSetUrl = (url) => {
    setaudioUrl(url);
  };
  const [loading, setLoading] = useState(false);
  const messageSend = (meassage) => {
    AppendChat([...meassage]);
  };
  const oneMessageSend = (oneMessage) => {
    AppendChat([...chat, oneMessage]);
    setnowPlayNumber(chat.length);
  };
  const changeTextoVoice = async (file, e) => {
    if (e) {
      e.preventDefault();
    }
    if (message.trim() == "" && !file) {
      return Alerterror("Please inter some text");
    }
    // let obj = {
    //   textString: message,
    //   msgType: "text",
    //   threadId: activeThread.id,
    // };

    setLoading(true);
    var newForm = new FormData(); // $('#mvp_form').serialize();
    newForm.append("textString", message);
    newForm.append("threadId", activeThread.id);
    newForm.append("threadCreatedDate", activeThread.createdAt);

    newForm.append("msgType", "text");
    if (file) {
      newForm.append("file", file);
    }

    try {
      const response = await sendSmsForVoice(newForm, auth.idToken);
      console.log(response);
      oneMessageSend(response.data.data.data);
      setaudioUrl(response.data.data.data.audioUrl);
      socketCleint.emit(
        SocketEvent.MESSAGE_SEND,
        { message: response.data.data.data },
        (data) => {
          console.log("data is sended");
        }
      );
      //send clevertap event
      ClevertapReact.event("Add New Content");
    } catch (err) {
      console.log(err);
      Alerterror("your request connot me proceed Please try again");
    }
    setLoading(false);
    changeSms("");
    console.log(message);
  };

  const readFile = (file) => {
    let reader = new FileReader();
    setLoading(true);

    reader.readAsText(file);

    reader.onload = function () {
      docTextoVoice(reader.result, file);
    };

    reader.onerror = function () {
      setLoading(false);
    };
  };
  const onLoad = (event) => {
    console.log(event.target.files);
    var file = event.target.files[0];
    // var data = new FormData();
    const array = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    if (array.includes(file.type)) {
      return changeTextoVoice(file);
    }
    var docxType =
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    var docType = "application/msword";
    if (file.type == docType) {
      return process_word("doc", file);
    } else if (file.type == docxType) {
      return process_word("docx", file);
    }
    if (file.type === "text/plain") {
      return readFile(file);
    }
    //send clevertap event
    ClevertapReact.event("Add New Content", {
      "File Type": file.type,
    });
    Alerterror("This type of file does not support yet");
  };

  const process_word = async (docType, file) => {
    var data = new FormData(); // $('#mvp_form').serialize();
    // data = $("#mvp_form").serializeArray();
    data.append("word", file);
    setLoading(true);
    data.append("docType", docType);

    console.log(data);
    try {
      const response = await axios.post(
        "https://ioaudio.codiro.co/public/api/upload-doc",
        data
      );
      console.log(response);
      console.log(response.data);
      docTextoVoice(response.data.text, file);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const createNewThread = async () => {
    try {
      setNewThreadLoad(true);
      console.log(auth);
      const response = await createThread(
        { title: newThreadTile },
        auth.idToken
      );
      const {
        data: {
          data: { data },
        },
      } = response;
      console.log(data);
      //send clevertap event
      ClevertapReact.event("Create New Thread", {
        title: newThreadTile,
      });
      // AppendChat([]);
      // setActiveThread(data);
      setThreads([data, ...threads]);
      socketCleint.emit(
        SocketEvent.CREATE_THREAD,
        { threadId: data.id },
        () => {
          console.log("created");
        }
      );
      // setaudioUrl("");
      setnewThreadTile("");
      //
    } catch (err) {
      console.log(err);
      Alerterror(err.response.data.response.msg);
    } finally {
      setNewThreadLoad(false);
      setIsModalVisible(false);
    }
  };
  const setAudioUrlWhenFromStat = () => {
    setaudioUrl(chat.length ? chat[0].audioUrl : "");
  };
  const docTextoVoice = async (text, file) => {
    setLoading(true);
    debugger;
    var newForm = new FormData(); // $('#mvp_form').serialize();
    newForm.append("textString", text);
    newForm.append("threadId", activeThread.id);
    newForm.append("threadCreatedDate", activeThread.createdAt);
    newForm.append("msgType", "file");
    newForm.append("textConvetedAlready", true);

    if (file) {
      newForm.append("file", file);
    }
    try {
      const response = await sendSmsForVoice(newForm, auth.idToken);
      console.log(response);
      oneMessageSend(response.data.data.data);
      socketCleint.emit(
        SocketEvent.MESSAGE_SEND,
        { message: response.data.data.data },
        (data) => {
          console.log("data is sended");
        }
      );
      setaudioUrl(response.data.data.data.audioUrl);
    } catch (err) {
      console.log(err);
      Alerterror("your request connot me proceed Please try again");
    }
    setLoading(false);
    changeSms("");
    console.log(message);
  };
  const setActiveThreadAndChangeSms = async (thread) => {
    if (getChatOfUserLoading) {
      Alertwarning("Please waite due the pending threads Fething");
      return;
    }
    console.log(threads, "active");
    let seletedThread = threads.find((value) => value.id === thread.id);
    console.log(seletedThread);
    try {
      setgetChatOfUserLoading(true);
      console.log(auth);
      const response = await getChatOfSingleThread(
        {
          threadId: seletedThread.id,
          createdAt: seletedThread.createdAt,
          previouseSelected: activeThread,
        },
        auth.idToken
      );
      const {
        data: {
          data: { data },
        },
      } = response;
      console.log(data);
      seletedThread.newComes = 0;
      AppendChat([...data]);
      setActiveThread(seletedThread);
      setnowPlayNumber(1);
      setplayPauseTogle(false);

      setaudioUrl("");
      // data.length ? data[0].audioUrl : ""
    } catch (err) {
      console.log(err);
      Alerterror(err.response.data.response.msg);
    } finally {
      setgetChatOfUserLoading(false);
    }
  };
  const [nowPlayNumber, setnowPlayNumber] = useState(1);
  const setAudioNextSrc = () => {
    try {
      setplayPauseTogle(true);
      setaudioUrl(chat.length ? chat[nowPlayNumber].audioUrl : "");
    } catch (err) {
      setaudioUrl("");
      setplayPauseTogle(false);
    }
    setnowPlayNumber(nowPlayNumber + 1);
  };
  const [playPauseTogle, setplayPauseTogle] = useState(false);
  const onStartPlay = (e, thread) => {
    if (activeThread.id !== thread.id) {
      return Alertwarning("First open the thread to Play it");
    }
    e.stopPropagation();
    setplayPauseTogle(true);
    setnowPlayNumber(1);
    setAudioNextSrc();
  };
  const pauseAudio = (e) => {
    e.stopPropagation();
    let player = document.getElementById("music_player");
    player.pause();
    setplayPauseTogle(false);
    document.getElementById("play_button").src = "images/play.png";
  };
  const playerThisVioce = (sms, key) => {
    setnowPlayNumber(Number(key.split("-")[0]) + 1);
    setaudioUrl(sms.audioUrl);
  };
  return (
    <div
      style={{
        height: "100%",
        position: "relative",
        backgroundColor: "white",
        backgroundColor: "rgb(248,248,255)",
      }}
    >
      <CreateThreadModal
        isModalVisible={isModalVisible}
        showModal={showModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        newThreadTile={newThreadTile}
        setnewThreadTile={setnewThreadTile}
        BoxTitle="Create new Thread"
      >
        <Row align="middle" justify="center">
          {/* <Col span={24}> */}
          <Typography.Title level={4}>Create the Thread</Typography.Title>
          {/* </Col> */}
          <Col span={20}>
            <form onSubmit={handleOk}>
              <TextInput
                type="text"
                // className="tf-sign-up-email w-input"
                maxlength="256"
                name="newThreadTile"
                value={newThreadTile}
                onChange={(e) => setnewThreadTile(e.target.value)}
                help={newThreadTileHelp}
                data-name="Email"
                placeholder="Enter the Thread Name"
                id="email"
                required=""
              />
            </form>
          </Col>
          <Col span={24}>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={8}>
                <Button onClick={handleCancel} style={{ width: "100%" }}>
                  Cancle
                </Button>
              </Col>
              <Col span={8}>
                <Button
                  loading={newThreadLoad}
                  style={{ width: "100%" }}
                  type={"primary"}
                  onClick={handleOk}
                >
                  Confirm
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </CreateThreadModal>
      <CreateThreadModal
        isModalVisible={isInviteModalVisible}
        showModal={showModalInvite}
        handleOk={handleOkForInvite}
        handleCancel={handleCancelInvite}
        setnewThreadTile={setInvitedEmail}
        newThreadLoad={newThreadLoad}
        BoxTitle="Invite the Thread"
      >
        <Row gutter={[16, 16]} align="middle" justify="center">
          {/* <Col span={24}> */}
          <Typography.Title level={4}>
            Invite someone to collaborate on this thread
          </Typography.Title>
          <Col span={20}>
            <form onSubmit={handleOkForInvite}>
              <TextInput
                type="email"
                className="tf-sign-up-email w-input"
                maxlength="256"
                name="newThreadTile"
                value={invitedEmail}
                onChange={(e) => setInvitedEmail(e.target.value)}
                help={helpInvitedEmail}
                data-name="Email"
                placeholder="Enter the Email"
                id="email"
                required=""
              />
            </form>
          </Col>
          <Col span={24}>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={8}>
                <Button onClick={handleCancelInvite} style={{ width: "100%" }}>
                  Cancle
                </Button>
              </Col>
              <Col span={8}>
                <Button
                  style={{ width: "100%" }}
                  type={"primary"}
                  onClick={handleOkForInvite}
                >
                  Invite Confrim
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </CreateThreadModal>
      {/* <Row
        style={{
          height: "7vh",
          minHeight: "60px",
          textAlign: "center",
          backgroundColor: "rgb(13 14 118)",
          color: "white",
          borderRadius: "10px",
          marginLeft: "15px",
          marginRight: "15px",
          marginTop: "2px",
          borderBottomLeftRadius: "15px",
          borderBottomRightRadius: "15px",
        }}
      > */}
      {/* <Col span={24}>
          <AppHeader
            activeThread={activeThread}
            headerTabs={headerTabs}
            allThreadsLength={threads.length}
            setheaderTab={setheaderTab}
            selectedTab={selectedTab}
            setselectedHeader={setselectedHeader}
          />
        </Col> */}
      {/* </Row> */}

      {/* {selectedTab === "Integrations" ? (
        <Integration />
      ) : ( */}
      <>
        {/* <Row style={{ margin: "10px 18px 3px 18px" }}>
            <input
              icon="search"
              className="searchtxt"
              type="text"
              placeholder="search"
            />
            {/* <Search prefix={prefix} placeholder="search" /> */}

        <Row>
          <Col
            style={{
              border: "1px solid white",
              // height: "100%",
              width: "25%",
            }}
            // flex={4}
            className="overfl"
          >
            {overAllLoading ? (
              <Skeleton count={5} />
            ) : (
              <div>
                <Row className="buttonDivRidio">
                  <Button
                    onClick={showModal}
                    type={"primary"}
                    className="create_new_thread"
                  >
                    <MdAdd className="thread-add" />
                    Create New Thread
                  </Button>
                </Row>
                <Row>
                  <Col
                    style={{
                      overflow: "auto",
                    }}
                    flex={1}
                  >
                    <Threads
                      auth={auth}
                      onStartPlay={onStartPlay}
                      playPauseTogle={playPauseTogle}
                      pauseAudio={pauseAudio}
                      setActiveThread={setActiveThreadAndChangeSms}
                      activeThread={activeThread}
                      threads={threads}
                      showModalInvite={showModalInvite}
                      getChatOfUserLoading={getChatOfUserLoading}
                    />
                  </Col>
                </Row>
              </div>
            )}
          </Col>
          <Col style={{ width: "50%" }} className="overfl">
            <ChatHeader activeThread={activeThread} />

            <AudioPlayer
              setAudioUrlWhenFromStat={setAudioUrlWhenFromStat}
              setplayPauseTogle={setplayPauseTogle}
              activeThread={activeThread}
              audioUrl={audioUrl}
              setAudioNextSrc={setAudioNextSrc}
            />
            {getChatOfUserLoading ? (
              <div style={{ height: "64%" }}>
                <Skeleton count={13} />
              </div>
            ) : (
              <MessageList
                chat={chat}
                playerThisVioce={playerThisVioce}
                onSetUrl={onSetUrl}
                // scrollToIndex={chat.length ? chat.length - 1 : 0}
                scrollToIndex={nowPlayNumber}
              />
            )}
            {overAllLoading ? (
              <Skeleton count={1} />
            ) : (
              <TextBox
                message={message}
                changeSms={changeSms}
                loading={loading}
                onLoad={onLoad}
                changeTextoVoice={changeTextoVoice}
              />
            )}
          </Col>
          <Col
            style={{
              // height: "100%",
              width: "25%",
            }}
            // flex={5}
            className="overfl"
          >
            <CalenderSideBar nylasEvents={nylasEvents} />
          </Col>
        </Row>
      </>
    </div>
  );
}
