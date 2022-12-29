const Crunch = require("../crunch");
const currentBlockData = require("../data/dummyBlockData")

const crunch = new Crunch();

async function main() {
    const nonce = 387236

    const hash = crunch.hashBlock("I3U49R93D3UD93U", currentBlockData, nonce)
    console.log(hash)
}

main()