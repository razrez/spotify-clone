class SongCard{
    constructor(number, img="", name, artist, album, time) {
        this.number = number;
        this.img = img;
        this.name = name;
        this.artist = artist;
        this.album = album;
        this.time = time;
    }

    render(){
        const songCard = document.createElement("div");
        songCard.className = "song-card";
        songCard.innerHTML = `
            <div class="song-number">
                <div class="number">${this.number}</div>
                <div class="play-btn">
                    <svg width="20" height="20" viewBox="0 0 16 16" class="bi bi-play-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                    </svg>
                </div>
            </div>
            <div class="song-info">
                <div class="me-3" style="float:left;"> 
                    <img src="../img/${this.img}" width="40" height="40" alt="album card"> 
                </div>  
                <div class="ms-1" style="float:left;">
                    <div class="song-name">${this.name}</div>
                    <a href="#" class="song-artist">${this.artist}</a>
                </div>
            </div>
            
            <div class="song-album">
                <a href="#">${this.album}</a> 
            </div>
            <div class="song-time">
                <span class="me-3">${this.time}</span>              
                <button class="like-btn" id="like-btn">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                    </svg>
                </button>
                <button class="three-dots-menu">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-three-dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                </button>
            </div>
        `;
        return songCard;
    }
}
