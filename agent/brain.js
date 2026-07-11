const { Ollama } = require("ollama");

const MarketAgent = require("../market/marketAgent");


class SentinelAgent {

    constructor() {

        this.name = "Sentinel AI";
        this.version = "0.3.0";
        this.model = "llama3";

        this.client = new Ollama({
            host: "http://localhost:11434"
        });

        this.market = new MarketAgent();

    }



    async analyze(input) {

        try {

            // Get live OKX market data
            const marketData = await this.market.analyzeAsset(
                "BTC-USDT"
            );


            const marketContext = `

You are Sentinel AI, a crypto risk analysis agent.

Live OKX Market Data:

Asset:
${marketData.asset}

Current Price:
$${marketData.price}

24h Volume:
${marketData.volume24h}

Market Status:
${marketData.marketStatus}


User Request:

${input}


Analyze:
- Current risk level
- Possible threats
- Market conditions
- Investor considerations

Give a structured professional report.

`;



            const response = await this.client.chat({

                model: this.model,

                messages: [

                    {
                        role: "user",
                        content: marketContext
                    }

                ]

            });



            return {

                agent: this.name,

                version: this.version,

                status: "online",

                model: this.model,

                market: marketData,

                analysis: response.message.content,

                confidence: 60

            };


        } catch(error) {


            return {

                agent: this.name,

                version: this.version,

                status: "error",

                error: error.message

            };


        }

    }


}


module.exports = SentinelAgent;