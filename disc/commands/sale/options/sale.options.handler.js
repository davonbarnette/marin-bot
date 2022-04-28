const OptionsHandler = require("../../../utils/options.handler");

class SaleOptionsHandler extends OptionsHandler {

    code;
    currency;
    quantity;

    discordUserId;

    constructor(options, discordUserId) {
        super();
        this.discordUserId = discordUserId;
        this.setOptions(options);
    }

    setOptions(options) {
        options.forEach(option => {
            if (option.name === "code") {
                this.code = option.value;
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

module.exports = SaleOptionsHandler;