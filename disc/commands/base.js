const paramProperties = {
    name: "name",
    aliases: "aliases",
    description: "description",
    getSlashCommand: "getSlashCommand",
    disabled: "disabled",
    execute: "execute",
}

class Command {

    constructor(params) {
        Object.keys(paramProperties).forEach(key => {
            if (params[key] !== undefined) {
                this[key] = params[key]
            } else {
                console.log(`No key ${key} for param in ${params.name}. If the previous contained "undefined", it means that the name was undefined.`);
            }
        })
    }
}

module.exports = Command;