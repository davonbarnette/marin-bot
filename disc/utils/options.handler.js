class OptionsHandler {

    options;
    optionsByName = {};

    constructor(options = []) {
        this.options = options;
        options.forEach(option => this.optionsByName[option.name] = option)
    }

    getOptionByName(name){
        return this.optionsByName[name];
    }
}

module.exports = OptionsHandler;