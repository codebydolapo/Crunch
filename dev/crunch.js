function Crunch() {
    this.chain = [];
    this.newTransactions = [];


    Crunch.prototype.createNewBlock = (nonce, previousBlockHash, hash) => {
        const newBlock = {
            //the block's number
            index: this.chain.length + 1,
            timeStamp: Date.now(),
            transacions: this.newTransacions,
            nonce,
            hash,
            previousBlockHash
        }
        this.newTransactions = [];
        this.chain.push(newBlock)
        return newBlock
    }

}
module.exports = Crunch
