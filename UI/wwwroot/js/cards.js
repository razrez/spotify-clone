/**
 * Spotify card 
 * @description If fill first 4 parameters, it will create standard playlist card (used on artist profile).
 * @description If fill all 5 parameters, it will create custom playlist by user (used in search).
 * @description If fill only "title" and "id", it will create custom playlist by user (used in user profile).
 * @param {string} img src for img background, if leave empty string then fill with base gradient
 * @param {string} title title for card
 * @param {string} date date for card
 * @param {string} type ["Album", "Album", "Single", "EP", "PLAYLIST"]
 * @param {int} id id for card
 * @param {string} user by user for card
 */
class Card {
    constructor(img = "", title, date, type = "", id, user = "") {
        this.img = img;
        this.title = title;
        this.date = !date ? "" : date + " •";
        this.type = type;
        this.id = id;
        this.user = user;
    }
    
    /**
     * render created card
     * @returns {Element} - html element of card
     */
    render() {
        const card = document.createElement("div");
        card.className = "card";
        card.addEventListener("click", (e) => {
            if (e.target && e.target.classList.contains("button-on-card")) {
                e.stopPropagation();
                e.target.classList.toggle("card-active")
            }
            else 
                window.location.href = `/album/${this.id}`;
        });
        
        let cover = !this.user ? 
            `<h2 class="cover-description">${this.date} ${this.type}</h2>` :
            `<h2 class="cover-description">By ${this.user} 
                <span class="playlist-marker">${this.type}</span>
            </h2>`
        
        let watermark = this.img === "" ? 
            `<div class="watermark empty"></div>` :
            `<img src="../img/${this.img}" alt="" class="watermark"/>
` 
        
        card.innerHTML = ` 
            <div class="cover">
                ${watermark}
                <div class="button-on-card"></div> <!--can be made active with "card-active" class-->
                <div class="cover-text">
                    <h1 class="cover-title">${this.title}</h1>
                    ${cover}
                </div>
            </div>`
        
        return card;
    }
}