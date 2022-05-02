const CardCollectionHandler = require("../handlers/card.collection.handler");
const PrintsApi = require("../../api/ftp.api/prints");
const CardCodeStore = require("../../classes/CardCodeStore");

async function onCardCollection(message, messageType) {

    let handler = new CardCollectionHandler(message.embeds?.[0]);
    let codeStrings = [];
    if (handler.cardData) {
        for (let i = 0; i < handler.cardData.length; i++) {
            const cardDatum = handler.cardData[i];
            codeStrings.push(cardDatum.code);
            if (parseInt(cardDatum.printNumber) < 100) {
                await PrintsApi.createPrint(cardDatum);
            }
        }
    }

    if (messageType === "update") {
        let reply = CardCodeStore.replyByMessageId.get(message.id);
        let cardCodes = CardCodeStore.storeCodes(message.id, codeStrings);
        if (reply) {
            await reply.edit({
                content: cardCodes.join(", ")
            })
        }
    } else if (messageType === "create") {
        await message.react("✂️");
        const filter = (reaction, user) => {
            return !user.bot && user.id === handler.ownedBy;
        };

        message.awaitReactions({filter, max: 1, time: 60000, errors: ['time']})
            .then(async collected => {
                const reaction = collected.first();
                if (reaction.emoji.name === '✂️') {
                    let reply = await message.reply({
                        content: `${codeStrings.join(", ")}`
                    });
                    CardCodeStore.replyByMessageId.set(message.id, reply);
                    CardCodeStore.storeCodes(message.id, codeStrings);
                }
            })
            .catch(collected => {
                // message.deferUpdate();
            });
    }

}

module.exports = onCardCollection;