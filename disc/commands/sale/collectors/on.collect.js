const SaleListingsApi = require("../../../api/ftp.api/sale.listing");

async function onCollect(
    buttonInteraction,
    saleHelper,
    parentReply,
    parentInteraction,
    discordUserId,
    printId,
) {
    await saleHelper.executeAction(buttonInteraction.customId);

    let data = {
        listingDiscordUserId: discordUserId,
        currency: saleHelper.saleOptionsHandler.currency,
        quantity: saleHelper.saleOptionsHandler.quantity,
        print: printId,
    }
    console.log('data', data);


    let listing = await SaleListingsApi.createSaleListing(data)
    console.log('listing', listing)

    if (listing) {
        await parentInteraction.editReply({
            content: `<@${parentInteraction.user.id}>, your sale listing was successful.`,
            embeds: [saleHelper.getSaleEmbed(true)],
            components: [],
            fetchReply: true
        });
    } else {
        await parentInteraction.editReply({
            content: `<@${parentInteraction.user.id}>, your sale listing was not successful.`,
            embeds: [saleHelper.getSaleEmbed(false)],
            components: [],
            fetchReply: true
        });
    }

    await buttonInteraction.deferUpdate();
}

module.exports = onCollect;