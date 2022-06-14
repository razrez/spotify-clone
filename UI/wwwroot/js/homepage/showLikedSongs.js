var nickname, userId, userType, playlist;
var playlistCreator = document.querySelector(".playlist-creator"),
    playlistType = document.querySelector(".playlist-type"),
    playlistName = document.querySelector(".playlist-name"),
    tracksAmount = document.querySelector("#tracks-amount"),
    songsPlacePlaylist = document.querySelector("#songs"),
    playlistImage = document.querySelector(".playlist-img"),
    playlistInfo = document.querySelector(".playlist-info");

window.addEventListener("load", showPlaylistInfo)
$( document ).ajaxStop(showPlaylistInfo);

async function showPlaylistInfo() {
    songsPlacePlaylist.innerText = "";
    const user = await fetch(`${api}/auth/validate_token`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    }).then(response => response.json()).then(res => res).catch(() => {
        history.pushState(null, '', "/");
        window.location.href = "/Account/Login";
    });
    
    
    const playlist = await fetch(`${api}/song/getLikedSongs?userId=${user["id"]}`)
        .then(res => res.json()).then(res => res).catch(console.log)
    
    await getUserProfile(user['id'])
        .then(res => {
            if (res)
                nickname = res['username'];
            else
                nickname = playlist['userId'];

            userId = user['id'];
            userType = userTypes[res['userType']];
        });

    showSongsLiked(playlist)

    let tracksCountWord = playlist['songs'].length !== 1 ? " tracks" : " track";
    
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
    
    playlistImage.classList.remove("loading");
    playlistInfo.classList.remove("loading");
}

function showSongsLiked(playlist) {
    songsPlacePlaylist.innerText = "";
    if (playlist.length===0) return;
    let index = 1;
    playlist['songs'].forEach(song => {
        songsPlacePlaylist
            .appendChild(
                new SongCard(
                    index,
                    '',
                    song['name'],
                    nickname,
                    song['userId'],
                    playlist['title'],
                    playlist['id'],
                    "3:02", // TODO: что с этим делать
                    song["id"],
                )
                    .render());
        index++;
    })
}

