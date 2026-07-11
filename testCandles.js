const { getCandles } = require("./market/candles");


async function test(){

    const candles = await getCandles();

    console.log(candles.slice(0,3));

}


test();