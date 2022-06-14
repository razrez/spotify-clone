function showRandomPlaylists (){
    let container = document.querySelector(".playlists");
    let playlistHeader = document.querySelector(".playlists-header");
    
    fetch(api + "/home/random/playlists?count=10",{
        method: "GET",
        headers : {
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(response => response.json())
        .then((data) => {
            data.map(async (playlist) => {
                await fetch(api +'/user/content/name/' + playlist['userId'])
                    .then(res => res.json())
                    .then(nickname => {
                    container
                        .appendChild(
                            new PlaylistCard (
                                (playlist['imgSrc'] === "null" ? "" : `${api}/files/picture/playlist?playlistId=${playlist['id']}`),
                                playlist['title'],
                                playlistTypes[playlist['playlistType']],
                                playlist['id'],
                                nickname['name'] ?? playlist['userId']
                            )
                                .render());
                });
            });
            if (playlistHeader.classList.contains("loading")){
                playlistHeader.classList.remove("loading");
            };
        });
}

$(document).ready(showRandomPlaylists);

$(".home").click(function (){
    $( document ).ajaxStop(showRandomPlaylists);
});
