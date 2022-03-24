class Card {
    constructor(img, title, date, type) {
        this.img = img;
        this.title = title;
        this.date = date;
        this.type = type;
    }
    
    render() {
        const card = document.createElement("div");
        card.className = "card";
        card.addEventListener("mouseover", () => {

        })
        card.innerHTML = ` 
            <div class="cover">
                <img src="../img/${this.img}" alt="" class="watermark"/>
                <div class="button-card"></div> <!--can be made with "card-active" class-->
                <div class="cover-text">
                    <h1 class="cover-title">${this.title}</h1>
                    <h2 class="cover-description">${this.date} • ${this.type}</h2>
                </div>
            </div>`
        
        return card;
    }
}