// Вызов константы нового объекта плеер для каждого потока
const player = new Plyr('#player', {
    invertTime: false,
});

const player_2 = new Plyr('#player_2', {
    invertTime: false,
});

const player_3 = new Plyr('#player_3', {
    invertTime: false,
});

const player_4 = new Plyr('#player_4', {
    invertTime: false,
});

const player_5 = new Plyr('#player_5', {
    invertTime: false,
});

const player_6 = new Plyr('#player_6', {
    invertTime: false,
});

const player_7 = new Plyr('#player_7', {
    invertTime: false,
});

// Ищем сегмент плеера по id
let video_1 = document.getElementById('player');
let video_2 = document.getElementById('player_2');
let video_3 = document.getElementById('player_3');
let video_4 = document.getElementById('player_4');
let video_5 = document.getElementById('player_5');
let video_6 = document.getElementById('player_6');
let video_7 = document.getElementById('player_7');

// Поток 1 -------------------------------------------------------------------
if (Hls.isSupported()) {
    let hls = new Hls();
    hls.loadSource(videoSrc_1);
    hls.attachMedia(video_1);
}

else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video_1.src = videoSrc_1;
}

// Поток 2 -------------------------------------------------------------------
if (Hls.isSupported()) {
    let hls = new Hls();
    hls.loadSource(videoSrc_2);
    hls.attachMedia(video_2);
}

else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video_2.src = videoSrc_2;
}

// Поток 3 -------------------------------------------------------------------
if (Hls.isSupported()) {
    let hls = new Hls();
    hls.loadSource(videoSrc_3);
    hls.attachMedia(video_3);
}

else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video_3.src = videoSrc_3;
}

// Поток 4 -------------------------------------------------------------------
if (Hls.isSupported()) {
    let hls = new Hls();
    hls.loadSource(videoSrc_4);
    hls.attachMedia(video_4);
}

else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video_4.src = videoSrc_4;
}
/*
// Поток 5 -------------------------------------------------------------------
if (Hls.isSupported()) {
    let hls = new Hls();
    hls.loadSource(videoSrc_5);
    hls.attachMedia(video_5);
}

else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video_5.src = videoSrc_5;
}

// Поток 6 -------------------------------------------------------------------
if (Hls.isSupported()) {
    let hls = new Hls();
    hls.loadSource(videoSrc_6);
    hls.attachMedia(video_6);
}

else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video_6.src = videoSrc_6;
}

// Поток 7 -------------------------------------------------------------------
if (Hls.isSupported()) {
    let hls = new Hls();
    hls.loadSource(videoSrc_6);
    hls.attachMedia(video_6);
}

else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video_7.src = videoSrc_7;
}
 */
// Functions -------------------------------------------------------------------
var xhr = new XMLHttpRequest();
xhr.open('GET', videoSrc_1, true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log('Поток готов!');
        } else if (xhr.status === 404) {
            setTimeout(function(){
                location.reload();
            }, 10000);
            console.log('Поток не найден');
        } else {
            console.log('Произошла ошибка');
        }
    }
};
xhr.send();
