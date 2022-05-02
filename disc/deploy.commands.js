const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
require("dotenv").config();
const {
    CLIENT_ID: clientId,
    DISC_TOKEN: token,
    COMMAND_TEST_GUILD_ID: guildId,
    COMMAND_TEST_GUILD_IDS: testServersEnv
} = process.env;
const commandList = require("./commands.list");

const rest = new REST({version: '9'}).setToken(token);

(async () => {

    let commands = [];
    let values = [...commandList.values()];
    for (let i = 0; i < values.length; i++) {
        const command = values[i];
        if (!command.disabled) {
            let slashCommand = await command.getSlashCommand();
            commands.push(slashCommand);
        }
    }

    try {
        console.log('Started refreshing application (/) commands.');
        let testServers = testServersEnv.split(",")
        for (let i = 0; i < testServers.length; i++) {
            const testServer = testServers[i];
            await rest.put(
                Routes.applicationGuildCommands(clientId, testServer),
                {body: commands},
            );
        }
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();