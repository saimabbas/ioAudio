import React from "react";
import { Button, Row, Col } from "antd";
import "./threads.css";

export default function Threads({ threads }) {
  return (
    <div style={{ maxWidth: "350px" }}>
      <Row className="buttonDivRidio" style={{ marginBottom: 8 }}>
        <Button style={{ width: "80%" }} type={"primary"}>
          create Thread
        </Button>
      </Row>
      <Row>
        <Col
          flex={1}
          style={{
            height: "500px",
            backgroundColor: "green",
            overflowX: "hidden",
            overflowY: "scroll",
          }}
        ></Col>
      </Row>
    </div>
    // "mubahsar brack"
  );
}
