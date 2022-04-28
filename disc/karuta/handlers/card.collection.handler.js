const CardLineHandler = require("./card.line.handler");

class CardCollectionHandler {

    constructor(embed) {
        this.embed = embed;
        this.cardData = []
        this.getCardsFromCardCollectionEmbed();
    }

    getCardsFromCardCollectionEmbed() {
        if (this.embed) {
            let split = this.embed.description.split("\n").slice(2);
            if (split[0] === "The list is empty.") {
                return undefined;
            } else {
                this.cardData = split.map(line => {
                    let cardHandler = new CardLineHandler(line)
                    return cardHandler.cardData;
                })
            }
        }
    }
}

module.exports = CardCollectionHandler;