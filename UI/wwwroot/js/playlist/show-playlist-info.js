import {api, playlistTypes} from '../consts.js'

const playlistId = window.location.href.split('/').pop();
let nickname, playlist;

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
                }); // TODO: когда дед пофиксит профиль, убрать [0]
        });

    showSongs(playlist)

    let tracksCountWord = playlist['songs'].length > 1 && playlist['songs'].length !== 0 ? " tracks" : " track";
    
    // TODO: настроить img у песни, img_src, когда запрос начнет возвращать его
    document.querySelector(".playlist-type").innerText = playlistTypes[playlist['playlistType']];
    document.querySelector(".playlist-name").innerText = playlist['title'];
    document.querySelector(".playlist-creator").innerText = nickname;
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
    let songsPlace = document.querySelector("#songs");
    playlist['songs'].forEach(song => {
        songsPlace
            .appendChild(
                new SongCard(
                    song['id'],
                    "TESTS-ARTIST-ALBUM.jpg",
                    song['name'],
                    nickname,
                    playlist['title'],
                    "3:02") // TODO: что с этим делать
                    .render());
    })
}

