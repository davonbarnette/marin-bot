const {dyeLineFieldsByIndex} = require("../karuta.types");

class DyeLineHandler {

    constructor(line) {
        this.line = line;
        this.dyeData = {};
        this.setDyeData();
    }

    setDyeData() {
        let split = this.line.split("·");
        split.forEach((piece, index) => {
            let fieldObj = dyeLineFieldsByIndex[index];
            this.dyeData[fieldObj.name] = fieldObj.parser(piece);
        })
    }

}


module.exports = DyeLineHandler;