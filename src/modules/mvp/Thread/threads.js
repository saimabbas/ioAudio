import React from "react";

import "./threads.css";
import Avatar from "antd/lib/avatar/avatar";
import {
  UserOutlined,
  CaretRightOutlined,
  VerticalAlignBottomOutlined,
  PlusOutlined,
  PauseOutlined,
  EditOutlined,
  FileOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { MdFileDownload, MdPause, MdShare, MdModeEdit, MdPlayArrow } from "react-icons/md";

export default function Threads({
  setActiveThread,
  threads,
  activeThread,
  getChatOfUserLoading,
  showModalInvite,
  auth,
  onStartPlay,
  pauseAudio,
  playPauseTogle,
}) {
  console.log(activeThread);
  return (
    <div className="container1">
      {threads &&
        threads.map((value, index) => {
          return (
            <div
              key={value.id}
              style={{
                borderRight:
                  activeThread.id === value.id
                    ? "4px solid rgb(85, 26, 139)"
                    : "0px solid",
              }}
              className={
                index % 2 === 0 ? "friend-drawer" : "friend-drawer dark"
              }
              onClick={() => setActiveThread(value)}
            >
              <div className="abc-end-flex">
                <Avatar class="profile-image">
                  <img
                    src="/images/rounded_picture_testimonial.png"
                    alt="rounded_picture_testimonial.png"
                  />
                </Avatar>

                <div className="text">
                  <div>
                    <h6 style={{ width: "80%" }}>{value.title}</h6>{" "}
                    {value.newComes && value.newComes !== 0 ? (
                      <div
                        style={{
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "white",
                          backgroundColor: "red",
                          borderRadius: "100px",
                        }}
                      >
                        {value.newComes}
                      </div>
                    ) : null}
                  </div>
                  <p className="text-muted">{value.lastMessage}</p>
                  <span className="time-left">
                    {new Date(value.createdAt).toTimeString().split(" ")[0]}
                  </span>
                </div>
              </div>

              <span className="span-display">
                {auth && auth.email && auth.email === value.authorId ? (
                  <span className="span-display">
                    <i
                      onClick={(e) =>
                        showModalInvite(
                          e,
                          value.id,
                          value.createdAt,
                          value.threadRelated,
                          value.title
                        )
                      }
                      className="round"
                    >
                      <MdShare className="avt-icn" />
                    </i>

                    <i className="round">
                      <MdModeEdit className="avt-icn" />
                    </i>
                  </span>
                ) : (
                  <span></span>
                )}
                {activeThread.id === value.id ? (
                  !playPauseTogle ? (
                    <i onClick={(e) => onStartPlay(e, value)} className="round">
                      <MdPlayArrow className="avt-icn" />
                    </i>
                  ) : (
                    <i onClick={pauseAudio} className="round">
                      <MdPause className="avt-icn" />
                    </i>
                  )
                ) : null}
                <i className="round">
                  <MdFileDownload className="avt-icn" />
                </i>
              </span>
            </div>
          );
        })}
    </div>
  );
}
