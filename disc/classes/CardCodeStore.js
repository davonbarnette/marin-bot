const BaseCodeStoreClass = require("./BaseCodeStore");

class CardCodeStoreClass extends BaseCodeStoreClass {}

let CardCodeStore = new CardCodeStoreClass(", ");
module.exports = CardCodeStore;