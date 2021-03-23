import React, { useState } from "react";
import "./messageList.css";
import { connect, useSelector } from "react-redux";
import {
  List,
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import { VerticalAlignBottomOutlined, FileOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import Avatar from "antd/lib/avatar/avatar";

const MessageList = ({ chat, playerThisVioce, scrollToIndex, onSetUrl }) => {
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 60,
  });
  let { user: auth } = useSelector((state) => state.userReducer);
  // console.log(chat)
  function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    parent,
    style, // Style object to be applied to row (to position it)
  }) {
    // console.log("style", style)
    const item = chat[index];
    return (
      <div>
        <CellMeasurer
          key={index}
          cache={cache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          {chat && (
            <div style={style}>
              <div className="abcdef">
                <div
                  className={
                    auth.email === item.autherId ? "message" : "my_message"
                  }
                >
                  <Tooltip
                    color="white"
                    key="black"
                    placement="top"
                    title={item.autherId}
                  >
                    <div className="author-thumb">
                      <img src="/images/saim.png" alt="saim" />
                      {/* <span className="icon-status online"></span> */}
                    </div>
                  </Tooltip>
                  {item.msgType === "file" ? (
                    <Tooltip
                      color="white"
                      key="black"
                      placement="top"
                      title={"Click to play"}
                    >
                      <div
                        onClick={() => playerThisVioce(item, key)}
                        style={{ cursor: "pointer", width: "100%" }}
                        style={{
                          backgroundColor: `${
                            item.autherId === auth.email ? "#6cbb9a" : "#ffeed4"
                          }`,
                          width: "100%",
                        }}
                        className="friend-drawer message-text friend-drawer--onhover"
                      >
                        <Avatar icon={<FileOutlined />} class="" />
                        <div className="text">
                          <a target="_blank" href={item.fileUrl} download>
                            <p className="text-muted">
                              {item.fileUrl.split("/")[4].split("-")[1]}
                            </p>
                            <span className="time-left">
                              {(Math.random() * (2 - 1) + 1).toFixed(2)} mbs
                            </span>
                          </a>
                        </div>
                        <a target="_blank" href={item.fileUrl} download>
                          <i className="round">
                            <VerticalAlignBottomOutlined />
                          </i>
                        </a>
                      </div>
                      <time className="message-time">
                        {new Date(item.createdAt).toTimeString().split(" ")[0]}
                      </time>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      color="white"
                      key="black"
                      placement="top"
                      title={"Click to play"}
                    >
                      <div
                        className="message-text"
                        style={{
                          // padding: "10px",
                          // margin: "10px",
                          overflow: "hidden",
                          cursor: "pointer",
                        }}
                        onClick={() => playerThisVioce(item, key)}
                      >
                        {/* <div
                        className={
                          item.autherId === auth.email ? null : "my_style"
                        }
                      ></div> */}
                        <div
                          style={{
                            backgroundColor: `${
                              item.autherId === auth.email
                                ? "#6cbb9a"
                                : "#ffeed4"
                            }`,
                            padding: "10px",
                          }}
                          className="message-content"
                        >
                          {item.textString}
                        </div>
                        <time className="message-time">
                          {
                            new Date(item.createdAt)
                              .toTimeString()
                              .split(" ")[0]
                          }
                        </time>
                      </div>
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          )}
        </CellMeasurer>
      </div>
    );
  }
  return (
    <div className="main-c maincs">
      <div
        // className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyItems: "center",
        }}
      >
        <div>
          <div
            style={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="mainchatbox">
              {chat && (
                <List
                  width={1000}
                  height={320}
                  // scrollToRow={scrollToIndex}
                  rowCount={chat.length}
                  // rowHeight={({index})=>{ return chat.messages[index].message.length*4+20}}
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    outline: "none",
                  }}
                  playerThisVioce={playerThisVioce}
                  deferredMeasurementCache={cache}
                  rowHeight={cache.rowHeight}
                  rowRenderer={rowRenderer}
                  scrollToIndex={scrollToIndex}
                  className="caht-box-s"
                />
              )}
              {/* </div> */}
              {/* { messages} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageList;
