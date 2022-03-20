let track       = document.querySelector(".progress-bar"),
    progress    = document.querySelector(".progress"),
    playPause   = document.querySelector(".play"),
    spanCurrent = document.querySelector("#current"),
    spanDuration = document.querySelector("#duration");

let duration = 183;
let paused = true;

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

track.addEventListener("click", function (e){
    let widthclicked = ((e.pageX - this.offsetLeft) / this.offsetWidth) * 100;
    progress.style.width = `${widthclicked}%`;
    spanCurrent.innerText = setTime((widthclicked / 100) * duration);
});
