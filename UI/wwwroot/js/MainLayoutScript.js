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
let resultPlace, genresPlace, linkSearch, 
    playlistsPlace, songsPlace, artistsPlace, usersPlace;

let headerPlaylist, headerSongs, headerArtists, headerUsers, headerNothing, headers;

let somethingFound = false;

searchBar.addEventListener("keypress", async function (event) {
    if (event.key === 'Enter') {
        if (!window.location.href.toLowerCase().includes('/home/search')) {
            $('#renderBody').load('/home/searchPartial', async function() {
                setHeaders();
                await showResult()
                    .then(() => {
                        if (!somethingFound) {
                            headerNothing.style.display = "block";
                        }
                    });
            });
            window.history.replaceState(null, null, '/Home/Search');
        }
        else {
            setHeaders();
            await showResult()
                .then(() => {
                    if (!somethingFound) {
                        headerNothing.style.display = "block";
                    }
                });
        }
    }
});

searchBar.addEventListener('input', function(event) {
    if (searchBar.value === "") {
        genresPlace.style.display = "block";
        resultPlace.style.display = "none";
    }
})

async function showResult() {
    resultPlace = document.querySelector(".search-result");
    genresPlace = document.querySelector(".genres-body");
    linkSearch = document.querySelector(".link.search");
    playlistsPlace = document.querySelector(".search-playlists");
    songsPlace = document.querySelector(".search-songs");
    artistsPlace = document.querySelector(".search-artists");
    usersPlace = document.querySelector(".search-users");
    
    let places = [playlistsPlace, songsPlace, artistsPlace, usersPlace];
    
    linkSearch.classList.add("link-active");
    document.querySelectorAll(".link-active").forEach(el => {
        if (!el.classList.contains("search")) {
            el.classList.remove("link-active");
        }
    });

    headers = headers.map(header => {
        header.style.display = "block";
        setLoadingIfNot(header);
    });
    
    places = places.map(place => {
        place.innerText = "";
    });

    if (searchBar.value) {
        genresPlace.style.display = "none";
        resultPlace.style.display = "block";
        
        // playlists
        await fetch(`${api}/search/playlists?input=${searchBar.value}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length===0) {
                        toggleLoading(headerPlaylist);
                        headerPlaylist.style.display = "none";
                        return;
                    }
                    data.forEach(playlist => {
                        fetch(`${api}/user/content/name/${playlist['userId']}`)
                            .then(response => response.json())
                            .then(data => {
                                console.log(playlist['imgSrc'])
                                playlistsPlace.appendChild(
                                    new PlaylistCard (
                                        (playlist['imgSrc']
                                            ? "" 
                                            : `${api}/files/picture/playlist?playlistId=${playlist['id']}`),
                                        playlist['title'],
                                        playlistTypes[playlist['playlistType']],
                                        playlist['id'],
                                        data['name'] ?? playlist['userId']
                                    ).render()
                                );
                            });
                    });
                    somethingFound = true;
                    toggleLoading(headerPlaylist);
                    headerPlaylist.style.display = "block";
                });

        let index = 1;
        // songs
        await fetch(`${api}/search/songs?input=${searchBar.value} `)
            .then(response => response.json())
            .then(data => {
                if (data.length===0) {
                    toggleLoading(headerSongs);
                    headerSongs.style.display = "none";
                    return;
                }
                
                data.forEach(async song => {
                    await fetch(`${api}/user/content/name/${song['userId']}`)
                        .then(response => response.json())
                        .then(nickname => {
                            songsPlace.appendChild(
                                new SongCard(
                                    index,
                                    `${api}/files/picture/playlist?playlistId=${song['originPlaylistId']}`,
                                    song['name'],
                                    nickname['name'] ?? song['userId'],
                                    song['userId'],
                                    song['originPlaylistTitle'],
                                    song['originPlaylistId'],
                                    "2:28"
                                ).render()
                            )
                            index++;
                        });
                });
                
                somethingFound = true;
                toggleLoading(headerSongs);
                headerSongs.style.display = "block";
            });
        
        // artists
        await fetch(`${api}/search/artists?input=${searchBar.value} `)
                .then(response => response.json())
                .then(data => {
                    if (data.length===0) {
                        toggleLoading(headerArtists);
                        headerArtists.style.display = "none";
                        return;
                    }
                    data.forEach(artist => {
                        artistsPlace.appendChild(
                            new ProfileCard(
                                (artist['profileImg'] 
                                        ?`${api}/files/picture/user?userId=${artist['userId']}`
                                        : ""),
                                artist['username'],
                                userTypes[artist['userType']],
                                artist['userId']
                            ).render()
                        )
                    });
                    somethingFound = true;
                    toggleLoading(headerArtists);
                    headerArtists.style.display = "block";
                })
        
        // users
        await fetch(`${api}/search/users?input=${searchBar.value} `)
            .then(response => response.json())
            .then(data => {
                if (data.length===0) {
                    toggleLoading(headerUsers);
                    headerUsers.style.display = "none";
                    return;
                }
                data.forEach(user => {
                    usersPlace.appendChild(
                        new ProfileCard(
                            (user['profileImg']
                                ?`${api}/files/picture/user?userId=${user['userId']}`
                                : ""),
                            user['username'],
                            userTypes[user['userType']],
                            user['userId']
                        ).render()
                    )
                });
                somethingFound = true;
                toggleLoading(headerUsers);
                headerUsers.style.display = "block";
            })
        
    } else {
        genresPlace.style.display = "block";
        resultPlace.style.display = "none";
    }
}

function setLoadingIfNot(elem) {
    if (!elem.classList.contains("loading"))
        elem.classList.add("loading");
}

function setHeaders() {
    headerPlaylist = document.querySelector(".header-search-playlists"),
        headerSongs = document.querySelector(".header-search-songs"),
        headerArtists = document.querySelector(".header-search-artists"),
        headerUsers = document.querySelector(".header-search-users"),
        headerNothing = document.querySelector(".empty-result");

    headers = [headerPlaylist, headerSongs, headerArtists, headerUsers];

    headerNothing.style.display = "none";
}