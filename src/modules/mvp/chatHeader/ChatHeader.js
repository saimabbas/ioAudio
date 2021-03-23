import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
export default function ChatHeader({ activeThread }) {
  return (
    <div className="chat_header_s">
      <Avatar>
        <img
          src="/images/rounded_picture_testimonial.png"
          alt="rounded_picture_testimonial"
        />
      </Avatar>
      <div
        className="chat-name-s"
      >
        {activeThread ? activeThread.title : " New workouts to try"}
        <div className="last-heard">
          Last heard at 9 pm
        </div>
      </div>
      <br />
    </div>
  );
}
