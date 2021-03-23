import React from "react";

import "./threads.css";
import Avatar from "antd/lib/avatar/avatar";
import {UserOutlined,} from "@ant-design/icons";
export default function notification(){
    return (
        <div className="fb">
            <Avatar icon={<UserOutlined />} class="profile-image" />
            <p className="info"><b>User Name</b><br/><span>14 mutual friends</span></p>
            <div className="button-block">
                <div className="confirm">Confirm</div>
                <div className="delete">Delete Request</div>
            </div>
        </div>
    );
}