const { Ollama } = require("ollama");

const MarketAgent = require("../market/marketAgent");
const { getCandles } = require("../market/candles");

const {
    calculateSMA,
    calculateEMA,
    calculateRSI,
    calculateMACD,
    calculateATR
} = require("../analysis/indicators");


const RiskEngine = require("../risk/riskEngine");



class SentinelAgent {


    constructor(){

        this.name = "Sentinel AI";
        this.version = "0.6.0";
        this.model = "llama3";


        this.client = new Ollama({
            host:"http://localhost:11434"
        });


        this.market =
            new MarketAgent();


        this.risk =
            new RiskEngine();

    }





    async analyze(input){


        try{


            const market =
                await this.market.analyzeAsset(
                    "BTC-USDT"
                );



            const candles =
                await getCandles(
                    "BTC-USDT",
                    "1H",
                    100
                );



            const closes =
                candles.map(
                    c => c.close
                );




            const indicators = {


                price:
                    market.price,


                SMA20:
                    calculateSMA(
                        closes
                    ),


                EMA20:
                    calculateEMA(
                        closes
                    ),


                RSI14:
                    calculateRSI(
                        closes
                    ),


                MACD:
                    calculateMACD(
                        closes
                    ),


                ATR:
                    calculateATR(
                        candles
                    )

            };





            const risk =
                this.risk.calculate(
                    indicators
                );





            const prompt = `

You are Sentinel AI, an autonomous Web3 crypto risk intelligence agent.

Analyze the following market data.

Asset:
${market.asset}


Current Price:
${market.price}


Technical Indicators:

SMA20:
${indicators.SMA20}

EMA20:
${indicators.EMA20}

RSI14:
${indicators.RSI14}

MACD:
${JSON.stringify(indicators.MACD)}

ATR:
${indicators.ATR}


Risk Engine:

Risk Score:
${risk.riskScore}/100

Risk Level:
${risk.decision}


Factors:
${risk.factors.join(", ")}


User Request:

${input}


Generate a professional crypto risk report.

Include:

1. Market overview
2. Technical analysis
3. Risk explanation
4. Investor considerations
5. Final conclusion

`;





            const response =
                await this.client.chat({

                    model:this.model,

                    messages:[

                        {
                            role:"user",
                            content:prompt
                        }

                    ]

                });






            return {


                agent:this.name,


                version:this.version,


                model:this.model,


                status:"online",



                asset:
                    market.asset,



                market:{


                    price:
                        market.price,


                    volume24h:
                        market.volume24h,


                    status:
                        market.marketStatus


                },



                indicators:{


                    SMA20:
                        indicators.SMA20,


                    EMA20:
                        indicators.EMA20,


                    RSI14:
                        indicators.RSI14,


                    MACD:
                        indicators.MACD,


                    ATR:
                        indicators.ATR

                },





                technical:{


                    sma20:
                        indicators.SMA20,


                    ema20:
                        indicators.EMA20,


                    rsi:
                        indicators.RSI14,



                    macd:

                        indicators.MACD
                        ?
                        {

                            value:
                                indicators.MACD.macd,


                            signal:
                                indicators.MACD.signal,


                            histogram:
                                indicators.MACD.histogram,


                            trend:

                            indicators.MACD.macd >
                            indicators.MACD.signal

                            ?

                            "BULLISH"

                            :

                            "BEARISH"

                        }

                        :

                        null,



                    atr:
                        indicators.ATR


                },





                risk:{


                    score:
                        risk.riskScore,


                    level:
                        risk.decision,


                    factors:
                        risk.factors


                },





                analysis:
                    response.message.content



            };



        }
        catch(error){


            return {


                agent:this.name,


                version:this.version,


                status:"error",


                error:error.message


            };


        }


    }


}



module.exports = SentinelAgent;