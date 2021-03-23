document.addEventListener(
  "DOMContentLoaded",
  function () {
    startplayer();
  },
  false
);
var player;

function startplayer() {
  player = document.getElementById("music_player");
  player.controls = false;
}
function change_vol() {
  player.volume = document.getElementById("change_vol").value;
}
function padTime(t) {
  return t < 10 ? "0" + t : t;
}
function calculateTotalValue(length) {
  var minutes = Math.floor(length / 60);
  var seconds = Math.floor(length - minutes * 60);

  // use the padTime function here with numbers
  return padTime(minutes) + ":" + padTime(seconds);
}

$("#music_player").on("timeupdate", function () {
  $("#seekbar").attr("value", this.currentTime / this.duration);
});

player = document.getElementById("music_player");

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  console.log("S == " + s);
  return [h, m > 9 ? m : h ? "0" + m : m || "0", s > 9 ? s : "0" + s]
    .filter((a) => a)
    .join(":");
}

player.onloadedmetadata = () => {
  // console.log(player.duration);
  // console.log();
  $("#left-duration").html(formatTime(player.duration.toFixed(0)));
};
// Countdown
player.addEventListener(
  "timeupdate",
  function () {
    var timeleft = document.getElementById("left-duration"),
      duration = parseInt(player.duration),
      currentTime = parseInt(player.currentTime),
      timeLeft = duration - currentTime,
      s,
      m;

    s = timeLeft % 60;
    m = Math.floor(timeLeft / 60) % 60;

    s = s < 10 ? "0" + s : s;
    m = m < 10 ? "0" + m : m;
    if (!isNaN(m) && !isNaN(s)) {
      timeleft.innerHTML = m + ":" + s;
    } else {
      timeleft.innerHTML = "00:00";
    }
  },
  false
);

// Countup
player.addEventListener(
  "timeupdate",
  function () {
    var timeline = document.getElementById("duration");
    var s = parseInt(player.currentTime % 60);
    var m = parseInt((player.currentTime / 60) % 60);
    if (s < 10) {
      timeline.innerHTML = m + ":0" + s;
    } else {
      timeline.innerHTML = m + ":" + s;
    }
  },
  false
);

$("#change-voice").on("mouseover", function () {
  $(".sounds-list").show();
});
$("#change-voice").on("mouseout", function () {
  $(".sounds-list").hide();
});
$(".sounds-list li").on("click", function () {
  $("#VoiceID").val($(this).attr("value"));
  $(".sounds-list").fadeOut();
  //   pause_aud();
  speakText();
});

$("#music_player").bind("ended", function () {
  // done playing
  //   pause_aud();
});
