const JikanV4API = require("../../api/jikan.api/schedules");
const AnimeReleaseOptionsHandler = require("./options/anime.release.options.handler");
const {MessageEmbed} = require("discord.js");

module.exports = async (parentInteraction, client, discordUserId) => {
    let options = parentInteraction.options._hoistedOptions;
    let arReleaseHandler = new AnimeReleaseOptionsHandler(options, discordUserId);

    let animeReleased = await JikanV4API.getSchedules(arReleaseHandler.day);

    console.log('animeReleased', animeReleased.length)

    let helpEmbed = new MessageEmbed()
        .setTitle(`Searching for animes released on ${arReleaseHandler.day}`)
        .setDescription("Type !help for commands.")
        .setColor("GREEN")


    animeReleased = animeReleased.filter(a => a.title_english !== null);

    animeReleased.forEach(a => {
        helpEmbed.addField(
            a.title_english,
            a.url,
            true
        );
    })

    return parentInteraction.reply({embeds: [helpEmbed]})
}





