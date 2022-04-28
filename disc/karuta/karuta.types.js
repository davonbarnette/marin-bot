const Utils = require("../utils/utils");

const KARUTA_EMBED_TITLES = {
    CARD_DETAILS: "Card Details",
    CARD_COLLECTION: "Card Collection",
}

const KARUTA_COMMANDS = {
    CARD_INFO: "cardInfo",
    CARD_VIEW: "cardView",
    COLLECTION: "collection",
}

const conditionsByNumber = [
    "damaged",
    "poor",
    "good",
    "excellent",
    "mint",
]

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

module.exports = {
    KARUTA_COMMANDS,
    KARUTA_EMBED_TITLES,
    conditionsByNumber,
    lineFieldsByIndex,
}

