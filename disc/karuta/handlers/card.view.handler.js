const CardLineHandler = require("./card.line.handler");

class CardViewHandler {

    constructor(embed) {
        this.embed = embed;
        this.getCardFromCardViewEmbed();
    }

    getCardFromCardViewEmbed() {
        if (this.embed) {
            let line = this.embed.description.split("\n")[2];
            let cardHandler = new CardLineHandler(line);
            this.cardData = cardHandler.cardData;
        }
    }
}

module.exports = CardViewHandler;