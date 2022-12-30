const sha256 = require("sha256")

class Crunch {

    constructor() {
        this.chain = []; //contains all the blocks in a chain
        this.pendingTransactions = []; //saves all transactions pending mining
    }


    createNewBlock(nonce, previousBlockHash, hash) {
        const newBlock = {
            index: this.chain.length + 1, //appends an index to the new block
            timeStamp: Date.now(), //puts a timestamp on the new block
            transactions: this.pendingTransactions,
            nonce,
            hash,
            previousBlockHash //hash of the previous block
        };

        this.pendingTransactions = []; //resets the new transaction array
        this.chain.push(newBlock); //pushes the newly mined block into the chain
        // return newBlock;
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1]
    }

    //creates a new transacton
    createNewTransaction(amount, sender, recipient){
        const newTransaction = {
            amount,
            sender,
            recipient
        }

        this.pendingTransactions.push(newTransaction)

        //gets the last block object in the chain and returns it
        const newBlockNumber = this.getLastBlock()["index"]  + 1
        return newBlockNumber
    }

    //SHA256 hashing function
    hashBlock(previousBlockHash, currentBlockData, nonce){
        const stringifiedData = previousBlockHash + JSON.stringify(currentBlockData) + nonce.toString()
        const hash = sha256(stringifiedData) 
        return hash; //returns a hash
    }

    //proof-of-work function
    proofOfWork(previousBlockHash, currentBlockData){
        let nonce = 0;
        let hash = this.hashBlock(previousBlockHash, JSON.stringify(currentBlockData), nonce); //hashing function
        while(hash.substring(0, 4) != "0000"){
            nonce ++; //increments the nonce over every iteration
            hash = this.hashBlock(previousBlockHash, JSON.stringify(currentBlockData), nonce); //runs the hash functon again
        }

        return nonce;
    }

}


module.exports = Crunch
