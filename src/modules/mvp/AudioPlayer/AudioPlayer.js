import { Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import "./style.css";
import Wave from "wave-visualizer";
import AudioPlayera from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { ClevertapReact } from "../../../utils/clevertap/clevertap";
import {
  FaDownload,
  FaMicrophone,
  FaAngleDown,
  FaBars,
  FaArrowCircleRight,
  FaArrowCircleLeft,
} from "react-icons/fa";

export default function AudioPlayer({
  audioUrl,
  setAudioNextSrc,
  activeThread,
  setplayPauseTogle,
  setAudioUrlWhenFromStat,
  ...props
}) {
  const data = true;
  let [wave, setWave] = useState(new Wave());
  try {
    wave.fromElement("music_player", "canvasTag", {
      type: "wave",
      colors: ["white"],
    });
  } catch (err) {
    console.log(err);
  }

  const [valumeOfPlayer, setvalumeOfPlayer] = useState(1);
  useEffect(() => {
    function playWithVoiceAuto() {
      if (audioUrl) {
        let player = document.getElementById("music_player");
        player.src = audioUrl;

        var playPromise = player.play();
        if (playPromise !== undefined) {
          playPromise
            .then((_) => {
              // Automatic playback started!
              // Show playing UI.
              console.log("audio played auto");
            })
            .catch((error) => {
              // Auto-play was prevented
              // Show paused UI.
              console.log("playback prevented");
            });
        }
      } else {
        document.getElementById("play_button").src = "images/play.png";
      }
    }
    // window.addEventListener("scroll", handleScroll);1x
    const script = document.createElement("script");
    script.setAttribute("id", "playerJava");
    script.src = "js/player.js";
    script.async = true;
    const anotherScript = document.createElement("script");
    anotherScript.setAttribute("id", "aslkdjflakjsd");
    anotherScript.src = "js/local_audio_visualizer.js";
    anotherScript.async = true;
    setTimeout(() => {
      playWithVoiceAuto();
      document.getElementsByTagName("body")[0].append(script);
      document.getElementsByTagName("body")[0].append(anotherScript);
    }, 100);

    return () => {
      // window.removeEventListener("scroll");
      document.getElementById("aslkdjflakjsd") &&
        document.getElementById("aslkdjflakjsd").remove();
      document.getElementById("playerJava") &&
        document.getElementById("playerJava").remove();
    };
  }, [audioUrl]);

  const [playToggle, setplayToggle] = useState(false);

  function forwardAudio() {
    let player = document.getElementById("music_player");
    player.currentTime += 30.0; /**tried also with audio.currentTime here. Didn't worked **/
    //send Clevertap event
    ClevertapReact.event("Uses Audio Player", {
      Action: "Fast Forward 30sec",
    });
  }
  function backwardAudio() {
    let player = document.getElementById("music_player");
    player.currentTime += 30.0; /**tried also with audio.currentTime here. Didn't worked **/
  }

  function x1Speed() {
    let player = document.getElementById("music_player");
    player.playbackRate = 1.0;
  }
  function x2Speed() {
    let player = document.getElementById("music_player");
    player.playbackRate = 2.0;
  }

  function play_aud() {
    let player = document.getElementById("music_player");
    player.muted = true;
    var playPromise = player.play();

    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          // Automatic playback started!
          // Show playing UI.
          player.muted = false;
          document.getElementById("play_button").src = "images/pause_big.png";
          console.log("audio played auto");
        })
        .catch((error) => {
          // Auto-play was prevented
          // Show paused UI.
          console.log("playback prevented");
        });
    }
  }
  const hata = () => {
    let player = document.getElementById("music_player");

    player.pause();

    document.getElementById("play_button").src = "images/play.png";
  };
  const playerToggle = (e) => {
    console.log(playToggle);
    if (playToggle) {
      hata();
      setplayPauseTogle(false);
    } else {
      if (!audioUrl) {
        setAudioUrlWhenFromStat();
      }
      play_aud();
      setplayPauseTogle(true);
    }
    setplayToggle(!playToggle);
  };

  const onChangeVolume = (e) => {
    const { value } = e.target;
    let player = document.getElementById("music_player");
    player.volume = value;
    setvalumeOfPlayer(value);
    //send Clevertap event
    ClevertapReact.event("Uses Audio Player", {
      Action: "Adjust Volume",
    });
  };
  return (
    <div style={{ height: "24%" }}>
      <Row
        style={{
          overflow: "hidden",
          padding: "0.75vw",
          background: "white",
        }}
      >
        <Col>
          <img
            style={{ height: "80px" }}
            src="images/saim.png"
            className="leftImage"
          />
        </Col>
        <Col flex={14} className="audio-s-play">
          {/* <AudioPlayera
            autoPlay
            src={audioUrl}
            onPlay={(e) => console.log("onPlay")}
            // other props here
          /> */}
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.5vw 1vw 0 1vw",
              marginBottom: "1vw",
            }}
          >
            {!audioUrl ? (
              <audio id="music_play"></audio>
            ) : (
              <audio
                onCanPlay={play_aud}
                id="music_player"
                onEnded={setAudioNextSrc}
                // autoPlay
              >
                <source src={audioUrl} />
              </audio>
            )}
            <div className="player-s-1">
              <input
                type="image"
                src="images/play.png"
                onClick={playerToggle}
                id="play_button"
              />
              <div className="tune-name-play">
                <h3>{activeThread.title}</h3>
                <p>Playlist: This year's goals</p>
              </div>
              <div id="canvasContaner">
                <canvas width={150} height={30} id="canvasTag"></canvas>
              </div>
            </div>

            <div className="player-s-2">
              <div id="download-icon">
                <a href="" id="dwn-audio">
                  <FaDownload className="FaDownload" />
                </a>
              </div>
              <span>DOWNLOAD RECORDING</span>
              <div id="change-voice">
                <div className="changeVioce">
                  <FaMicrophone className="FaMicrophone" />
                </div>
                <FaAngleDown className="FaMicrophone" />
                <div>
                  <ul class="sounds-list">
                    <li selected value="Salli">
                      Salli, Female
                    </li>
                    <li value="Joanna">Joanna, Female</li>
                    <li value="Ivy">Ivy, Female</li>
                    <li value="Kendra">Kendra, Female</li>
                    <li value="Kimberly">Kimberly, Female</li>
                    <li value="Kewin">Kewin, Male</li>
                    <li value="Matthew">Matthew, Male</li>
                    <li value="Justin">Justin, Male</li>
                    <li value="Joey">Joey, Male</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                paddingBottom: "0.5vw",
                paddingTop: "0.5vw",
              }}
            >
              <div className="prog-text-s">
                <span>
                  <div id="duration" style={{ position: "relative" }}>
                    00:00
                  </div>
                  <div id="audio-progress">
                    <progress
                      class="audio-overlay"
                      id="seekbar"
                      value="0"
                      max="1"
                    ></progress>
                  </div>

                  <div id="left-duration" style={{ position: "relative" }}>
                    00:00
                  </div>
                </span>
                <FaBars className="FaBars" />
              </div>
              <div className="player-s-4">
                <img src="images/volume.png" id="vol_img" />

                <input
                  onChange={onChangeVolume}
                  type="range"
                  orient="vertical"
                  id="change_vol"
                  step="0.05"
                  min="0"
                  value={valumeOfPlayer}
                  max="1"
                />

                <div
                  id="bottom-right-control"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    position: "relative",
                  }}
                >
                  <img
                    src="images/30_back.png"
                    class="30_back thrback"
                    id="rewind30"
                    onClick={forwardAudio}
                  />
                  <img
                    src="images/30_forward.png"
                    class="30_forward thrback"
                    id="forward30"
                    onClick={forwardAudio}
                  />
                </div>
                {/* <div class="vertical-line"></div> */}
                <FaArrowCircleLeft className="FaArrowCircleRight" />
                <FaArrowCircleRight className="FaArrowCircleRight" />
                <div
                  class="controls-div3"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    position: "relative",
                  }}
                >
                  <img
                    src="images/1xspeed.png"
                    class="x1speed"
                    id="speed1x"
                    onClick={x1Speed}
                  />
                  <img
                    src="images/2xspeed.png"
                    class="x2speed"
                    id="speed2x"
                    onClick={x2Speed}
                  />
                </div>
              </div>
            </div>
          </div>
        </Col>
        {/* <Col flex={1}></Col> */}
      </Row>
    </div>
  );
}
