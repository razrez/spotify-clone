let track       = document.querySelector(".player-track"),
    progress    = document.querySelector(".player-set"),
    playPauseBtn   = document.querySelector(".play"),
    spanCurrent = document.querySelector("#current"),
    spanDuration = document.querySelector("#duration"),
    likeBtn        = document.querySelector(".like"),
    repeatBtn   = document.querySelector(".repeat"), 
    shuffleBtn  = document.querySelector(".shuffle"),
    playlistBtn = document.querySelector(".playlist"),
    volumeBtn = document.querySelector(".volume"),
    volumeBar = document.querySelector(".volume-track"),
    volumeSet = document.querySelector(".volume-set"),
    repeatSong = document.querySelector("#repeat-song");
    

let duration = 183;
let paused = true;
let repeat = 0;
let shuffle = false;
let liked = false;
let mute = false;
let volume;
let width;
let trackDragging = false;
let volumeDragging = false;
let playlistOpen = false;

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
        playPauseBtn.firstElementChild.className = "play-pause fas fa-pause";        
    }
    else {
        paused = true;
        playPauseBtn.firstElementChild.className = "play-pause fas fa-play";
    }
    initTrack(182);
});

volumeBtn.addEventListener("click", function () {
    if (mute) {
        mute = false;
        volumeSet.style.width = `${volume}px`;
        volumeBtn.firstElementChild.className = "bi bi-volume-down-fill";
    } else {
        mute = true;
        volume = volumeSet.offsetWidth;
        volumeSet.style.width = "0%";
        volumeBtn.firstElementChild.className = "bi bi-volume-mute-fill";
    }
});

likeBtn.addEventListener("click", function () {
    if(liked){
        liked = false;
        likeBtn.firstElementChild.className = "bi bi-heart";
    }
    else {
        liked = true;
        likeBtn.firstElementChild.className = "bi bi-heart-fill";
    }
});

shuffleBtn.addEventListener("click", function () {
    if(shuffle){
        shuffle = false;
        shuffleBtn.firstElementChild.classList.remove("active");
    }
    else {
        shuffle = true;
        shuffleBtn.firstElementChild.classList.add("active");
    }
});

playlistBtn.addEventListener("click", function () {
    if(playlistOpen){
        playlistOpen = false;
        playlistBtn.firstElementChild.classList.remove("active");
    }
    else {
        playlistOpen = true;
        playlistBtn.firstElementChild.classList.add("active");
    }
});

repeatBtn.addEventListener("click", function () {
    if(repeat === 0){
        repeat = 1;
        repeatBtn.firstElementChild.classList.add("active");
    }
    else if(repeat === 1){
        repeat = 2;
        repeatSong.className = "repeat-song";
    }
    else {
        repeat = 0;
        repeatSong.classList.remove("repeat-song")
        repeatBtn.firstElementChild.classList.remove("active");
    }
});

track.addEventListener('mousedown', function(e) {
    e.preventDefault();
    trackDragging = true;
});

window.addEventListener('mouseup', function(e) {
    trackDragging = false;
})

window.addEventListener('mousemove', function(e) {
    e.preventDefault();
    if (trackDragging) {
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

volumeBar.addEventListener('mousedown', function(e) {
    e.preventDefault();
    volumeDragging = true;
});

window.addEventListener('mouseup', function(e) {
    volumeDragging = false;
})

window.addEventListener('mousemove', function(e) {
    e.preventDefault();
    if (volumeDragging) {
        let offset = ((e.clientX - volumeBar.offsetLeft) / volumeBar.offsetWidth) * 100;
        if(offset <= 0) {
            mute = true;
            volumeBtn.firstElementChild.className = "bi bi-volume-mute-fill";
            offset = 0;
        } else if(offset > 100) {
            offset = 100;
        }
        if(offset>0){
            mute = false;
            volumeBtn.firstElementChild.className = "bi bi-volume-down-fill";
        }
        volumeSet.style.width = `${offset}%`;
    }
});
