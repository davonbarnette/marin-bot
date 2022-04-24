const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require("dotenv").config();
const { CLIENT_ID:clientId, DISC_TOKEN:token } = process.env;
const commandList = require("./commands.list");

const rest = new REST({ version: '9' }).setToken(token);

(async () => {

	let commands = [];
	let values = [...commandList.values()];
	for (let i = 0; i < values.length; i++) {
		const command = values[i];
		let push = await command.getSlashCommand();
		commands.push(push);
	}

	try {
		console.log('Started refreshing application (/) commands.');
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();