const {MessageButton} = require("discord.js");
const {MessageActionRow} = require("discord.js");

class ButtonActionsHandler {

    actionsById = new Map();
    actionRows;

    constructor() {

    }

    //Array of actionObject arrays, first array for the row, inner array for the actions themselves
    setActions(actionRows) {
        actionRows.forEach((actionRow, actionRowIndex) => {
            actionRow.forEach(action => {
                let toSet = {...action, rowNumber: actionRowIndex}
                this.actionsById.set(action.id, toSet);
            })
        })
        this.actionRows = actionRows
    }

    async executeAction(actionId) {
        let action = this.actionsById.get(actionId);
        if (action) {
            await action.execute();
        }
    }

    get discordComponentRows() {
        let componentRows = [];
        this.actionRows.forEach(actions => {
            const row = new MessageActionRow()

            actions.forEach(action => {
                const {id, label, style} = action;
                let button = new MessageButton();
                button.setCustomId(id)
                    .setLabel(label)
                    .setStyle(style || "SECONDARY")
                row.addComponents(button)
            })
            componentRows.push(row);
        })

        return componentRows;
    }

}

module.exports = ButtonActionsHandler;