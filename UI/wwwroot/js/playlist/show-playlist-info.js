import {api, playlistTypes, userTypes} from '../consts.js'
import getUserProfile from "../getUserProfile.js";
import toggleLoading from "../toggleLoading.js";

const playlistId = window.location.href.split('/').pop();
let nickname, userId, userType, playlist;
const   playlistCreator = document.querySelector(".playlist-creator"),
        playlistType = document.querySelector(".playlist-type"),
        playlistName = document.querySelector(".playlist-name"),
        tracksAmount = document.querySelector("#tracks-amount"),
        songsPlace = document.querySelector("#songs"),
        playlistImage = document.querySelector(".playlist-img"),
        playlistInfo = document.querySelector(".playlist-info");

window.addEventListener("load", showPlaylistInfo)

async function showPlaylistInfo() {
    await getPlaylistInfo(playlistId)
        .then(async res => {
            playlist = res;
            await getUserProfile(playlist['userId'])
                .then(res => {
                    if (res)
                        nickname = res['username'];
                    else 
                        nickname = playlist['userId'];
                    
                    userId = playlist['userId'];
                    userType = userTypes[res['userType']];
                }); // TODO: когда дед пофиксит профиль, убрать [0]
        });

    showSongs(playlist)

    let tracksCountWord = playlist['songs'].length !== 1 ? " tracks" : " track";
    
    // TODO: настроить img у песни, img_src, когда запрос начнет возвращать его
    playlistType.innerText = playlistTypes[playlist['playlistType']];
    playlistName.innerText = playlist['title'];
    playlistCreator.innerText = nickname;
    if (userType !== "Artist")
        userType = "User";
    playlistCreator.href = `/${userType}/${userId}`;
    tracksAmount.innerText = " • " + playlist['songs'].length + tracksCountWord;
    document.querySelector('.play-button').addEventListener('click', (e)=>{
        if (e.target && e.target.classList.contains("active")){
            UploadTrack(1, playlist['id']);
        }
        else
            Pause();
    })
    let playBtn = document.querySelector(".play-button");
    
    toggleLoading(playlistImage, playlistInfo);
}

async function getPlaylistInfo(id) {
    return await fetch(`${api}/playlist/${playlistId}`, {
        headers : {
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(response => response.json())
        .then(res => res)
        .catch(console.log)
}

function showSongs(playlist) {
    let index = 1;
    playlist['songs'].forEach(song => {
        songsPlace
            .appendChild(
                new SongCard(
                    index,
                    "TESTS-ARTIST-ALBUM.jpg",
                    song['name'],
                    nickname,
                    song['userId'],
                    playlist['title'],
                    playlist['id'],
                    "3:02", // TODO: что с этим делать
                    song["id"]) 
                    .render());
        index++;
    })
}


