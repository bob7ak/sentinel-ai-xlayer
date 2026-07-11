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
        this.version = "0.4.0";
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
                    c=>c.close
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

You are Sentinel AI.

Analyze this crypto market.

Asset:
${market.asset}

Price:
${market.price}

Indicators:

SMA20:
${indicators.SMA20}

EMA20:
${indicators.EMA20}

RSI:
${indicators.RSI14}

MACD:
${JSON.stringify(indicators.MACD)}

ATR:
${indicators.ATR}


Risk Score:
${risk.riskScore}/100

Decision:
${risk.decision}


Factors:
${risk.factors.join(", ")}


User request:

${input}


Create a professional market report.

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

                status:"online",


                market,


                indicators,


                risk,


                analysis:
                    response.message.content

            };



        }
        catch(error){


            return {

                agent:this.name,

                status:"error",

                error:error.message

            };


        }


    }


}



module.exports = SentinelAgent;