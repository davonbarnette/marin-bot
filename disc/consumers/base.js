class BaseConsumer {

    consumerType;
    commandList = new Map();

    constructor(commandList, consumerType){
        this.consumerType = consumerType;
        this.commandList = commandList;
    }

}

const CONSUMER_TYPES = {
    DISCORD: "discord",
    SLACK: "slack",
}

module.exports = {
    BaseConsumer,
    CONSUMER_TYPES,
};