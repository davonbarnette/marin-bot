const {KARUTA_COMMANDS} = require("./karuta.types");
const {KARUTA_EMBED_TITLES} = require("./karuta.types");

class KarutaCommand {

    constructor(message) {
        this.message = message;
        this.embed = this.message.embeds?.[0];
        this.command = "";
        this.setMessageInformation();
    }

    setMessageInformation() {
        this.embed = this.message.embeds?.[0];
        if (this.embed) {
            this.lines = this.embed.description.split("\n");

            switch (this.embed.title) {
                case KARUTA_EMBED_TITLES.CARD_COLLECTION:
                    this.command = KARUTA_COMMANDS.COLLECTION;
                    break
                case KARUTA_EMBED_TITLES.CARD_DETAILS:
                    if (this.embed.description.includes("Grabbed after")) {
                        this.command = KARUTA_COMMANDS.CARD_INFO
                    } else {
                        this.command = KARUTA_COMMANDS.CARD_VIEW
                    }
                    break;
                case KARUTA_EMBED_TITLES.DYE_DETAILS:
                    this.command = KARUTA_COMMANDS.DYE_INFO;
                    break;
                case KARUTA_EMBED_TITLES.DYE_COLLECTION:
                    this.command = KARUTA_COMMANDS.DYE_COLLECTION;
                    break;
            }
        }
    }
}


module.exports = KarutaCommand;