const Crunch = require("./crunch");

const crunch = new Crunch();
async function mainTest() {
    crunch.createNewBlock(72637, "82YRIUY274YR2", '726287463248H')
    crunch.createNewBlock(72637, "8EUDUJD9J93DJ", 'NDI93U9D393HD')
    crunch.createNewBlock(72637, "N3EUJ9UEE8D39", 'JS92UEJ83E3J3')

    console.log(crunch)
}

mainTest()