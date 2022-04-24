class DiscordCodeColors {

    static toRed(str){
        return DiscordCodeColors.toCode(`- ${str}`, "diff")
    }
    static toCyan(str){
        return DiscordCodeColors.toCode(str, "yaml")
    }
    static toWhite(str){
        return DiscordCodeColors.toCode(str, "Tex")
    }
    static toYellow(str){
        return DiscordCodeColors.toCode(str, "fix")
    }

    static toCode(str, editor = ""){
        return `\`\`\`${editor}\n${str}\n\`\`\``;
    }
}

module.exports = DiscordCodeColors;