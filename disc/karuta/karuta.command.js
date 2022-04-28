const {KARUTA_COMMANDS} = require("./karuta.types");
const {KARUTA_EMBED_TITLES} = require("./karuta.types");

class KarutaCommand {

    constructor(message) {
        this.message = message;
        this.embed = this.message.embeds?.[0];
        this.setMessageInformation();
    }

    setMessageInformation() {
        this.embed = this.message.embeds?.[0];
        if (this.embed) {
            this.lines = this.embed.description.split("\n");
            if (this.embed.title === KARUTA_EMBED_TITLES.CARD_COLLECTION) {
                this.command = KARUTA_COMMANDS.COLLECTION;
            } else if (this.embed.title === KARUTA_EMBED_TITLES.CARD_DETAILS) {
                if (this.embed.description.includes("Grabbed after")) {
                    this.command = KARUTA_COMMANDS.CARD_INFO
                } else {
                    this.command = KARUTA_COMMANDS.CARD_VIEW
                }
            }
        }
    }
}


module.exports = KarutaCommand;