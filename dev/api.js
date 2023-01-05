const express = require("express");
const app = express()
const bodyParser = require("body-parser");
const crunch = require("./crunch")
const uuid = require("uuid/v1") 
const PORT = 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const Crunch = crunch()

const nodeAddress = uuid().split("-").join("") //creates a random, unique string

app.get("/crunch", (req, res)=>{
    res.send(Crunch)
    console.log(Crunch)
})

app.post("/transaction", (req, res)=>{
    //creates a new transaction and returns the index
    const blockIndex = Crunch.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({
        //returns a JSON object with the note below
        note:  `Transaction ${blockIndex} will be added to the blockchain once confirmed`
    })
})

app.get("/mine", (req, res)=>{
    const lastBlock = Crunch.getLastBlock() //gets the last block object in the chain
    const lastBlockHash = lastBlock.hash //the hash property in the block object
    const currentBlockData = {
        pendingTransactions: Crunch.pendingTransactions,
        index: lastBlock["index"] + 1
    }
    const nonce = Crunch.proofOfWork(lastBlockHash, currentBlockData) //performs the "work" to find a suitable nonce
    const hashAddress = Crunch.hashBlock(lastBlockHash, currentBlockData, nonce)
    const newBlock = Crunch.createNewBlock(nonce, lastBlockHash, hashAddress)

    //Rewards miner
    Crunch.createNewTransaction(20, "00", nodeAddress)
    
    res.json({
        note: `New Block Mined Successfully with hashAddress ${hashAddress}`,
        block: newBlock
    })
})

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})