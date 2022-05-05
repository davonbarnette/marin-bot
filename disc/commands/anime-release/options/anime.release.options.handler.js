const OptionsHandler = require("../../../utils/options.handler");

class AnimeReleaseOptionsHandler extends OptionsHandler {

    day;

    discordUserId;

    constructor(options, discordUserId) {
        super();
        this.discordUserId = discordUserId;
        this.setOptions(options);
    }

    setOptions(options) {
        options.forEach(option => {
            if (option.name === "day") {
                this.day = option.value;
            }
        })
        if (!this.day){
            this.day = new Date().toLocaleString('en-us', {weekday: 'long'});
            this.day = this.day.toLowerCase();
        }
    }
}

module.exports = AnimeReleaseOptionsHandler;