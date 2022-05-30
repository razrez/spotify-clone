import {api, playlistTypes, userTypes} from '../consts.js'

const playlistId = window.location.href.split('/').pop();
let nickname, userId, userType, playlist;

window.addEventListener("load", showPlaylistInfo)

async function showPlaylistInfo(){
    await getPlaylistInfo(playlistId)
        .then(async res => {
            playlist = res;
            await getUserNickname(playlist['userId'])
                .then(res => {
                    if (res)
                        nickname = res[0]['username'];
                    else 
                        nickname = playlist['userId'];
                    
                    userId = playlist['userId'];
                    userType = userTypes[res[0]['userType']];
                }); // TODO: когда дед пофиксит профиль, убрать [0]
        });

    showSongs(playlist)

    let tracksCountWord = playlist['songs'].length > 1 && playlist['songs'].length !== 0 ? " • tracks" : " • track";
    
    // TODO: настроить img у песни, img_src, когда запрос начнет возвращать его
    document.querySelector(".playlist-type").innerText = playlistTypes[playlist['playlistType']];
    document.querySelector(".playlist-name").innerText = playlist['title'];
    let playlistCreator = document.querySelector(".playlist-creator");
    playlistCreator.innerText = nickname;
    if (userType !== "Artist")
        userType = "User";
    playlistCreator.href = `/${userType}/${userId}`;
    document.querySelector("#tracks-amount").innerText = playlist['songs'].length + tracksCountWord;
    
}

async function getUserNickname(id){
    return await fetch(`${api}/profile/user/getProfile/${id}`)
        .then(response => response.json())
        .then(res => res)
        .catch(console.log)
}

async function getPlaylistInfo(id){
    return await fetch(`${api}/playlist/${playlistId}`)
        .then(response => response.json())
        .then(res => res)
        .catch(console.log)
}

function showSongs(playlist){
    let index = 1;
    let songsPlace = document.querySelector("#songs");
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
                    playlistTypes[playlist['playlistType']],
                    "3:02") // TODO: что с этим делать
                    .render());
    })
}

