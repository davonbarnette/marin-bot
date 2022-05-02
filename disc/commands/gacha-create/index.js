const Command = require("../base");
const execute = require('./execute');
const {SlashCommandBuilder} = require("@discordjs/builders");

let params = {
    name: "gacha-create",
    aliases: ["gc"],
    description: "Create a new gacha game",
    execute,
    disabled: true,
}

let choices = ["ticket", "gem", "gold", "droplet"];

params.getSlashCommand = async () => {
    let commandChoices = choices.map(choice => [choice, choice])

    return new SlashCommandBuilder()
        .setName(params.name)
        .setDescription(params.description)
        .addStringOption(option =>
            option
                .setName("name")
                .setDescription("The name of the gacha game you want to create")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("currency")
                .setDescription("The name of the currency.")
                .addChoices(commandChoices)
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName("quantity")
                .setMaxValue(10000000)
                .setMinValue(0)
                .setDescription("The cost of what you're selling.")
                .setRequired(true)
        )
}

params.getSlashCommand();

module.exports = new Command(params);



