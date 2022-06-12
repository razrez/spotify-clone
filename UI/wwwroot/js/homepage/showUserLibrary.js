async function showUserLibrary() {
    let container = document.querySelector(".playlists");
    fetch(`${api}/auth/validate_token`,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
        })
        .then(response => response.json())
        .then(async res => {
            await fetch(`${api}/user/content/playlists/${res['id']}`)
                .then(response => response.json())
                .then(playlists => {
                    playlists.map(playlist => {
                        container.appendChild(new PlaylistCard(
                            (playlist['imgSrc'] ?? ""),
                            playlist['title'],
                            playlistTypes[playlist['playlistType']],
                            playlist['id'],
                            (playlist['username'] ?? playlist['userId']))
                            .render()
                        )   
                    })
                })
        });
    toggleLoading(document.querySelector(".playlists-header"))
}

$(document).ready(showUserLibrary);
$(".home").click(function (){
    $( document ).ajaxStop(showUserLibrary);
});

