const axios = require("axios");


const OKX_API = "https://www.okx.com";



async function getPrice(instId = "BTC-USDT") {

    try {

        const response = await axios.get(
            `${OKX_API}/api/v5/market/ticker`,
            {
                params: {
                    instId: instId
                }
            }
        );


        const data = response.data.data[0];


        return {

            symbol: data.instId,

            lastPrice: Number(data.last),

            bid: Number(data.bidPx),

            ask: Number(data.askPx),

            volume: Number(data.vol24h),

            timestamp: data.ts

        };


    } catch (error) {

        throw new Error(
            `OKX market error: ${error.message}`
        );

    }

}



module.exports = {
    getPrice
};