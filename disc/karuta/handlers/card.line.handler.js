const {lineFieldsByIndex} = require("../karuta.types");

class CardLineHandler {

    constructor(line) {
        this.line = line;
        this.cardData = {};
        this.setCardData();
    }

    hasWishlistInLine() {
        return this.line.includes("♡");
    }

    setCardData() {
        let hasWishlist = this.hasWishlistInLine(this.line);
        let split = this.line.split("·");
        if (hasWishlist) {
            split.shift();
        }
        split.forEach((piece, index) => {
            let fieldObj = lineFieldsByIndex[index];
            this.cardData[fieldObj.name] = fieldObj.parser(piece);
        })
    }

}


module.exports = CardLineHandler;