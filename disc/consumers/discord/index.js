const discordIntents = require("./discord.intents");
const Logger = require("../../logger");
const KarutaCodeLogger = require("../../classes/KarutaCodeLogger");
const PrintsApi = require("../../api/ftp.api/prints");
const {BaseConsumer, CONSUMER_TYPES} = require("../base");
const {Client} = require("discord.js");
const {DISC_TOKEN, PREFIX, KARUTA_BOT_ID} = process.env;
const {DISCORD_EVENTS} = require("./types");

class DiscordConsumer extends BaseConsumer {

    constructor(commandList) {
        super(commandList, CONSUMER_TYPES.DISCORD);

        this.client = new Client({intents: discordIntents});
        this.client.commands = commandList;

        this.client.login(DISC_TOKEN);
        this.client.prefix = PREFIX;
        this.client.queue = new Map();

        this.client.on(DISCORD_EVENTS.READY, this.onReady);
        this.client.on(DISCORD_EVENTS.WARN, this.onWarn);
        this.client.on(DISCORD_EVENTS.ERROR, this.onError);
        this.client.on(DISCORD_EVENTS.MESSAGE_CREATE, this.onMessageCreate);
        this.client.on(DISCORD_EVENTS.INTERACTION_CREATE, this.onInteractionCreate);
    }

    onReady = () => {
        Logger.success(`${this.client.user.username} ready!`)
        this.client.user.setActivity(`/help`)
    }

    onWarn = (info) => {
        Logger.warn(info)
    }

    onError = (err) => {
        Logger.error(err);
    }

    onMessageCreate = async (message) => {
        if (message.author.bot && message.author.id === KARUTA_BOT_ID) {
            let karutaCodeLogger = new KarutaCodeLogger(message);
            await karutaCodeLogger.saveCards();
        }

    }

    onInteractionCreate = async (interaction) => {
        if (interaction.isCommand()) {
            let command = this.client.commands.get(interaction.commandName);
            if (command) {
                await command.execute(interaction, this.client);
            }
        }
    }
}

module.exports = DiscordConsumer;