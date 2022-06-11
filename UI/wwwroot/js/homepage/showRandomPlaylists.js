import {api, playlistTypes} from '../consts.js';
import getUserProfile from "../getUserProfile.js";
import toggleLoading from "../toggleLoading.js";

function showRandomPlaylists (){
    let container = document.querySelector(".playlists");
    fetch(api + "/home/random/playlists?count=10",{
        method: "GET",
        headers : {
            'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjI4NzI5REM1OTE3Qjc4N0UyMjU1RDY1NkJFQjQ5NUIwMjJDRDA5NkYiLCJ4NXQiOiJLSEtkeFpGN2VINGlWZFpXdnJTVnNDTE5DVzgiLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiI1ZjM0MTMwYy0yZWQ5LTRjODMtYTYwMC1lNDc0ZThmNDhiYWMiLCJuYW1lIjoidXNlcjAxQGdtYWlsLmNvbSIsImVtYWlsIjoidXNlcjAxQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwib2lfYXVfaWQiOiI3YmI3NjNmMy0xNDZjLTQ5OWEtOGYwZi1kOTJiNzBjOWE0NDIiLCJvaV90a25faWQiOiI3N2UzMmUyYi1lZGQ3LTRjZTEtOTgzNy0zZjA3YWQ1Y2JiNDYiLCJzY29wZSI6Im9mZmxpbmVfYWNjZXNzIiwiZXhwIjoxNjU0NDU4NTM1LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDMwLyIsImlhdCI6MTY1NDQ1NDkzNX0.cBaUqM3E_2f2BrZmaoz-hU3gmWbibFiIkf5ZUdNVVnGRZc72SIHlnKnuHYzaolSL03vOEy6Mfm2vhXIVdjVqputD4eVphFy8JM_YrGWrg0DUE7vG_IOqnP9l9xLUkANwM6oXy3ZtaECGV3F5Pg_bblBBZByevekwiOXx6tMrOgnbAom5-ONr-YOl9LoUiwaarHYwWzgwiTJ3eknHW4hsyvGqw5nnQpdYbXL725OuaUjeoem9OGV4jWJJ35TVBoKZM3muBL-_WaB8iFG01VmgdOFrw3_F31MRDQIUKrs8JZIovE_QpSVMAnwgEmN5kugRfnyfvG7LqutI9XTzy082Ww`
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
