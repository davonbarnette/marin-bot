const Utils = require("../utils/utils");
const PrintsApi = require("../api/ftp.api/prints");

class KarutaCodeLogger {

    constructor(message) {
        this.message = message;
    }

    getCardData() {
        if (this.message.embeds) {
            let curEmbed = this.message.embeds[0]
            let cardData;

            if (curEmbed && curEmbed.title) {
                if (curEmbed.title === "Card Details") {
                    cardData = this.handleCardDataEmbed(curEmbed);
                } else if (curEmbed.title === "Card Collection") {
                    cardData = this.handleCardCollectionEmbed(curEmbed);
                }
                return cardData;
            }
        }
    }

    async saveCards() {
        let cardData = this.getCardData();
        if (cardData) {
            for (let i = 0; i < cardData.length; i++) {
                const cardDatum = cardData[i];
                if (parseInt(cardDatum.printNumber) < 100) {
                    await PrintsApi.createPrint(cardDatum);
                }
            }
        }
    }

    handleCardDataEmbed(embed) {
        let line = embed.description.split("\n")[0];
        if (line.includes("Owned by")) {
            line = embed.description.split("\n")[2];
        }
        return [this.readLineForCardData(line)];
    }

    handleCardCollectionEmbed(embed) {
        let split = embed.description.split("\n").slice(2);
        if (split[0] === "The list is empty.") {
            return undefined;
        } else {
            return split.map(line => {
                return this.readLineForCardData(line);
            })
        }
    }

    hasWishlistInLine(line) {
        return line.includes("♡");
    }

    readLineForCardData(line) {
        let cardData = {}
        let hasWishlist = this.hasWishlistInLine(line);
        let split = line.split("·");

        if (hasWishlist) {
            split.shift();
        }
        split.forEach((piece, index) => {
            let fieldObj = lineFieldsByIndex[index];
            cardData[fieldObj.name] = fieldObj.parser(piece);
        })
        return cardData;
    }
}

const conditionsByNumber = {
    0: "damaged",
    1: "poor",
    2: "good",
    3: "excellent",
    4: "mint",
}

const lineFieldsByIndex = [
    {
        name: "code",
        parser: (raw) => {
            return raw.split("\`")[1].trim();
        }
    },
    {
        name: "condition",
        parser: (raw) => {
            let starCounter = Utils.counter(raw)["★"];
            if (starCounter) {
                return conditionsByNumber[starCounter];
            } else {
                return conditionsByNumber[0];
            }
        }
    },
    {
        name: "printNumber",
        parser: (raw) => {
            return raw.split("\`")[1].substring(1).trim();
        }
    },
    {
        name: "edition",
        parser: (raw) => {
            return raw.split("\`")[1].substring(1).trim();
        }
    },
    {
        name: "anime",
        parser: (raw) => {
            let toUse = raw;
            if (raw.includes("~~")) {
                toUse = raw.split("~~")[1];
            }
            return toUse.trim();
        }
    },
    {
        name: "name",
        parser: (raw) => {
            return raw.split("**")[1].trim();
        }
    },
]

module.exports = KarutaCodeLogger;