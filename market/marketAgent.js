const { getPrice } = require("./price");


class MarketAgent {


    async analyzeAsset(symbol = "BTC-USDT") {


        const market = await getPrice(symbol);


        return {

            asset: market.symbol,

            price: market.lastPrice,

            volume24h: market.volume,

            marketStatus:
                market.lastPrice > 0
                ? "active"
                : "unknown",

            timestamp: market.timestamp

        };

    }


}


module.exports = MarketAgent;