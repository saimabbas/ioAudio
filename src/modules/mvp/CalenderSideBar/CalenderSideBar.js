import { Radio, Row, Col } from "antd";
import React, { useState } from "react";
import { format } from 'date-fns'
import "./topButton.css";
import {
  CalendarOutlined,
  DownloadOutlined,
  LockFilled,
  CalendarFilled,
} from "@ant-design/icons";
import Canlender from "./Calender/Canlender";
import { FaCalendarAlt, FaCalendar, FaLock, FaDownload } from "react-icons/fa";

// import {} from "font-awesome";
export default function CalenderSideBar({ nylasEvents }) {
  console.log('events in CalenderSideBar', nylasEvents)
  const [section, setsection] = useState("Tools");
  const handleModeChange = (e) => {
    const section = e.target.value;
    setsection(section);
  };

  const renderEvents = () => {
    return nylasEvents.map(event => {
      let date_time = event.when?.start_time ? event.when.start_time * 1000 : event.when.date
      return (
        <Row key={event.id} className="buttonDivRidio buttonListHeader">
          <Col push={1} flex={1}>
            <CalendarOutlined className="primaryColor iconSize" />
          </Col>
          <Col push={1} flex={1}>
            {format(new Date(date_time), 'yyyy-LL-dd')}
          </Col>
          <Col push={1} flex={12}>{event.title}</Col>
        </Row>
      )
    })
  }

  return (
    <div>
      <Radio.Group
        className="buttonDivRidio"
        onChange={handleModeChange}
        value={section}
        style={{ marginBottom: 8 }}
      >
        <Radio.Button value="Collaborate">Collaborate</Radio.Button>
        <Radio.Button value="Share">Events</Radio.Button>
        <Radio.Button value="Tools">Tools</Radio.Button>
        <Radio.Button value="Analytics">Analytics</Radio.Button>
      </Radio.Group>

      {section === "Tools" && (
        <div>
          <Row className="buttonDivRidio buttonListHeader">
            <FaCalendarAlt className="calender-icn" />
            Book time to listen
          </Row>
          <Row>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            // flex={1}
            >
              <Canlender />
            </Col>
          </Row>
          <Row className="buttonDivRidio buttonListHeader mt-3">
            <FaCalendar className="calender-icn" />
            Archive
          </Row>
          <Row className="buttonDivRidio buttonListHeader mt-3">
            <FaLock className="calender-icn" />
            Lock
          </Row>
          <Row className="buttonDivRidio buttonListHeader mt-3">
            <FaDownload className="calender-icn" /> Download
          </Row>
        </div>
      )}
      {section === "Share" && (
        <div>
          {renderEvents()}
        </div>
      )}
    </div>
  );
}
