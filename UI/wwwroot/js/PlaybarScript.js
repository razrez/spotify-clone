let track       = document.querySelector(".progress-bar"),
    progress    = document.querySelector(".progress"),
    playPauseBtn   = document.querySelector(".play"),
    playPauseIcon   = document.querySelector("#play-pause"),
    spanCurrent = document.querySelector("#current"),
    spanDuration = document.querySelector("#duration"),
    likeBtn        = document.querySelector(".like"),
    likeIcon        = document.querySelector("#like");

let duration = 183;
let paused = true;
let liked = false;
let width;
let dragging = false;

function initTrack(dur){
    duration = dur;
    spanDuration.innerText = setTime(dur);
}

function setTime(dur){
    let min = ("0"+(dur - dur%60)/60).slice(-2);
    let sec = ("0"+Math.round(dur%60)).slice(-2); 
    return min + ":" + sec;
}

playPauseBtn.addEventListener("click", function () {
    if(paused){
        paused = false;
        playPauseIcon.className = "play-pause fas fa-play";
    }
    else {
        paused = true;
        playPauseIcon.className = "play-pause fas fa-pause";
    }
    initTrack(182);
});

likeBtn.addEventListener("click", function () {
    if(liked){
        liked = false;
        likeIcon.className = "bi bi-heart";
    }
    else {
        liked = true;
        likeIcon.className = "bi bi-heart-fill";
    }
});

track.addEventListener('mousedown', function(e) {
    // knob offset relatively to track
    /*track = e.clientX - track.offsetLeft;*/
    dragging = true;
});

window.addEventListener('mouseup', function(e) {
    dragging = false;
})

window.addEventListener('mousemove', function(e) {
    if (dragging) {
         // current knob offset, relative to track
        let offset = ((e.clientX - track.offsetLeft) / track.offsetWidth) * 100;
        if(offset < 0) {
            offset = 0;
        } else if(offset > 100) {
            offset = 100;
        }
        progress.style.width = `${offset}%`;
        spanCurrent.innerText = setTime((offset / 100) * duration);
    }
});
