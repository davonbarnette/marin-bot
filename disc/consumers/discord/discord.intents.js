const {Intents} = require("discord.js");
const discordIntents = [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
]

module.exports = discordIntents;