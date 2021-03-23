import { Button, Input } from "antd";
import React from "react";
import {
  RightOutlined,
  FileImageOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { MdSend, MdAttachFile, } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";

export default function TextBox({
  message,
  changeSms,
  loading,
  onLoad,
  changeTextoVoice,
  ...propes
}) {
  const fileChange = () => {
    document.getElementById("fileInput").click();
  };
  const suffix = (
    <div
      style={{
        display: "flex ",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <FilePdfOutlined
        onClick={() => alert(" i am chlick")}
        style={{
          fontSize: 16,
          margin: "5px",
          color: "gray",
        }}
      /> */}
      <FileImageOutlined onClick={fileChange} className="send-box-gray-icn" />
      <MdAttachFile className="send-box-gray-icn" />
      <FaShareSquare className="send-box-gray-icn" />

      {!loading ? (
        <div className="send-msg">
          <MdSend
            onClick={(e) => changeTextoVoice(null, null, e)}
            style={{
              fontSize: "1.5vw",
              color: "rgb(121, 102, 228)",
            }}
          />
        </div>
      ) : (
        <LoadingOutlined
          style={{
            fontSize: 30,
            color: "rgb(121, 102, 228)",
          }}
        />
      )}
    </div>
  );
  return (
    <div>
      <input
        style={{ display: "hidden" }}
        type="file"
        id="fileInput"
        name="word"
        accept=".pdf,.doc,.docx,application/msword,.png,.jpg,.jpeg,.txt"
        // accept=".pdf,.png,.jpg,.jpeg"
        onChange={onLoad}
      />
      <form onSubmit={(e) => changeTextoVoice(false, e)}>
        <Input
          name="text"
          id="textEntry"
          class="form-control"
          suffix={suffix}
          style={{ margin: "0px", height: "10%" }}
          value={message}
          onChange={(e) => changeSms(e.target.value)}
          placeholder="Paste your text here or upload a document (.txt, .doc and .docx formats only)"
        />
      </form>
    </div>

    //   <div class="main-container row p-10" style={{ marginTop: "10px" }}>
    //     <div class="col-md-8 col-sm-8 pt-10 col-lg-8 pull-right">
    //       <div class="hide" role="alert">
    //         <p id="err_msg"></p>
    //       </div>
    //       <div class="hide2" role="alert">
    //         <p id="succ_msg"></p>
    //       </div>
    //       <audio id="audioPlayback">
    //         <source id="audioSource" type="audio/mp3" src="" />
    //       </audio>
    //     </div>
    //     <div class="col-lg-4 col-md-4 col-sm-4">
    //       <div align="right">
    //         <div align="right">
    //           <label
    //             data-tooltip="Attach file"
    //             title="Attach file to convert (.txt, .doc and .docx only"
    //             for="fileInput"
    //           >
    //             <i class="gray-clip fa fa-paperclip"></i>
    //           </label>
    //           <Button
    //             type="button"
    //             // id="convertBtn"
    //             onClick={changeTextoVoice}
    //             loading={loading}
    //             style={{ backgroundColor: "green" }}
    //             class="io-bg btn btn-primary rounded"
    //           >
    //             Convert
    //             <i class="fab fa-audible"></i>
    //           </Button>
    //         </div>
    //       </div>

    //       <input
    //         type="file"
    //         id="fileInput"
    //         name="word"
    //         // onchange="onLoad(event)"
    //       />
    //     </div>
    //   </div>
    // </form>
    // </div>
  );
}
