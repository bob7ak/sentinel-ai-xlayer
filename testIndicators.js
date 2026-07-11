const { getCandles } = require("./market/candles");

const {
    calculateSMA,
    calculateEMA,
    calculateRSI,
    calculateMACD,
    calculateATR
} = require("./analysis/indicators");


async function test(){

    const candles = await getCandles(
        "BTC-USDT",
        "1H",
        100
    );


    const closes =
        candles.map(c => c.close);



    console.log({

        asset:"BTC-USDT",

        price:
            closes.at(-1),

        SMA20:
            calculateSMA(closes),

        EMA20:
            calculateEMA(closes),

        RSI14:
            calculateRSI(closes),

        MACD:
            calculateMACD(closes),

        ATR:
            calculateATR(candles)

    });

}


test();