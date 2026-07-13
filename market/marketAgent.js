const { getPrice } = require("./price");
const { getCandles } = require("./candles");

const {
    calculateSMA,
    calculateEMA,
    calculateRSI,
    calculateMACD,
    calculateATR
} = require("../analysis/indicators");



class MarketAgent {


    async analyzeAsset(symbol = "BTC-USDT") {


        const market =
            await getPrice(symbol);



        const candles =
            await getCandles(
                symbol,
                "1H",
                100
            );



        const closes =
            candles.map(
                candle => candle.close
            );



        const indicators = {


            sma20:
            calculateSMA(
                closes,
                20
            ),


            ema20:
            calculateEMA(
                closes,
                20
            ),


            rsi:
            calculateRSI(
                closes,
                14
            ),


            macd:
            calculateMACD(
                closes
            ),


            atr:
            calculateATR(
                candles
            )

        };





        return {


            asset:
            market.symbol,


            price:
            market.lastPrice,


            volume24h:
            market.volume,


            marketStatus:
            market.lastPrice > 0
            ? "active"
            : "unknown",


            timestamp:
            market.timestamp,


            candles:


            {

                count:
                candles.length,

                timeframe:
                "1H"

            },


            indicators


        };


    }


}



module.exports = MarketAgent;