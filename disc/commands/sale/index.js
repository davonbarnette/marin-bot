const Command = require("../base");
const execute = require('./execute');
const {SlashCommandBuilder} = require("@discordjs/builders");

let params = {
    name: "sale",
    aliases: ["sale"],
    description: "List your card in the Marin sale shop.",
    execute,
    disabled: false,
}

let choices = ["ticket", "gem", "gold", "droplet"];

params.getSlashCommand = async () => {
    let commandChoices = choices.map(choice => [choice, choice])

    return new SlashCommandBuilder()
        .setName(params.name)
        .setDescription(params.description)
        .addStringOption(option =>
            option
                .setName("code")
                .setDescription("The code of the card or dye")
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



