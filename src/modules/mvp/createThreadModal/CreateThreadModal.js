import { Modal, Button } from "antd";
import React from "react";

export default function CreateThreadModal({
  isModalVisible,
  handleOk,
  handleCancel,
  setnewThreadTile,
  newThreadLoad,
  BoxTitle,
  ...props
}) {
  return (
    <Modal
      centered={true}
      title={BoxTitle}
      onOk={handleOk}
      visible={isModalVisible}
      onCancel={handleCancel}
      confirmLoading={newThreadLoad}
      footer={null}
    >
      {props.children}
    </Modal>
  );
}
