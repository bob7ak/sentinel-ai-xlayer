const { getCandles } = require("./market/candles");


async function test(){

    const symbol =
        process.argv[2] || "BTC-USDT";


    const candles =
        await getCandles(symbol);


    console.log("Symbol:", symbol);

    console.log(
        candles.slice(0,3)
    );

}


test();