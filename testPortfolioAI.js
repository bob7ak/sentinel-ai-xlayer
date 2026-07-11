const PortfolioEngine =
require("./portfolio/portfolioEngine");


const { Ollama } =
require("ollama");



const engine =
new PortfolioEngine();



const client =
new Ollama({
    host:"http://localhost:11434"
});




async function run(){


const portfolio = [

    {
        symbol:"BTC",
        amount:0.5
    },

    {
        symbol:"ETH",
        amount:3
    }

];



const analysis =
    await engine.analyze(
        portfolio
    );



const prompt = `

You are Sentinel AI portfolio analyst.

Analyze this crypto portfolio:

${JSON.stringify(
    analysis,
    null,
    2
)}


Explain:

1. Portfolio health
2. Main risks
3. Diversification
4. What investor should watch


Create a professional report.

`;



const response =
await client.chat({

    model:"llama3",

    messages:[

        {
            role:"user",
            content:prompt
        }

    ]

});



console.log(
    response.message.content
);


}



run();