const MarketAgent = require("./market/marketAgent");


async function test(){

    const market = new MarketAgent();

    const result = await market.analyzeAsset(
        "BTC-USDT"
    );

    console.log(result);

}


test();