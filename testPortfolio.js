const PortfolioEngine =
require("./portfolio/portfolioEngine");


const engine =
new PortfolioEngine();



async function test(){


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



    const result =
        await engine.analyze(
            portfolio
        );



    console.log(result);


}



test();