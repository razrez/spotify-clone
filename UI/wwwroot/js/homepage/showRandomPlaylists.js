import {api, playlistTypes} from '../consts.js';
import getUserProfile from "../getUserProfile.js";
import toggleLoading from "../toggleLoading.js";

function showRandomPlaylists (){
    let container = document.querySelector(".playlists");
    fetch(api + "/home/random/playlists?count=10",{
        method: "GET",
        headers : {
            'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkI3Mzc1RUNFMEU5MEZGODg0MDg0Q0UzNjk4QzlBMjFBRDJCQjkzQTgiLCJ4NXQiOiJ0emRlemc2UV80aEFoTTQybU1taUd0SzdrNmciLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiI1ZjM0MTMwYy0yZWQ5LTRjODMtYTYwMC1lNDc0ZThmNDhiYWMiLCJuYW1lIjoidXNlcjAxQGdtYWlsLmNvbSIsImVtYWlsIjoidXNlcjAxQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwib2lfYXVfaWQiOiJhZGM0YzUxZi0wZWFkLTQ1YjktOTVlMC0wMTc4ZDU1ZmVjODciLCJvaV90a25faWQiOiJiNDI4MjU1ZC1jNTg3LTQ2NjAtOWE5Mi0yOTRkOWEwMjczODIiLCJzY29wZSI6Im9mZmxpbmVfYWNjZXNzIiwiZXhwIjoxNjU0MTg4ODUwLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDMwLyIsImlhdCI6MTY1NDE4NTI1MH0.1mNFFzWFbQBFnqqXTdAE3ektDnOifut3b_3Ks5FN39DiYglARAlQIvElaO19x4yCzTboYwg-Re__qYr09hs2dCKkKTzB150CQp23LXEk6SOwMYKZ1WfY6m-3loPpOL5RA33ooJWLa7PGz3nQzfF9tLR8ex3lz_hv4tLhUrsUMggvXqmhRJk7p_bQdqy2of6VaG96hAuLiVTzRlL9PTymXGI4J_hbHbwPhc0dxG1CTpxH05Ib2YNgE-tBkR7GeBhQJePOs29xITVpzpBoeZhQvW6ORE6qLso6lDQ3dU1dsbDpyQAKfFAOvPb4V-M5rSy-D9FiKklLiU-HabaS10EPVw`
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
                            new PlaylistCard(
                                '',//playlist['imgSrc'],
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
