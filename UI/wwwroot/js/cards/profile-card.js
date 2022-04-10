class ProfileCard { 
    constructor(img, name, type, id) {
        this.img = img;
        this.name = name;
        this.type = type;
        this.id = id;
    }
    
    render() {
        const card = document.createElement("div");
        card.className = "card";
        card.addEventListener("click", () => {
            window.location.href = this.type === "user" ? `/user/${this.id}` : `/artist/${this.id}`;
        });

        let watermark = this.img === "" ?
            `<div class="watermark profile empty"></div>` :
            `<img src="../img/${this.img}" alt="" class="watermark profile"/>`

        card.innerHTML = ` 
            <div class="cover">
                ${watermark}
                <div class="cover-text">
                    <h1 class="cover-title profile">${this.name}</h1>
                </div>
            </div>`

        return card;
    }
}