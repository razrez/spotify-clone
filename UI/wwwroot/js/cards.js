class Card {
    constructor(img, title, date, type = "", id, user = "") {
        this.img = img;
        this.title = title;
        this.date = !date ? "" : date + " •";
        this.type = type;
        this.id = id;
        this.user = user;
    }
    
    render() {
        const card = document.createElement("div");
        card.className = "card";
        card.addEventListener("click", () => {
            window.location.href = `/album/${this.id}`;
        });
        
        let cover = !this.user ? 
            `<h2 class="cover-description">${this.date} ${this.type}</h2>` :
            `<h2 class="cover-description">By ${this.user} 
                <span class="playlist-marker">${this.type}</span>
            </h2>`
        card.innerHTML = ` 
            <div class="cover">
                <img src="../img/${this.img}" alt="" class="watermark"/>
                <div class="button-card"></div> <!--can be made with "card-active" class-->
                <div class="cover-text">
                    <h1 class="cover-title">${this.title}</h1>
                    ${cover}
                </div>
            </div>`
        
        return card;
    }
}