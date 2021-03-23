import { Input } from "antd";
import React from "react";

export default function TextInput({ onChange, help, value, ...props }) {
  return (
    <div>
      <Input onChange={onChange} {...props} value={value} />
      {help && (
        <p
          style={{
            color: "red",
            fontSize: "12px",
            marginBottom: "-.3rem",
            marginTop: "-.3rem",
          }}
        >
          {help}
        </p>
      )}
    </div>
  );
}
