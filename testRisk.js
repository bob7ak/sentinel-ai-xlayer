const RiskEngine = require("./risk/riskEngine");


const engine = new RiskEngine();


const indicators = {

    price: 64357.8,

    EMA20: 64177.35,

    RSI14: 60.92,

    MACD: {
        macd: 94.95,
        signal: 85.46,
        histogram: 9.5
    },

    ATR: 171.86

};



console.log(
    engine.calculate(indicators)
);