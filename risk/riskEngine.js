class RiskEngine {


    calculate(indicators) {


        let riskScore = 50;

        let factors = [];



        /*
        RSI Analysis
        */

        if (indicators.RSI14 !== null) {


            if (indicators.RSI14 > 70) {

                riskScore += 15;

                factors.push(
                    "RSI is overbought - correction risk increased"
                );


            } else if (indicators.RSI14 < 30) {

                riskScore -= 10;

                factors.push(
                    "RSI is oversold - possible recovery zone"
                );


            } else {

                factors.push(
                    "RSI is in normal momentum range"
                );

            }

        }



        /*
        MACD Momentum
        */

        if (indicators.MACD) {


            if (
                indicators.MACD.macd >
                indicators.MACD.signal
            ) {


                riskScore -= 10;


                factors.push(
                    "MACD shows bullish momentum"
                );


            } else {


                riskScore += 10;


                factors.push(
                    "MACD shows weakening momentum"
                );

            }

        }



        /*
        Trend Analysis
        */

        if (
            indicators.price >
            indicators.EMA20
        ) {


            riskScore -= 5;


            factors.push(
                "Price above EMA20 - positive trend"
            );


        } else {


            riskScore += 10;


            factors.push(
                "Price below EMA20 - trend weakness"
            );

        }



        /*
        Volatility Analysis
        */

        if (indicators.ATR) {


            if (indicators.ATR > 500) {


                riskScore += 15;


                factors.push(
                    "High volatility detected"
                );


            } else {


                factors.push(
                    "Volatility is controlled"
                );

            }

        }



        // Keep score between 0-100

        riskScore = Math.max(
            0,
            Math.min(
                100,
                riskScore
            )
        );



        let decision;


        if (riskScore < 35) {

            decision = "LOW RISK";

        } else if (riskScore < 65) {

            decision = "MODERATE RISK";

        } else {

            decision = "HIGH RISK";

        }



        return {


            riskScore,

            decision,

            factors


        };


    }


}



module.exports = RiskEngine;