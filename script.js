document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector("video");
  setVolume(0.8); // Set default volume to 80%

  video.addEventListener("mouseenter", () => (video.dataset.isHovered = true));
  video.addEventListener("mouseleave", () => (video.dataset.isHovered = false));

  document.addEventListener("keyup", function (e) {
    if (e.which == 32) {
      const fullScreen =
        document.fullScreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen;
      const isHovered = video.dataset.isHovered;

      if (fullScreen || isHovered) {
        playVideo();
        viewControls(3000);
      }
    }
  });

  video.addEventListener("click", playVideo);
  document.querySelector(".play").addEventListener("click", playVideo);

  function playVideo() {
    const playButton = document.querySelector(".play");
    if (video.paused) {
      video.play();
      playButton.textContent = "pause"
    } else {
      video.pause();
      playButton.textContent = "play_arrow"
    }
  }

  const videoContainer = document.querySelector(".videoContainer");
  videoContainer.addEventListener("mouseenter", showControls);
  videoContainer.addEventListener("mouseleave", hideControls);
  videoContainer.addEventListener("mousemove", () => viewControls(3000));

  let timer;

  function viewControls(ms) {
    if (timer) {
      clearTimeout(timer);
      timer = 0;
    }

    showControls();
    videoContainer.style.cursor = "auto";
    timer = setTimeout(function () {
      hideControls();
      videoContainer.style.cursor = "none";
    }, ms);
  }

  function showControls() {
    document.querySelector(".control").style.display = "flex";
  }

  function hideControls() {
    document.querySelector(".control").style.display = "none";
  }

  document
    .querySelector(".fullscreen")
    .addEventListener("click", toggleFullScreen);

  function toggleFullScreen() {
    const fullscreenButton = document.querySelector(".fullscreen");
    const isFullScreen =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;
    const fullScreenEnabled =
      document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled;
    const i = videoContainer;

    if (isFullScreen) {
      // exit full-screen
      fullscreenButton.classList.replace(
        "video-fullscreen-exit",
        "video-fullscreen-enter"
      );
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else if (fullScreenEnabled) {
      fullscreenButton.classList.replace(
        "video-fullscreen-enter",
        "video-fullscreen-exit"
      );

      // go full-screen
      if (i.requestFullscreen) {
        i.requestFullscreen();
      } else if (i.webkitRequestFullscreen) {
        i.webkitRequestFullscreen();
      } else if (i.mozRequestFullScreen) {
        i.mozRequestFullScreen();
      } else if (i.msRequestFullscreen) {
        i.msRequestFullscreen();
      }
    }
  }

/*
  setInterval(function () {
    // Update HTML5 video current play time
    document.querySelector(".ctime").innerHTML = formatTime(
      Math.round(video.currentTime)
    );

    // Get HTML5 video time duration
    document.querySelector(".ttime").innerHTML = formatTime(
      video.duration - Math.round(video.currentTime)
    );
  }, 500);
*/

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const formattedMinutes = minutes >= 10 ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    const formattedSeconds = seconds >= 10 ? seconds : "0" + seconds;
    return formattedMinutes + ":" + formattedSeconds;
  }

  const scrubber = document.querySelector(".progress");
  const progress = document.querySelector(".progress-bar");

  video.addEventListener("timeupdate", videoTimeUpdateHandler);
  scrubber.addEventListener("mousedown", scrubberMouseDownHandler);

  function videoTimeUpdateHandler(e) {
    const percent = video.currentTime / video.duration;
    updateProgressWidth(percent);
  }

  function scrubberMouseDownHandler(e) {
    const x = e.pageX - scrubber.getBoundingClientRect().left;
    const percent = x / scrubber.offsetWidth;
    updateProgressWidth(percent);
    updateVideoTime(percent);
  }

  function updateProgressWidth(percent) {
    progress.style.width = percent * 100 + "%";
  }

  function updateVideoTime(percent) {
    video.currentTime = percent * video.duration;
  }

  let savedVolume;
  document.querySelector(".volume a").addEventListener("click", function () {
    if (video.muted) {
      video.muted = false;
      setVolume(savedVolume);
    } else {
      video.muted = true;
      savedVolume = video.volume;
      setVolume(0);
    }
  });

  function setVolume(volume) {
    video.volume = volume;
    const toggleSound = document.querySelector(".toggle-sound");

    if (volume >= 0.8) {
      toggleSound.className = "toggle-sound video-volume-high";
    } else if (volume >= 0.4) {
      toggleSound.className = "toggle-sound video-volume-medium";
    } else if (volume > 0) {
      toggleSound.className = "toggle-sound video-volume-low";
    } else {
      toggleSound.className = "toggle-sound video-volume-muted";
    }
  }

  const PiP = document.getElementById("picture-in-picture");

  if (
    video.webkitSupportsPresentationMode &&
    typeof video.webkitSetPresentationMode === "function"
  ) {
    PiP.addEventListener("click", function (event) {
      PiP.classList.toggle("video-picture-in-picture-enter");
      video.webkitSetPresentationMode(
        video.webkitPresentationMode === "picture-in-picture"
          ? "inline"
          : "picture-in-picture"
      );
    });
  } else {
    PiP.style.display = "none";
  }

  const airPlay = document.getElementById("airplay");

  if (window.WebKitPlaybackTargetAvailabilityEvent) {
    video.addEventListener(
      "webkitplaybacktargetavailabilitychanged",
      function (event) {
        switch (event.availability) {
          case "available":
            airPlay.style.display = "block";
            break;
          default:
            airPlay.style.display = "none";
        }
        airPlay.addEventListener("click", function () {
          video.webkitShowPlaybackTargetPicker();
        });
      }
    );
  } else {
    airPlay.style.display = "none";
  }
});