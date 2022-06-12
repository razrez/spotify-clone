function showRandomPlaylists (){
    let container = document.querySelector(".playlists");
    fetch(api + "/home/random/playlists?count=10",{
        method: "GET",
        headers : {
            'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkI3Mzc1RUNFMEU5MEZGODg0MDg0Q0UzNjk4QzlBMjFBRDJCQjkzQTgiLCJ4NXQiOiJ0emRlemc2UV80aEFoTTQybU1taUd0SzdrNmciLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiI1ZjM0MTMwYy0yZWQ5LTRjODMtYTYwMC1lNDc0ZThmNDhiYWMiLCJuYW1lIjoidXNlcjAxQGdtYWlsLmNvbSIsImVtYWlsIjoidXNlcjAxQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwib2lfYXVfaWQiOiIwMjA2NWFjOC1jN2ExLTRmZWMtYTg0Ny1iMGQxMTBiOWIzYjciLCJvaV90a25faWQiOiI2MjMzMzQ2YS0xZjkxLTQxYzQtODZiZS05MTg5MTdkZGIxNWQiLCJzY29wZSI6Im9mZmxpbmVfYWNjZXNzIiwiZXhwIjoxNjU1MDQ5MzkxLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDMwLyIsImlhdCI6MTY1NTA0NTc5MX0.fChNkaW4N12V8McvMtTXz520Fs1URJnvgt63tGHzPGIH1isxikbOBE49llfMg53dRc52JvIg1kBoKFy0wRA6Z79GvEQnRwFBsuhf-N5KixfMwOYv2YckQMz7NXAfKG8jX7D5iWDoKFTRsEYu7Dtg8vIl1tAavFxdPOfiTmdCM267EGDCrDv6yikjVw1zi_VGajorrrTBJyNYE_6o7T3rzEZrVWmcxP2JmGpJEZ-ijIdilwhvLxUoR1QGO9UHmrMBqcbLxUkOPaqCzl9cDqZ-sXxwUjCHjScjD5oPYoaWR_2uXP7C-IkQ8r2C3rTcYxaFjzjDeCf_ISQJaYADKOsAHg`
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
            toggleLoading(document.querySelector(".playlists-header"));
        });
}
$(document).ready(showRandomPlaylists);
$(".home").click(function (){
    $( document ).ajaxStop(showRandomPlaylists);
});
