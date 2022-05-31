import {api, playlistTypes} from '../consts.js';
import getUserProfile from "../getUserProfile.js";
import toggleLoading from "../toggleLoading.js";

function showRandomPlaylists (){
    let container = document.querySelector(".playlists");
    fetch(api + "/home/random/playlists?count=10",{
        method: "GET",
        headers : {
            //'Authorization': `Bearer ${getToken()}`
            'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkI3Mzc1RUNFMEU5MEZGODg0MDg0Q0UzNjk4QzlBMjFBRDJCQjkzQTgiLCJ4NXQiOiJ0emRlemc2UV80aEFoTTQybU1taUd0SzdrNmciLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiI1ZjM0MTMwYy0yZWQ5LTRjODMtYTYwMC1lNDc0ZThmNDhiYWMiLCJuYW1lIjoidXNlcjAxQGdtYWlsLmNvbSIsImVtYWlsIjoidXNlcjAxQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwib2lfYXVfaWQiOiJlY2UwOTdlZS1hNzc2LTRhMTYtOWQ2Yy02OTdmOWFmZTM4YjYiLCJvaV90a25faWQiOiJkODA0NjI3YS1lNmNiLTQ5NzEtYTYyNC0wY2VmNjExNTAxNmQiLCJzY29wZSI6Im9mZmxpbmVfYWNjZXNzIiwiZXhwIjoxNjU0MDA4NDU1LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDMwLyIsImlhdCI6MTY1NDAwNDg1NX0.apgKA9OoBGKLO3Joe_4iaBsHXPDp4CHfz2VR37dusKiDMKOefXKnbLQqYeLfs8XdPYbNBX-kyOxxP7UvNOA6SGU1XVk7gCdjclpEAsL7PPSVbJqqJQXUH0CZXDUmJQRK9iYwuxrab6SGvWpa9CF3zOhIPzhrawHyyPWrA2Otg-Zm7ucWIfy0OK3z2DrThQbjejmDavgZ4aNYZh_wRPK5cEm8Q_OlHTyVU4lWpeLHnc0puKHfMQDSSbM8UNyqStBlIukeGWmZH22UvvRkVm1k5dKAR4J64im9DG4kU2pvdaEJsrXYZAkZIipOZVu4DYZpNBYeGWTZcMY-F-B6ftnU2g`
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
            toggleLoading(document.querySelector(".playlists-header"));
        });
}
$(document).ready(showRandomPlaylists);
