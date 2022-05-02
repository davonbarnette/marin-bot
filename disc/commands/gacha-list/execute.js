const GachaGamesApi = require("../../api/ftp.api/gacha-game");
const GachaGameOptionsHandler = require("./options/gacha.game.options.handler");
const GachaCreateHelper = require("./utils/gacha.game.helper");
const {Permissions} = require("discord.js")

module.exports = async (parentInteraction, client, discordUserId) => {
    // let partialQuery = {
    //     filters: {
    //         discordUser: {
    //             discordUserId: discordUserId
    //         },
    //     },
    //     populate: {
    //         card: {
    //             populate: {
    //                 character: "*",
    //             }
    //         }
    //     }
    // }
    //
    //
    // let gachaGameOptionHandler = new GachaGameOptionsHandler(options)
    // let gachaCreateHelper = new GachaCreateHelper(gachaGameOptionHandler, discordUserId);
    //
    // let embed = gachaCreateHelper.getGachaCreateEmbed();
    //
    // if (isAdministrator) {
    //
    //     let res = await GachaGamesApi.createGachaGame(gachaGameOptionHandler.getCreateGachaGameData());
    //     if (!res) {
    //         embed = gachaCreateHelper.getGachaCreateEmbed("There was an error creating your Gacha Game - try again in a few minutes. If the problem persists, please reach out to a Marin Bot support team member.")
    //     }
    // } else {
    //     embed = gachaCreateHelper.getGachaCreateEmbed("You do not have the permissions to create a Gacha Game in this server.")
    // }
    // await parentInteraction.reply({
    //     content: `<@${parentInteraction.user.id}>, your Gacha Game details are below:`,
    //     embeds: [embed],
    //     fetchReply: true
    // });
}





