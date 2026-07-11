const axios = require("axios");


const OKX_API =
"https://www.okx.com";



async function getTokenPrice(symbol){


    const response =
        await axios.get(

            `${OKX_API}/api/v5/market/ticker`,

            {

                params:{

                    instId:
                    `${symbol}-USDT`

                }

            }

        );



    const data =
        response.data.data[0];



    return {

        symbol,

        price:
            Number(data.last)

    };


}



module.exports = {
    getTokenPrice
};