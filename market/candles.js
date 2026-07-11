const axios = require("axios");


const OKX_API = "https://www.okx.com";


async function getCandles(
    instId = "BTC-USDT",
    bar = "1H",
    limit = 100
) {

    const response = await axios.get(
        `${OKX_API}/api/v5/market/candles`,
        {
            params: {
                instId,
                bar,
                limit
            }
        }
    );


    const candles = response.data.data.map(candle => ({

        timestamp: candle[0],

        open: Number(candle[1]),

        high: Number(candle[2]),

        low: Number(candle[3]),

        close: Number(candle[4]),

        volume: Number(candle[5])

    }));


    return candles.reverse();

}


module.exports = {
    getCandles
};