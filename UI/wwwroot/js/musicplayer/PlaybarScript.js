let trackContainer   = document.querySelector(".player-track"),
    trackPosition    = document.querySelector(".player-set"),
    volumeContainer  = document.querySelector(".volume-track"),
    volumePosition   = document.querySelector(".volume-set"),
    playPauseButton     = document.querySelector(".play"),
    forwardButton     = document.querySelector(".step_forward"),
    backButton     = document.querySelector(".step-back"),
    currentTrackTime = document.querySelector("#current"),
    trackDuration     = document.querySelector("#duration"),
    likeButton          = document.querySelector(".like"),
    repeatButton        = document.querySelector(".repeat"),
    shuffleButton       = document.querySelector(".shuffle"),
    playlistButton      = document.querySelector(".bar-playlist-btn"),
    volumeButton        = document.querySelector(".volume"),
    repeatSong       = document.querySelector("#repeat-song"),
    cover       = document.querySelector(".cover"),
    trackName       = document.querySelector(".marquee"),
    artistName       = document.querySelector(".artist");

let audio = new Audio();
let playlist;
let currentSong;
let currentSongArtistName;
let currentSongNumber;
let interval;
const replay = {NoReplay: 0, Song: 1, Playlist: 2}

/*           states         */
let paused = true;
let shuffle = false;
let liked = false;
let mute = false;
let trackDragging = false;
let volumeDragging = false;
let playlistOpen = false;
let playbackState = 0;

let volume;



/*          set audio           */

function UploadTrack(number, playlistId){
    /*currentSong = {number, img, name, artist, artistId, playlist, playlistId, trackId};*/
    GetPlaylist(playlistId)
        .then(async r => playlist = r)
        .then(() =>{
            console.log(playlist)
            fetch(`${apiHost}/profile/getProfile?userId=${playlist['userId']}`, {
                headers : {
                    'Authorization': `Bearer ${getToken()}`
                }
            })
            .then(response => response.json())
            .then(res => {
                console.log(res)
                currentSongArtistName = res['username'];
            })
            .then(() => {
                SetTrack(number-1);
                SetSongInfo();
            });
        })
        
    
}

function SetTrack(numberRR){
    currentSong = playlist['songs'][numberRR];
    currentSongNumber = numberRR;
    SetSongInfo(numberRR);
    SetAudioFileById(currentSong.id);
}

function SetSongInfo() {
    SetSliderPosition(trackPosition, 0);
    currentTrackTime.innerText = '0:00';
    SetCoverByPlaylistId(playlist.id);
    artistName.innerText = currentSongArtistName;
    trackName.innerText = currentSong.name;
    //TODO liked?
    //TODO set url  to artist and playlist
}

audio.addEventListener('loadeddata', () => {
    trackDuration.innerText = GetFormattedTime(audio.duration);
    if(!paused){
        Play();
    }
    // The duration variable now holds the duration (in seconds) of the audio clip
})

audio.addEventListener('ended', () => {
    if(playlist['songs'][currentSongNumber+1]!==undefined)
        SetTrack(currentSongNumber+1);
    // The duration variable now holds the duration (in seconds) of the audio clip
})



/*          control buttons         */

playPauseButton.addEventListener("click", function () {
    PlayPause();
});

likeButton.addEventListener("click", function () {
    if(liked){
        RemoveFromYourLibrary();
    }
    else {
        AddToYourLibrary();
    }
});

shuffleButton.addEventListener("mouseup", function () {
    if(shuffle){
        shuffle = false;
        shuffleButton.firstElementChild.classList.remove("active");
    }
    else {
        shuffle = true;
        shuffleButton.firstElementChild.classList.add("active");
    }
});

playlistButton.addEventListener("click", function () {
    if(playlistOpen){
        playlistOpen = false;
        playlistButton.firstElementChild.classList.remove("active");
    }
    else {
        playlistOpen = true;
        playlistButton.firstElementChild.classList.add("active");
        //TODO get playlist page
    }
});

repeatButton.addEventListener("click", function () {
    if(playbackState === replay.NoReplay){
        playbackState = replay.Playlist;
        repeatButton.firstElementChild.classList.add("active");
        audio.loop = false;
        //TODO replay playlist
    }
    else if(playbackState === replay.Playlist){
        playbackState = replay.Song;
        repeatSong.className = "repeat-song";
        audio.loop = true;
    }
    else if(playbackState === replay.Song){
        playbackState = replay.NoReplay;
        repeatSong.classList.remove("repeat-song")
        repeatButton.firstElementChild.classList.remove("active");
        audio.loop = false;
    }
});

