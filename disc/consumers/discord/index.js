const discordIntents = require("./discord.intents");
const Logger = require("../../logger");
const KarutaCards = require("../../karuta/karuta.card");
const KarutaCommand = require("../../karuta/karuta.command");
const PrintsApi = require("../../api/ftp.api/prints");
const CommandRoutes = require("../../karuta/command.routes");
const {KARUTA_EMBED_TITLES} = require("../../karuta/karuta.types");
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
        this.client.on(DISCORD_EVENTS.MESSAGE_UPDATE, this.onMessageUpdate);
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

    onMessageUpdate = async (message, newMessage) => {
        if (newMessage.author.bot && newMessage.author.id === KARUTA_BOT_ID){
            let commandHandler = new KarutaCommand(newMessage);
            let execute = CommandRoutes[commandHandler.command];
            if (execute){
                await execute(newMessage, "update");
            }
        }
    }

    onMessageCreate = async (message) => {

        if (message.author.bot && message.author.id === KARUTA_BOT_ID) {
            let commandHandler = new KarutaCommand(message);
            let execute = CommandRoutes[commandHandler.command];
            if (execute){
                await execute(message, "create");
            }
        }
    }

    onInteractionCreate = async (interaction) => {
        if (interaction.isCommand()) {
            let command = this.client.commands.get(interaction.commandName);
            if (command) {
                await command.execute(interaction, this.client, interaction.user.id);
            }
        }
    }
}

module.exports = DiscordConsumer;