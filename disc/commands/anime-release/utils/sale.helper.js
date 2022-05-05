const ButtonActionsHandler = require("../../../utils/button.actions.handler");
const {conditionsByNumber} = require("../../../karuta/karuta.types");
const {nounToPlural} = require("../../../utils/utils");
const {numberWithCommas} = require("../../../utils/utils");
const {MessageEmbed} = require("discord.js");

class SaleHelper extends ButtonActionsHandler {
    discordUserId;

    constructor(saleOptionsHandler, discordUserId, card) {
        super();
        this.discordUserId = discordUserId;
        this.saleOptionsHandler = saleOptionsHandler
        this.card = card;
    }

    getSaleEmbed(success) {
        if (this.saleOptionsHandler && this.card) {
            const {imageUrl, code, anime, name, condition, printNumber, edition} = this.card.attributes;
            const {quantity, currency} = this.saleOptionsHandler;
            let pluralCurrency = nounToPlural(currency, quantity);
            if (currency === "gold") {
                pluralCurrency = "gold";
            }
            let conditionIndex = conditionsByNumber.indexOf(condition);
            let conditionString = "";
            for (let i = 0; i < 4; i++) {
                if (conditionIndex > i) {
                    conditionString += "★";
                } else {
                    conditionString += "☆";
                }
            }

            let messageEmbed = new MessageEmbed()
                .setTitle(`Sale Listing`)
                .setThumbnail(imageUrl)
                .setDescription(`You are about to list **${name}** from _${anime}_ with code \`${code}\` on the Marin Market. Review the listing details below, and press Confirm to complete the listing.`)
                .setColor("ORANGE")
                .addField("Listing Cost", `\`\`\`yaml\n${numberWithCommas(quantity)} ${pluralCurrency}\n\`\`\``, true)
                .addField("Card Details", `\`${code}\` · \`${conditionString}\` · \`#${printNumber}\` · \`◈${edition}\` · ${anime} · **${name}**`)

            if (success) {
                messageEmbed
                    .setDescription(`You have **successfully** listed **${name}** from _${anime}_ with code \`${code}\` on the Marin Market for **${numberWithCommas(quantity)} ${pluralCurrency}**.`)
                    .setColor("GREEN")
            } else if (success === false){
                messageEmbed
                    .setDescription(`Sorry, we could not successfully list **${name}** from _${anime}_ with code \`${code}\` on the Marin Market for **${numberWithCommas(quantity)} ${pluralCurrency}**. Did you make sure to \`kci\` your card before trying to use the \`sale\` command? If you're still having trouble reach out to the support channel in our server.`)
                    .setColor("RED")
            }
            return messageEmbed;
        }
    }
}

module.exports = SaleHelper;