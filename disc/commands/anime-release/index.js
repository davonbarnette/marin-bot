const Command = require("../base");
const execute = require('./execute');
const {SlashCommandBuilder} = require("@discordjs/builders");

let params = {
    name: "anime-release",
    aliases: ["ar"],
    description: "Searches for anime coming out on specific days during the current season.",
    execute,
    disabled: false,
}

let choices = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

params.getSlashCommand = async () => {
    let commandChoices = choices.map(choice => [choice, choice])
    return new SlashCommandBuilder()
        .setName(params.name)
        .setDescription(params.description)
        .addStringOption(option =>
            option
                .setName("day")
                .setDescription("The day you want to search for anime. If no day is specified, uses the current day.")
                .addChoices(commandChoices)
        )
}

params.getSlashCommand();

module.exports = new Command(params);



