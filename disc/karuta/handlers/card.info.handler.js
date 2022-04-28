const CardLineHandler = require("./card.line.handler");

class CardInfoHandler {

    constructor(embed) {
        this.embed = embed;
        this.cardData = undefined;
        this.getCardFromCardInfoEmbed();
    }

    getCardFromCardInfoEmbed() {
        if (this.embed) {
            let line = this.embed.description.split("\n")[0];
            let cardLineHandler = new CardLineHandler(line);
            this.cardData = cardLineHandler.cardData;
            this.cardData = {
                ...this.cardData,
                ...this.getExtraneousCardData(),
                imageUrl: this.embed.thumbnail.url,
            }
        }
    }

    getExtraneousCardData(){
        let lines = this.embed.description.split("\n");
        let extraneousCardData = {};
        lines.forEach(line => {
            if (line.startsWith("Dropped in") && !line.startsWith("Dropped in server ID")){
                extraneousCardData["dropCondition"] = line.split("**")[1];
            } else if (line.startsWith("Owned by")){
                extraneousCardData["ownedBy"] = line.split("@")[1].slice(0, -1);
            } else if (line.startsWith("Grabbed after")){
                extraneousCardData["grabbedAfter"] = parseFloat(line.split("**")[1]);
            } else if (line.startsWith("Dropped on")){
                extraneousCardData["droppedOn"] = new Date(parseInt(line.split("<t:")[1].slice(0, -1)) * 1000).toISOString();
            }
        })
        return extraneousCardData;
    }

    parseDroppedOn(){

    }
}

module.exports = CardInfoHandler;