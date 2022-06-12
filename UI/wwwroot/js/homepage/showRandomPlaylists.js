function showRandomPlaylists (){
    let container = document.querySelector(".playlists");
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
                                '',//playlist['imgSrc'],
                                playlist['title'],
                                playlistTypes[playlist['playlistType']],
                                playlist['id'],
                                nickname['name'] ?? playlist['userId']
                            )
                                .render());
                });
            });
        });
}
$(document).ready(showRandomPlaylists);
$(".home").click(function (){
    $( document ).ajaxStop(showRandomPlaylists);
});
