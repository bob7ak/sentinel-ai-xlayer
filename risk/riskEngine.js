class RiskEngine {


    calculate(indicators) {


        let riskScore = 50;

        let factors = [];

        let categories = {

            momentumRisk: 0,

            trendRisk: 0,

            volatilityRisk: 0,

            marketRisk: 0

        };



        // RSI

        if(indicators.RSI14 !== null){


            if(indicators.RSI14 > 70){

                riskScore += 15;

                categories.momentumRisk += 20;

                factors.push(
                    "RSI overbought - correction risk"
                );


            }
            else if(indicators.RSI14 < 30){


                riskScore -= 10;

                categories.momentumRisk -= 10;


                factors.push(
                    "RSI oversold - recovery opportunity"
                );


            }

        }



        // MACD

        if(indicators.MACD){


            if(
                indicators.MACD.macd >
                indicators.MACD.signal
            ){

                riskScore -= 10;

                categories.momentumRisk -= 10;


                factors.push(
                    "MACD bullish momentum"
                );


            }
            else{


                riskScore += 10;

                categories.momentumRisk += 10;


                factors.push(
                    "MACD weakening momentum"
                );


            }

        }




        // Trend

        if(
            indicators.price >
            indicators.EMA20
        ){


            riskScore -= 5;

            categories.trendRisk -= 5;


            factors.push(
                "Price above EMA20"
            );


        }
        else{


            riskScore += 10;

            categories.trendRisk += 10;


            factors.push(
                "Price below EMA20"
            );


        }




        // Volatility

        if(indicators.ATR){


            if(indicators.ATR > 500){


                riskScore += 15;

                categories.volatilityRisk += 15;


                factors.push(
                    "High volatility"
                );


            }
            else{


                factors.push(
                    "Volatility controlled"
                );


            }

        }





        riskScore = Math.max(
            0,
            Math.min(
                100,
                riskScore
            )
        );



        let decision;


        if(riskScore < 35){

            decision="LOW RISK";

        }
        else if(riskScore <65){

            decision="MODERATE RISK";

        }
        else{

            decision="HIGH RISK";

        }




        let recommendation;


        if(riskScore >=65){

            recommendation =
            "REDUCE EXPOSURE";

        }
        else if(riskScore >=35){

            recommendation =
            "WAIT";

        }
        else{

            recommendation =
            "ACCUMULATE";

        }




        const confidence =
        Math.min(
            95,
            60 +
            Math.abs(
                riskScore - 50
            )
        );




        return {


            riskScore,


            decision,


            confidence,


            recommendation,


            categories,


            factors,


            summary:

            `Market assessment shows ${decision}. ${recommendation} strategy recommended.`


        };


    }


}



module.exports = RiskEngine;