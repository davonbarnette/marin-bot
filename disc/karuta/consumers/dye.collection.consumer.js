const DyeCollectionHandler = require("../handlers/dye.collection.handler");
const DyeCodeStore = require("../../classes/DyeCodeStore");

async function onDyeCollection(message, messageType) {

    let handler = new DyeCollectionHandler(message.embeds?.[0]);
    let codeStrings = [];
    if (handler.dyeData) {
        for (let i = 0; i < handler.dyeData.length; i++) {
            const dyeDatum = handler.dyeData[i];
            if (!dyeDatum.name.includes("Mystic")){
                codeStrings.push(dyeDatum.code);
            }
            // if (parseInt(dyeDatum.printNumber) < 100) {
            //     await PrintsApi.createPrint(dyeDatum);
            // }
        }
    }

    if (messageType === "update") {
        let reply = DyeCodeStore.replyByMessageId.get(message.id);
        DyeCodeStore.storeCodes(message.id, codeStrings);
        if (reply) {
            await reply.edit({
                content: DyeCodeStore.getCodesAsString(message.id)
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
                    DyeCodeStore.storeCodes(message.id, codeStrings);
                    let reply = await message.reply({
                        content: DyeCodeStore.getCodesAsString(message.id)
                    });
                    DyeCodeStore.replyByMessageId.set(message.id, reply);
                }
            })
            .catch(collected => {
                // message.deferUpdate();
            });
    }
}

module.exports = onDyeCollection;