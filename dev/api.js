const express = require("express");
const app = express()
const bodyParser = require("body-parser");
const crunch = require("./crunch")
const PORT = 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const Crunch = crunch()

app.get("/crunch", (req, res)=>{
    res.send(Crunch)
    console.log(Crunch)
})

app.post("/transaction", (req, res)=>{
    const blockIndex = Crunch.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({
        note:  `Transaction ${blockIndex} will be added to the blockchain once confirmed`
    })
})

app.get("/mine", (req, res)=>{

})

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})