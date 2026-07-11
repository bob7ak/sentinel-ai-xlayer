const PortfolioEngine =
require("./portfolio/portfolioEngine");


const engine =
new PortfolioEngine();



const portfolio = [

    {
        symbol:"BTC",
        amount:0.5,
        price:64371
    },

    {
        symbol:"ETH",
        amount:3,
        price:3500
    }

];



console.log(
    engine.analyze(portfolio)
);