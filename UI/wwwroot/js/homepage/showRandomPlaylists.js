import {api, playlistTypes} from '../consts.js';
import getUserProfile from "../getUserProfile.js";

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
                await getUserProfile(playlist['userId']).then(nickname => {
                    container
                        .appendChild(
                            new PlaylistCard(
                                '',//playlist['imgSrc'],
                                playlist['title'],
                                playlistTypes[playlist['playlistType']],
                                playlist['id'],
                                nickname[0]['username']
                            )
                                .render());
                });
            });
        });
}
$(document).ready(showRandomPlaylists);
