const CardCollectionHandler = require("../handlers/card.collection.handler");
const PrintsApi = require("../../api/ftp.api/prints");

async function onCardCollection(message) {

    let handler = new CardCollectionHandler(message.embeds?.[0]);
    if (handler.cardData) {
        for (let i = 0; i < handler.cardData.length; i++) {
            const cardDatum = handler.cardData[i];
            if (parseInt(cardDatum.printNumber) < 100) {
                await PrintsApi.createPrint(cardDatum);
            }
        }
    }
}

module.exports = onCardCollection;