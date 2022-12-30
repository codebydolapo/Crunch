const Crunch = require("../crunch");
const currentBlockData = require("../data/dummyBlockData")

const crunch = new Crunch();

async function main() {
   const nonce = crunch.proofOfWork("8I38EDJ83DDJJ9D", currentBlockData);


   console.log(nonce)
}

main()