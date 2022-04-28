const SaleHelper = require("./utils/sale.helper");
const SaleOptionsHandler = require("./options/sale.options.handler");
const PrintsApi = require("../../api/ftp.api/prints");
const onCollect = require("./collectors/on.collect");
const onEnd = require("./collectors/on.end");

module.exports = async (parentInteraction, client, discordUserId) => {
    let options = parentInteraction.options._hoistedOptions;
    let saleOptionsHandler = new SaleOptionsHandler(options, discordUserId);

    let res = await PrintsApi.getPrints({
        filters: {
            code: saleOptionsHandler.code,
        }
    })

    if (res && res.data.length === 1) {
        let card = res.data[0];
        let saleHelper = new SaleHelper(saleOptionsHandler, discordUserId, card);

        saleHelper.setActions([[
            {id: "cancel", label: "Cancel", style: "DANGER", execute: async () => null},
            {id: "confirm", label: "Confirm", style: "SUCCESS", execute: async () => null},
        ]])

        let parentReply = await parentInteraction.reply({
            content: `<@${parentInteraction.user.id}>, you've initiated a sale listing.`,
            embeds: [saleHelper.getSaleEmbed()],
            components: saleHelper.discordComponentRows,
            fetchReply: true
        });

        const collector = parentInteraction.channel.createMessageComponentCollector({
            filter: (i) => !i.user.bot && i.user.id === discordUserId,
            componentType: "BUTTON",
            time: 60000
        });

        collector.on('collect', async i => {
            await onCollect(i, saleHelper, parentReply, parentInteraction, discordUserId, card.id)
            collector.stop("userFinished");
        });
        collector.on('end', (c, r) => {
            if (!r || r !== "userFinished"){
                onEnd(c, r, parentInteraction)
            }
        });
    }
}





