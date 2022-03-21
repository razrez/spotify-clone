let track       = document.querySelector(".progress-bar"),
    progress    = document.querySelector(".progress"),
    playPause   = document.querySelector(".play"),
    spanCurrent = document.querySelector("#current"),
    spanDuration = document.querySelector("#duration");

let duration = 183;
let paused = true;
let width;
let dragging = true;

function initTrack(dur){
    duration = dur;
    spanDuration.innerText = setTime(dur);
}

function setTime(dur){
    let min = ("0"+(dur - dur%60)/60).slice(-2);
    let sec = ("0"+Math.round(dur%60)).slice(-2); 
    return min + ":" + sec;
}

playPause.addEventListener("click", function () {
    let icon = document.createElement("i");
    if(paused){
        paused = false;
        icon.className = "play-pause fas fa-play";
        playPause.firstChild.replaceWith(icon);
    }
    else {
        paused = true;
        icon.className = "play-pause fas fa-pause";
        playPause.firstChild.replaceWith(icon);
    }
    initTrack(182);
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
