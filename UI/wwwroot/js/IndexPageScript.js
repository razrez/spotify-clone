function load (){
    let container = document.querySelector("#content");
    fetch(apiHost + "/playlists/random?count=2",{
        method: "GET",
        headers : {
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(response => response.json())
        .then((data) => {
            data.map((playlist) => {
                console.log(playlist);
                container
                    .appendChild(new PlaylistCard(playlist.ImgSrc, playlist.Title, playlist.PlaylistType, playlist.Id)
                        .render());

            });
        });
}
$(document).ready(load);
