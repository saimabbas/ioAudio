(function () {
  var requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

window.onload = function () {
  var element = document.getElementById("waves");
  dropAndLoad(element, init, "ArrayBuffer");
};

// Reusable dropAndLoad function: it reads a local file dropped on a
// `dropElement` in the DOM in the specified `readFormat`
// (In this case, we want an arrayBuffer)
function dropAndLoad(dropElement, callback, readFormat) {
  var readFormat = readFormat || "DataUrl";

  dropElement.addEventListener(
    "dragover",
    function (e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    false
  );

  dropElement.addEventListener(
    "drop",
    function (e) {
      e.stopPropagation();
      e.preventDefault();
      loadFile(e.dataTransfer.files[0]);
    },
    false
  );

  function loadFile(files) {
    var file = files;
    var reader = new FileReader();
    reader.onload = function (e) {
      callback(e.target.result);
    };
    reader["readAs" + readFormat](file);
  }
}

var dogBarkingBuffer = null;
// Fix up prefixing
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

function loadDogSound(url) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  // Decode asynchronously
  request.onload = function () {
    init(request.response);
    /*context.decodeAudioData(request.response, function(buffer) {
      dogBarkingBuffer = buffer;
      // playSound(buffer);
      init(buffer);
    });*/
  };
  request.send();
}
function playSound(buffer) {
  var source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer; // tell the source which sound to play
  source.connect(context.destination); // connect the source to the context's destination (the speakers)
  source.start(0); // play the source now
  // note: on older systems, may have to use deprecated noteOn(time);
}

// Once the file is loaded, we start getting our hands dirty.
function init(arrayBuffer) {
  // document.getElementById('instructions').innerHTML = 'Loading ...'
  // Create a new `audioContext` and its `analyser`
  window.audioCtx = new AudioContext();
  context = audioCtx;
  window.analyser = audioCtx.createAnalyser();
  // If a sound is still playing, stop it.
  // if (window.source)
  // source.noteOff(0)
  // Decode the data in our array into an audio buffer
  audioCtx.decodeAudioData(arrayBuffer, function (buffer) {
    // Use the audio buffer with as our audio source
    window.source = audioCtx.createBufferSource();
    source.buffer = buffer;
    // Connect to the analyser ...
    source.connect(analyser);
    // and back to the destination, to play the sound after the analysis.
    analyser.connect(audioCtx.destination);
    // Start playing the buffer.
    source.start(0);
    // Initialize a visualizer object
    var viz = new simpleViz();
    // Finally, initialize the visualizer.
    new visualizer(viz["update"], analyser);
    // document.getElementById('instructions').innerHTML = ''
  });
}

// The visualizer object.
// Calls the `visualization` function every time a new frame
// is available.
// Is passed an `analyser` (audioContext analyser).
function visualizer(visualization, analyser) {
  var self = this;
  this.visualization = visualization;
  var last = Date.now();
  var loop = function () {
    var dt = Date.now() - last;
    // we get the current byteFreq data from our analyser
    var byteFreq = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(byteFreq);
    last = Date.now();
    // We might want to use a delta time (`dt`) too for our visualization.
    self.visualization(byteFreq, dt);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}

// A simple visualization. Its update function illustrates how to use
// the byte frequency data from an audioContext analyser.
function simpleViz(canvas) {
  var self = this;
  this.canvas = document.getElementById("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.copyCtx = document.getElementById("canvas-copy").getContext("2d");
  this.ctx.fillStyle = "#fff";
  this.barWidth = 4;
  this.barGap = 2;
  // We get the total number of bars to display
  this.bars = Math.floor(this.canvas.width / (this.barWidth + this.barGap));
  // This function is launched for each frame, together with the byte frequency data.
  this.update = function (byteFreq) {
    self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
    // We take an element from the byteFreq array for each of the bars.
    // Let's pretend our byteFreq contains 20 elements, and we have five bars...
    var step = Math.floor(byteFreq.length / self.bars);
    // `||||||||||||||||||||` elements
    // `|   |   |   |   |   ` elements we'll use for our bars
    for (var i = 0; i < self.bars; i++) {
      // Draw each bar
      var barHeight = byteFreq[i * step];
      self.ctx.fillRect(
        i * (self.barWidth + self.barGap),
        self.canvas.height - barHeight,
        self.barWidth,
        barHeight
      );
      self.copyCtx.clearRect(0, 0, self.canvas.width, self.canvas.height);
      self.copyCtx.drawImage(self.canvas, 0, 0);
    }
  };
}

gainNode = null;
source = null;
function play_sound() {
  if (!context.createGain) context.createGain = context.createGainNode;
  gainNode = context.createGain();
  var source = context.createBufferSource();
  source.buffer = BUFFERS.techno;

  // Connect source to a gain node
  source.connect(gainNode);
  // Connect gain node to destination
  gainNode.connect(context.destination);
  // Start playback in a loop
  source.loop = true;
  if (!source.start) source.start = source.noteOn;
  source.start(0);
  source = source;
}

function changeVolume() {
  var element = document.getElementById("change_vol");
  var volume = element.value;
  var fraction = parseInt(element.value) / parseInt(element.max);
  gainNode.gain.value = fraction * fraction;
}

function stop_play() {
  console.log(source);
  if (!source.stop) source.stop = source.noteOff;
  source.stop(0);
}

var url =
  "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3";
playerElement = document.querySelector("#player");
function Player(url) {
  this.ac = new (window.AudioContext || webkitAudioContext)();
  this.url = url;
  this.mute = false;
  // this.el = el;
  this.button = document.getElementById("play_button");
  this.volume_btn = document.getElementById("change_vol");
  this.mute_btn = document.getElementById("vol_img");
  this.rewind = document.getElementById("rewind");
  this.rewind30 = document.getElementById("rewind30");
  this.forward = document.getElementById("forward");
  this.forward30 = document.getElementById("forward30");
  this.speed1xB = document.getElementById("speed1x");
  this.speed2xB = document.getElementById("speed2x");
  this.left_duration = document.getElementById("left-duration");
  this.track = document.getElementById("audio-overlay");
  this.progress = document.getElementById("seekbar");
  // console.log(this.button);
  // this.scrubber = el.querySelector('.scrubber');
  // this.message = el.querySelector('.message');
  // this.message.innerHTML = 'Loading';
  this.bindEvents();
  this.fetch();
}

Player.prototype.bindEvents = function () {
  this.button.addEventListener("click", this.toggle.bind(this));
  this.volume_btn.addEventListener("change", this.changeVolume.bind(this));
  this.mute_btn.addEventListener("click", this.muteSound.bind(this));
  this.rewind.addEventListener("click", this.rewindSound.bind(this));
  this.rewind30.addEventListener("click", this.rewind30Sound.bind(this));
  this.forward.addEventListener("click", this.forwardSound.bind(this));
  this.forward30.addEventListener("click", this.forward30Sound.bind(this));
  this.speed1xB.addEventListener("click", this.speed1x.bind(this));
  this.speed2xB.addEventListener("click", this.speed2x.bind(this));
  // this.scrubber.addEventListener('mousedown', this.onMouseDown.bind(this));
  // window.addEventListener('mousemove', this.onDrag.bind(this));
  // window.addEventListener('mouseup', this.onMouseUp.bind(this));
};

Player.prototype.fetch = function () {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", this.url, true);
  xhr.responseType = "arraybuffer";
  xhr.onload = function () {
    this.decode(xhr.response);
    // init2(xhr.response);
  }.bind(this);
  xhr.send();
};

Player.prototype.decode = function (arrayBuffer) {
  this.ac.decodeAudioData(
    arrayBuffer,
    function (audioBuffer) {
      // this.message.innerHTML = '';
      this.buffer = audioBuffer;
      this.play();
      this.draw();
    }.bind(this)
  );
};

Player.prototype.connect = function () {
  if (this.playing) {
    this.pause();
  }
  this.source = this.ac.createBufferSource();
  this.source.buffer = this.buffer;
  this.gainNode = this.ac.createGain();
  // this.source.connect();
  this.analyser = this.ac.createAnalyser();
  this.analyser.smoothingTimeConstant = 0.3;
  this.analyser.fftSize = 1024;
  // Connect to the analyser ...
  this.source.connect(this.analyser);
  this.gainNode.connect(this.ac.destination);
  // this.source.connect(this.gainNode);
  this.gainNode.gain.value = 0.5; // 10 %

  // and back to the destination, to play the sound after the analysis.
  this.source.connect(this.gainNode);
  // this.source.connect(this.ac.destination);
};

Player.prototype.play = function (position) {
  this.connect();
  this.position = typeof position === "number" ? position : this.position || 0;
  this.startTime = this.ac.currentTime - (this.position || 0);
  this.source.start(this.ac.currentTime, this.position);
  // Initialize a visualizer object
  var viz = new simpleViz();
  // Finally, initialize the visualizer.
  new visualizer(viz["update"], this.analyser);
  this.playing = true;
  document.getElementById("play_button").src = "images/pause_big.png";
  console.log("duration = " + this.buffer.duration);
  document.getElementById("duration").innerHTML = formatTime(
    this.buffer.duration
  );
};

Player.prototype.changeVolume = function (element) {
  element = document.getElementById("change_vol");
  var volume = element.value;
  console.log(volume);
  var fraction = parseInt(element.value) / parseInt(element.max);
  // console.log(fraction);
  // Let's use an x*x curve (x-squared) since simple linear (x) does not
  // sound as good.
  this.gainNode.gain.value = volume; //fraction * fraction;
  console.log(this.gainNode);
};
Player.prototype.muteSound = function (element) {
  if (!this.mute) {
    this.gainNode.gain.value = 0;
    document.getElementById("vol_img").src = "images/sound-mute.png";
    this.mute = true;
  } else {
    this.mute = false;
    document.getElementById("vol_img").src = "images/sound.png";
    var aelement = document.getElementById("change_vol");
    var volume = aelement.value;
    console.log(volume);
    this.gainNode.gain.value = volume; //fraction * fraction;
    // console.log(this.gainNode);
  }
};

Player.prototype.pause = function () {
  if (this.source) {
    this.source.stop(0);
    this.source = null;
    this.position = this.ac.currentTime - this.startTime;
    this.playing = false;
    document.getElementById("play_button").src = "images/play.png";
  }
};

Player.prototype.seek = function (time) {
  if (this.playing) {
    this.play(time);
  } else {
    this.position = time;
  }
};

Player.prototype.updatePosition = function () {
  this.position = this.playing
    ? this.ac.currentTime - this.startTime
    : this.position;
  console.log(this.position);
  if (this.position >= this.buffer.duration) {
    this.position = this.buffer.duration;
    this.pause();
  }
  var baki_time = this.buffer.duration - this.position;
  console.log("==" + baki_time);
  this.left_duration.innerHTML = formatTime(baki_time);
  document.getElementById("duration").innerHTML = formatTime(this.position);
  return this.position;
};

Player.prototype.toggle = function () {
  if (!this.playing) {
    this.play();
    document.getElementById("play_button").src = "images/pause_big.png";
  } else {
    this.pause();
    document.getElementById("play_button").src = "images/play.png";
  }
};

Player.prototype.rewindSound = function () {
  this.position = 0;
  this.startTime = this.ac.currentTime - (this.position || 0);
  this.source.start(this.ac.currentTime, this.position);
};
Player.prototype.rewind30Sound = function () {
  this.position = typeof position === "number" ? position : this.position || 0;
  if (this.buffer.duration > 30 && this.position > 30)
    this.position = this.position - 30;
  else this.position = 0;
  this.source.stop(this.ac.currentTime);
  this.source.disconnect();
  this.play(this.position);
};
Player.prototype.forwardSound = function () {
  this.position = this.buffer.duration;
  this.startTime = this.ac.currentTime - (this.position || 0);
  this.source.start(this.ac.currentTime, this.position);
};
Player.prototype.forward30Sound = function () {
  this.position = typeof position === "number" ? position : this.position || 0;
  console.log(this.buffer.duration + "buffer");
  if (this.buffer.duration > 30) this.position = this.position + 30;
  else this.position = 0;
  this.source.stop(this.ac.currentTime);
  this.source.disconnect();
  this.play(this.position);
};

Player.prototype.speed1x = function () {
  this.source.playbackRate.value = 1.0;
};

Player.prototype.speed2x = function () {
  this.source.playbackRate.value = 2.0;
};

Player.prototype.onMouseDown = function (e) {
  this.dragging = true;
  this.startX = e.pageX;
  this.startLeft = parseInt(this.scrubber.style.left || 0, 10);
};

Player.prototype.onDrag = function (e) {
  /*var width, position;
  if ( !this.dragging ) {
    return;
  }
  width = this.track.offsetWidth;
  position = this.startLeft + ( e.pageX - this.startX );
  position = Math.max(Math.min(width, position), 0);
  this.scrubber.style.left = position + 'px';*/
};

Player.prototype.onMouseUp = function () {
  /*var width, left, time;
  if ( this.dragging ) {
    width = this.track.offsetWidth;
    left = parseInt(this.scrubber.style.left || 0, 10);
    time = left / width * this.buffer.duration;
    this.seek(time);
    this.dragging = false;
  }*/
};

Player.prototype.draw = function () {
  var progress = this.updatePosition() / this.buffer.duration;
  // width = this.progress.value;
  if (this.playing) {
    this.button.classList.add("fa-pause");
    this.button.classList.remove("fa-play");
  } else {
    this.button.classList.add("fa-play");
    this.button.classList.remove("fa-pause");
  }
  // console.log("progress = = "+progress);
  this.progress.value = progress;

  /*if ( !this.dragging ) {
    this.scrubber.style.left = ( progress * width ) + 'px';
  }*/
  requestAnimationFrame(this.draw.bind(this));
};
