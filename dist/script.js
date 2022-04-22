const config = {
    video: {
        width: 640,
        height: 480,
        fps: 30
    }
};

const landmarkColors = {
    thumb: 'red',
    indexFinger: 'blue',
    middleFinger: 'yellow',
    ringFinger: 'green',
    pinky: 'pink',
    palmBase: 'white'
};

const gestureStrings = {
    'playGesture': '✊',
    'pauseGesture': '✋',
    'f10sGesture1': '👉',
    'b10sGesture1': '👈',
    'f10sGesture2': '👉',
    'b10sGesture2': '👈'
};

async function main() {
    // video canvas
    const video = document.querySelector("#pose-video");
    const canvas = document.querySelector("#pose-canvas");
    const ctx = canvas.getContext("2d");
    const resultLayer = document.querySelector("#player-hand");

    // timer variables
    const $timerRing = document.querySelector('#timer-ring');
    const $timerRingCircle = document.querySelector('#timer-ring-circle');
    const radius = $timerRingCircle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    let confidence = 0;
    let prevGuess = '';

    // timer logic
    $timerRingCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    $timerRingCircle.style.strokeDashoffset = `${circumference}`;

    const setTimerProgress = percent => {
        const offset = circumference - percent * circumference;
        $timerRingCircle.style.strokeDashoffset = offset;
    }

    const showTimer = show => {
        $timerRing.style.visibility = (show ? 'visible' : 'hidden');
    }
    showTimer(false);

    // configure gesture estimator
    const knownGestures = [
        fp.Gestures.playGesture,
        fp.Gestures.pauseGesture,
        fp.Gestures.f10sGesture1,
        fp.Gestures.b10sGesture1,
        fp.Gestures.f10sGesture2,
        fp.Gestures.b10sGesture2
    ];
    const GE = new fp.GestureEstimator(knownGestures);

    // load handpose model
    const model = await handpose.load();
    console.log("Handpose model loaded");

    // main estimation loop
    const estimateHands = async () => {

        // clear canvas overlay
        ctx.clearRect(0, 0, config.video.width, config.video.height);
        resultLayer.innerText = '';

        // get hand landmarks from video
        // Note: Handpose currently only detects one hand at a time
        // Therefore the maximum number of predictions is 1
        const predictions = await model.estimateHands(video, true);

        for (let i = 0; i < predictions.length; i++) {

            // draw colored dots at each predicted joint position
            for (let part in predictions[i].annotations) {
                for (let point of predictions[i].annotations[part]) {
                    drawPoint(ctx, point[0], point[1], 3, landmarkColors[part]);
                }
            }

            // estimate gestures based on landmarks
            // using a minimum score of 9 (out of 10)
            // gesture candidates with lower score will not be returned
            const est = GE.estimate(predictions[i].landmarks, 9);

            showTimer(false);
            if (est.gestures.length > 0) {
                showTimer(true);

                // find gesture with highest match score
                let result = est.gestures.reduce((p, c) => {
                    return (p.score > c.score) ? p : c;
                });

                // detect consistent gestures over 30 calls
                let currGest = gestureStrings[result.name];
                resultLayer.innerText = currGest;
                let similarity = currGest == prevGuess;
                prevGuess = currGest;

                // increment confidence if gesture is consistent
                if (similarity) {
                    confidence++
                } else {
                    confidence = 0;
                }

                if (confidence == 20) { // Every 20 calls, actiate method
                    console.log(`hit: ${currGest}`); // method
                    switch (currGest) {
                        case '✋':
                            pauseVideo();
                            break;
                        case '✊':
                            playVideo();
                            break;
                        case '👉':
                            f10s();
                            break;
                        case '👈':
                            b10s();
                            break;
                    }
                    // confidence = 0;
                }
                setTimerProgress(confidence < 20 ? confidence / 20 : 1);
                if (confidence > 20) confidence = -2;
            }

            // update debug info
            updateDebugInfo(est.poseData);
        }

        // ...and so on
        setTimeout(() => {
            estimateHands();
            showTimer(false);
        }, 40);
    };

    estimateHands();
    console.log("Starting predictions");
}

async function initCamera(width, height, fps) {

    const constraints = {
        audio: false,
        video: {
            facingMode: "user",
            width: width,
            height: height,
            frameRate: {
                max: fps
            }
        }
    };

    const video = document.querySelector("#pose-video");
    video.width = width;
    video.height = height;

    // get video stream
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;

    return new Promise(resolve => {
        video.onloadedmetadata = () => {
            resolve(video)
        };
    });
}

function drawPoint(ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function updateDebugInfo(data) {
    for (let fingerIdx in data) {
        document.getElementById("curl-" + fingerIdx).innerText = data[fingerIdx][1];
        document.getElementById("dir-" + fingerIdx).innerText = data[fingerIdx][2];
    }
}

window.addEventListener("DOMContentLoaded", () => {

    initCamera(
        config.video.width, config.video.height, config.video.fps
    ).then(video => {
        video.play();
        video.addEventListener("loadeddata", event => {
            console.log("Camera is ready");
            main();
        });
    });

    const canvas = document.querySelector("#pose-canvas");
    canvas.width = config.video.width;
    canvas.height = config.video.height;
    console.log("Canvas initialized");
});

// youtube embed
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        host: "https://www.youtube.com",
        /* no need to specify player 
        size here since it is handled 
        by the player-size div */
        videoId: "FaWIn_wjo6w",
        width: '640',
        height: '480',
        playerVars: {
            enablejsapi: 1,
            playsinline: 1,
            start: 0,
            disablekb: 0
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
}

// auto-play video
function onPlayerReady(event) {
    event.target.playVideo();
  }

function onPlayerStateChange(event) {
    console.log("player state: " + player.getPlayerState());
}

// update youtube video
function updateVideoId() {
    let videoId = document.getElementById("videoId").value;
    player.loadVideoById(videoId, -1);
}

// stop video
function pauseVideo() {
    player.pauseVideo();
}

// play video
function playVideo() {
    player.playVideo();
}

// go back 10 seconds
function b10s() {
    player.seekTo(player.getCurrentTime() - 10, true);
}

// go forward 10s
function f10s() {
    player.seekTo(player.getCurrentTime() + 10, true);
}
