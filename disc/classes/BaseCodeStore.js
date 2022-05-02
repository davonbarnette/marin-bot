class BaseCodeStoreClass {

    codesByMessageId = new Map();
    replyByMessageId = new Map();

    constructor(codeStringJoin) {
        this.codeStringJoin = codeStringJoin
    }

    storeCodes(messageId, codes) {
        let curCodes = this.codesByMessageId.get(messageId) || [];
        codes.forEach(code => {
            if (curCodes.indexOf(code) === -1) {
                curCodes.push(code)
            }
        });
        this.codesByMessageId.set(messageId, curCodes);
        return curCodes;
    }

    getCodesAsString(messageId) {
        return this.codesByMessageId.get(messageId)?.join(this.codeStringJoin)
    }

}

module.exports = BaseCodeStoreClass;