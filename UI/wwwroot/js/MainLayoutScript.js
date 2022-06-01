import {playlistTypes, userTypes, api} from "./consts.js";
import toggleLoading from "./toggleLoading.js";

$(document).ready(function () {
    $('.layout_content').scroll(function () {
        $('.header-overlay').css("opacity", 0 + $('.layout_content').scrollTop() / 200)
    });
    $('.link').click(function () {
        if ($(this).parent().hasClass('link-active')) {
            return false;
        }
        $('.link').removeClass('link-active');
        $(this).addClass('link-active');
    });
    
    $('.dropbtn').click(function (){
        $('#dropdown').toggleClass("show");
    })
    $(window).click(function () {
        if (!event.target.matches('.dropbtn')) {
            let dropdowns = $(".dropdown-content");
            let i;
            for (i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    })
    
});
const searchBar = document.querySelector(".search-bar input");
let lastSearch, resultPlace, genres, linkSearch, 
    playlistsPlace, songsPlace, artistsPlace, usersPlace;

searchBar.addEventListener("keypress", async function (event) {
    if (event.key === 'Enter') {
        if (!window.location.href.toLowerCase().includes('/home/search')) {
            $('#renderBody').load('/home/searchPartial', async function() {
                await showResult();
            });
            window.history.replaceState(null, null, '/Home/Search');
        }
        else {
            if (searchBar.value === lastSearch) {
                return;
            }
            await showResult();
        }
    }
});

searchBar.addEventListener('input', function(event) {
    if (searchBar.value === "") {
        genres.style.display = "block";
        resultPlace.style.display = "none";
        lastSearch = "";
    }
})

async function showResult() {
    resultPlace = document.querySelector(".search-result");
    genres = document.querySelector(".genres-body");
    linkSearch = document.querySelector(".link.search");
    playlistsPlace = document.querySelector(".search-playlists");
    songsPlace = document.querySelector(".search-songs");
    artistsPlace = document.querySelector(".search-artists");
    usersPlace = document.querySelector(".search-users");
    
    let headerPlaylist = document.querySelector(".header-search-playlists"),
        headerSongs = document.querySelector(".header-search-songs"),
        headerArtists = document.querySelector(".header-search-artists"),
        headerUsers = document.querySelector(".header-search-users");
        
    let headers = [headerPlaylist, headerSongs, headerArtists, headerUsers];
    let places = [playlistsPlace, songsPlace, artistsPlace, usersPlace];
    
    linkSearch.classList.add("link-active");
    document.querySelectorAll(".link-active").forEach(el => {
        if (!el.classList.contains("search")) {
            el.classList.remove("link-active");
        }
    });

    headers = headers.map(header => {
        header.style.display = "none";
        setLoadingIfNot(header);
    });
    
    places = places.map(place => {
        place.innerText = "";
    });

    if (searchBar.value && lastSearch !== searchBar.value) {
        genres.style.display = "none";
        resultPlace.style.display = "block";
        lastSearch = searchBar.value;
        
        // playlists
        await fetch(`${api}/search/playlists?input=${searchBar.value}`)
                .then(response => response.json())
                .then(data => {
                    if (data['title']==="Not Found") {
                        toggleLoading(headerPlaylist);
                        headerPlaylist.style.display = "none";
                        return;
                    }
                    data.forEach(playlist => {
                        fetch(`${api}/user/content/name/${playlist['userId']}`)
                            .then(response => response.json())
                            .then(data => {
                                playlistsPlace.appendChild(
                                    new PlaylistCard (
                                        "", // TODO: когда будут карточки
                                        playlist['title'],
                                        playlistTypes[playlist['playlistType']],
                                        playlist['id'],
                                        data['name'] ?? playlist['userId']
                                    ).render()
                                );
                            });
                    });
                    toggleLoading(headerPlaylist);
                    headerPlaylist.style.display = "block";
                })
        
        // songs // TODO: когда будут нормально присылать песни с их плейлистами
        
        // artists
        await fetch(`${api}/search/artists?input=${searchBar.value} `)
                .then(response => response.json())
                .then(data => {
                    if (data['title']==="Not Found") {
                        toggleLoading(headerArtists);
                        headerArtists.style.display = "none";
                        return;
                    }
                    data.forEach(artist => {
                        artistsPlace.appendChild(
                            new ProfileCard(
                                "", // TODO: когда картинки будут присылать
                                artist['username'],
                                userTypes[artist['userType']],
                                artist['userId']
                            ).render()
                        )
                    });
                    toggleLoading(headerArtists);
                    headerArtists.style.display = "block";
                })
        
        // users
        await fetch(`${api}/search/users?input=${searchBar.value} `)
            .then(response => response.json())
            .then(data => {
                if (data['title']==="Not Found") {
                    toggleLoading(headerUsers);
                    headerUsers.style.display = "none";
                    return;
                }
                data.forEach(user => {
                    usersPlace.appendChild(
                        new ProfileCard(
                            "", // TODO: когда картинки будут присылать
                            user['username'],
                            userTypes[user['userType']],
                            user['userId']
                        ).render()
                    )
                });
                toggleLoading(headerUsers);
                headerUsers.style.display = "block";
            })
        
    } else {
        genres.style.display = "block";
        resultPlace.style.display = "none";
    }
}

function setLoadingIfNot(elem) {
    if (!elem.classList.contains("loading"))
        elem.classList.add("loading");
}