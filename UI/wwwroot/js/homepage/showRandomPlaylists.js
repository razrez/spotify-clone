import {api, playlistTypes} from '../consts.js';
import getUserNickname from "../getUserNickname.js";

function showRandomPlaylists (){
    let container = document.querySelector(".playlists");
    fetch(api + "/home/random/playlists?count=10",{
        method: "GET",
        headers : {
            // 'Authorization': `Bearer ${getToken()}`
            'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkI3Mzc1RUNFMEU5MEZGODg0MDg0Q0UzNjk4QzlBMjFBRDJCQjkzQTgiLCJ4NXQiOiJ0emRlemc2UV80aEFoTTQybU1taUd0SzdrNmciLCJ0eXAiOiJhdCtqd3QifQ.eyJzdWIiOiI1ZjM0MTMwYy0yZWQ5LTRjODMtYTYwMC1lNDc0ZThmNDhiYWMiLCJuYW1lIjoidXNlcjAxQGdtYWlsLmNvbSIsImVtYWlsIjoidXNlcjAxQGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwib2lfYXVfaWQiOiI3MDY4NGZjYS0yMWQ2LTQ5ZTYtYTQ5Ni03M2VkMTdjNzdmNzQiLCJvaV90a25faWQiOiI2MTkyMmZjMS1iNTg5LTQ2N2EtODdkMS01NmI0YzA1OGNmYzEiLCJzY29wZSI6Im9mZmxpbmVfYWNjZXNzIiwiZXhwIjoxNjU0MDAzNzYyLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDMwLyIsImlhdCI6MTY1NDAwMDE2Mn0.Htyb5GlXCTbJYDviRPV2ssz9WmMp9STekwQO3dBd-3SFtVRN_fM3i8GqRaJuEH83F6VyYk6pc0V0vRyX6f6IlzhgzxrNdldlQocRq0cbqDv3uozdRCqaegEZqBHrv9h4epMZjo925tkbB1Qpf_YV9praFcUksiR8Eh1gtMaf6Fi-CVkFIurX7jlvOWt7vuCYOD3a0bffTN_pRyBXLuyAYt-mwQg-aspPs_BzPyFZ1OflV4DVvcArTqWBW3NchNf7W8AAocFp_8tFijEJg6e7oTgJR5N3ipXOgXZ_YOwpbqdFvQ3JyeFZIRanlLPj11JI2aFR04YFJUdDcefQXYDMMw`
        }
    })
        .then(response => response.json())
        .then((data) => {
            data.map(async (playlist) => {
                await getUserNickname(playlist['userId']).then(nickname => {
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
getUserNickname(123)
$(document).ready(showRandomPlaylists);