forwardButton.addEventListener('click', function () {
    if(playlist['songs'][currentSongNumber+1]!==undefined)
        SetTrack(currentSongNumber+1);
})

backButton.addEventListener('click', () => {
    if(playlist['songs'][currentSongNumber-1]!==undefined)
        SetTrack(currentSongNumber-1);
})



/*          track position          */

trackContainer.addEventListener('mousedown', function(e) {
    e.preventDefault();
    trackDragging = true;
});

window.addEventListener('mouseup', function() {
    trackDragging = false;
})

window.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (trackDragging) {
        let position = GetSliderPosition(event, trackContainer);
        SetSliderPosition(trackPosition, position);
        currentTrackTime.innerText = GetFormattedTime((position / 100) * audio.duration);
        audio.currentTime = position / 100 * audio.duration;
    }
});



/*          volume setup           */

volumeButton.addEventListener("click", function () {
    if (mute && volume>0) {
        SoundTurnOn();
        volumePosition.style.width = `${volume}px`;
        audio.volume = volume/100;
    } else {
        SoundTurnOff();
        volume = volumePosition.offsetWidth;
        volumePosition.style.width = "0%";
        audio.volume = 0;
    }
});

volumeContainer.addEventListener('mousedown', function(e) {
    e.preventDefault();
    volumeDragging = true;
});

window.addEventListener('mouseup', function() {
    volumeDragging = false;
});

window.addEventListener('mousemove', function(event) {
    event.preventDefault();
    if (volumeDragging) {
        let position = GetSliderPosition(event, volumeContainer);
        SetSliderPosition(volumePosition, position);
        (position <= 0) ? SoundTurnOff() : SoundTurnOn();
        volume = volumePosition.offsetWidth;
        audio.volume = position/100;
    }
});



/*          helpers          */

function SetSliderPosition(slider, position){
    let offset = position;
    if(offset <= 0) {
        offset = 0;
    } else if(offset > 100) {
        offset = 100;
    }
    slider.style.width = `${offset}%`;
}
function GetSliderPosition(event, sliderContainer){
    let position = Math.round(((event.clientX - sliderContainer.offsetLeft) / sliderContainer.offsetWidth) * 100);
    if (position > 100){
        position = 100;
    } 
    if (position < 0){
        position = 0;
    }
    return position;
}

function SoundTurnOff(){
    mute = true;
    volumeButton.firstElementChild.className = "bi bi-volume-mute-fill";
}
function SoundTurnOn(){
    mute = false;
    volumeButton.firstElementChild.className = "bi bi-volume-down-fill";
}

function PlayPause(){
    if(paused){
        Play();
    }
    else {
        Pause();
    }
}
function Play() {
    paused = false;
    audio.play();
    playPauseButton.firstElementChild.className = "play-pause fas fa-pause";
    interval = setInterval(() => {
        currentTrackTime.innerText = GetFormattedTime(Math.round(audio.currentTime));
        trackPosition.style.width = `${100 / audio.duration * audio.currentTime}%`;
    }, 10);
}
function Pause() {
    paused = true;
    audio.pause();
    playPauseButton.firstElementChild.className = "play-pause fas fa-play";
    clearInterval(interval);
}

function AddToYourLibrary(){
    liked = true;
    likeButton.firstElementChild.className = "bi bi-heart-fill";
}
function RemoveFromYourLibrary(){
    liked = false;
    likeButton.firstElementChild.className = "bi bi-heart";
}

function SetAudioFileById(id){
    audio.src = `${apiHost}/files/song?songId=${id}`;
    audio.load();
}
function SetCoverByPlaylistId(id) {
    cover.src = `${apiHost}/files/picture/playlist?playlistId=${id}`;
}
//converts (number)seconds to (string)mm:ss format
function GetFormattedTime(dur){
    let min = (dur - dur%60)/60;
    let sec = ("0"+Math.round(dur%60)).slice(-2);
    return min + ":" + sec;
}

async function GetPlaylist(id){
    return await fetch(`${apiHost}/playlist/${id}`, {
        headers : {
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(response => response.json())
        .catch(console.log)
}
