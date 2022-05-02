const onCardView = require("./consumers/card.view.consumer");
const onCardInfo = require("./consumers/card.info.consumer");
const onCardCollection = require("./consumers/card.collection.consumer");
const onDyeCollection = require("./consumers/dye.collection.consumer");
const {KARUTA_COMMANDS} = require("./karuta.types");

const CommandRoutes = {

    [KARUTA_COMMANDS.CARD_VIEW]: onCardView,
    [KARUTA_COMMANDS.CARD_INFO]: onCardInfo,
    [KARUTA_COMMANDS.COLLECTION]: onCardCollection,
    [KARUTA_COMMANDS.DYE_COLLECTION]: onDyeCollection,

}

module.exports = CommandRoutes;