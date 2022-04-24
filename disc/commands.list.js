const fs = require("fs");
const {Collection} = require("discord.js");

let commandList = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => !file.endsWith('.js'));

for (const folder of commandFiles) {
	const command = require(`./commands/${folder}/index.js`);
	commandList.set(command.name, command);
}

module.exports = commandList;