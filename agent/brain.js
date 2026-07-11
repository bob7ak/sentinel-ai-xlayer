const { Ollama } = require("ollama");


class SentinelAgent {

    constructor() {
        this.name = "Sentinel AI";
        this.version = "0.2.1";
        this.model = "llama3";

        this.client = new Ollama({
            host: "http://localhost:11434"
        });
    }


    async analyze(input) {

        try {

            const response = await this.client.chat({

                model: this.model,

                messages: [
                    {
                        role: "system",
                        content:
                        `You are Sentinel AI, an autonomous crypto risk analysis agent.

Analyze risks clearly.
Explain market conditions.
Give practical recommendations.
Do not claim live data unless provided.`
                    },

                    {
                        role: "user",
                        content: input
                    }
                ]

            });


            return {

                agent: this.name,

                version: this.version,

                status: "online",

                model: this.model,

                analysis: response.message.content,

                confidence: 50

            };


        } catch (error) {

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