const ButtonActionsHandler = require("../../../utils/button.actions.handler");
const {conditionsByNumber} = require("../../../karuta/karuta.types");
const {nounToPlural} = require("../../../utils/utils");
const {numberWithCommas} = require("../../../utils/utils");
const {MessageEmbed} = require("discord.js");

class GachaCreateHelper extends ButtonActionsHandler {
    discordUserId;

    constructor(gachaGameOptionsHandler, discordUserId) {
        super();
        this.discordUserId = discordUserId;
        this.gachaGameOptionsHandler = gachaGameOptionsHandler
    }

    getGachaCreateEmbed(error) {
        if (this.gachaGameOptionsHandler) {
            const {quantity, currency, name} = this.gachaGameOptionsHandler;
            let pluralCurrency = nounToPlural(currency, quantity);
            if (currency === "gold") {
                pluralCurrency = "gold";
            }

            let messageEmbed = new MessageEmbed()
                .setTitle(`Gacha Create Listing`)
                .setDescription(`You have successfully created your Gacha Game, **${name}**. The price of this Gacha Game is currently set at **${numberWithCommas(quantity)} ${pluralCurrency}**`)
                .setColor("GREEN")
            if (error){
                messageEmbed
                    .setDescription(error)
                    .setColor("RED")
            }
            return messageEmbed;
        }
    }
}

module.exports = GachaCreateHelper;