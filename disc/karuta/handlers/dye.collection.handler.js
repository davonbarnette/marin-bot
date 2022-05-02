const DyeLineHandler = require("./dye.line.handler");

class DyeCollectionHandler {

    constructor(embed) {
        this.embed = embed;
        this.dyeData = []
        this.getDyesFromDyeCollectionEmbed();
    }

    get ownedBy(){
        let line = this.embed.description.split("\n")[0];
        return line.split("@")[1].slice(0, -1);
    }

    getDyesFromDyeCollectionEmbed() {
        if (this.embed) {
            let split = this.embed.description.split("\n").slice(2);
            if (split[0] === "The list is empty.") {
                return undefined;
            } else {
                split.pop();
                split.pop();
                this.dyeData = split.map(line => {
                    let dyeLineHandler = new DyeLineHandler(line)
                    return dyeLineHandler.dyeData;
                })
            }
        }
    }
}

module.exports = DyeCollectionHandler;