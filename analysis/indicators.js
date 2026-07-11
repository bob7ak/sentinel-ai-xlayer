function calculateSMA(values, period = 20) {

    if (values.length < period) {
        return null;
    }


    const slice = values.slice(-period);

    const sum = slice.reduce(
        (a, b) => a + b,
        0
    );


    return Number(
        (sum / period).toFixed(2)
    );

}



function calculateEMA(values, period = 20) {

    if (values.length < period) {
        return null;
    }


    const multiplier = 2 / (period + 1);

    let ema = values
        .slice(0, period)
        .reduce((a, b) => a + b, 0) / period;


    for (
        let i = period;
        i < values.length;
        i++
    ) {

        ema =
            (values[i] - ema) * multiplier + ema;

    }


    return Number(
        ema.toFixed(2)
    );

}



function calculateRSI(values, period = 14) {

    if (values.length <= period) {
        return null;
    }


    let gains = 0;
    let losses = 0;


    for (
        let i = values.length - period;
        i < values.length;
        i++
    ) {

        const change =
            values[i] - values[i - 1];


        if (change >= 0) {

            gains += change;

        } else {

            losses += Math.abs(change);

        }

    }


    const averageGain =
        gains / period;


    const averageLoss =
        losses / period;


    if (averageLoss === 0) {

        return 100;

    }


    const rs =
        averageGain / averageLoss;


    const rsi =
        100 - (100 / (1 + rs));


    return Number(
        rsi.toFixed(2)
    );

}




function calculateMACD(
    values,
    fast = 12,
    slow = 26,
    signal = 9
) {

    if (values.length < slow) {
        return null;
    }


    const emaFast =
        calculateEMA(values, fast);


    const emaSlow =
        calculateEMA(values, slow);


    const macd =
        emaFast - emaSlow;


    const signalLine =
        macd * 0.9;


    return {

        macd: Number(
            macd.toFixed(2)
        ),

        signal: Number(
            signalLine.toFixed(2)
        ),

        histogram: Number(
            (macd - signalLine).toFixed(2)
        )

    };

}




function calculateATR(
    candles,
    period = 14
) {

    if (candles.length <= period) {
        return null;
    }


    const trueRanges =
        candles.map((candle, index) => {


            if (index === 0) {

                return (
                    candle.high -
                    candle.low
                );

            }


            const previousClose =
                candles[index - 1].close;


            return Math.max(

                candle.high - candle.low,

                Math.abs(
                    candle.high - previousClose
                ),

                Math.abs(
                    candle.low - previousClose
                )

            );

        });



    const atr =
        trueRanges
            .slice(-period)
            .reduce(
                (a, b) => a + b,
                0
            ) / period;



    return Number(
        atr.toFixed(2)
    );

}




module.exports = {

    calculateSMA,

    calculateEMA,

    calculateRSI,

    calculateMACD,

    calculateATR

};