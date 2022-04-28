const CardInfoHandler = require("../handlers/card.info.handler");
const PrintsApi = require("../../api/ftp.api/prints");
const {MessageEmbed} = require("discord.js");

async function onCardInfo(message) {

    let cardHasBeenSynced = false;

    // Log card info if print is less than 100 on any kci.
    let handler = new CardInfoHandler(message.embeds?.[0]);
    if (handler.cardData && handler.cardData.printNumber < 100) {
        await PrintsApi.upsertPrint(handler.cardData);
        cardHasBeenSynced = true;
    }

    await message.react("🏦");
    const filter = (reaction, user) => {
        return !user.bot && user.id === handler.cardData.ownedBy;
    };
    message.awaitReactions({filter, max: 1, time: 60000, errors: ['time']})
        .then(async collected => {
            const reaction = collected.first();

            if (reaction.emoji.name === '🏦') {
                const {code, name, anime, imageUrl} = handler.cardData;
                // Manually log card for auction listing.
                if (!cardHasBeenSynced) {
                    await PrintsApi.upsertPrint(handler.cardData);
                }
                let messageEmbed = new MessageEmbed()
                    .setTitle(`Auction / Sale Listing`)
                    .setDescription(`Your card, **${name}** from _${anime}_ with code \`${code}\`, is now ready for listing. \n\nTo complete your card listing, use the slash command \`/auction\` or \`/sale\`.`)
                    .setColor("ORANGE")
                    .setThumbnail(imageUrl)

                message.reply({
                    content: `<@${handler.cardData.ownedBy}>, your card is ready to be listed`,
                    embeds: [messageEmbed],
                });
            }
        })
        .catch(collected => {

        });
}

module.exports = onCardInfo;