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
        
        card.innerHTML = ` 
            <div class="cover">
                <img src="../img/${this.img}" alt="" class="watermark"/>
                <div class="button-on-card"></div> <!--can be made active with "card-active" class-->
                <div class="cover-text">
                    <h1 class="cover-title">${this.title}</h1>
                    ${cover}
                </div>
            </div>`
        
        return card;
    }
}