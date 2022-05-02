const OptionsHandler = require("../../../utils/options.handler");

class GachaGameOptionsHandler extends OptionsHandler {

    name;
    currency;
    quantity;

    discordUserId;

    constructor(options, discordUserId) {
        super();
        this.discordUserId = discordUserId;
        this.setOptions(options);
    }

    getCreateGachaGameData(){
        return {
            name: this.name,
            currency: this.currency,
            quantity: this.quantity,
        }
    }

    setOptions(options) {
        options.forEach(option => {
            if (option.name === "name") {
                this.name = option.value;
            }
            if (option.name === "currency") {
                this.currency = option.value;
            }
            if (option.name === "quantity") {
                this.quantity = option.value;
            }
        })
    }
}

module.exports = GachaGameOptionsHandler;