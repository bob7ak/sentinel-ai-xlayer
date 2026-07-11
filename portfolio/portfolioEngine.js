const { getTokenPrice } =
require("../market/tokenPrice");



class PortfolioEngine {


    async analyze(assets) {


        let totalValue = 0;

        let holdings = [];



        for(const asset of assets){


            const market =
                await getTokenPrice(
                    asset.symbol
                );



            const value =
                asset.amount *
                market.price;



            totalValue += value;



            holdings.push({


                symbol:
                    asset.symbol,


                amount:
                    asset.amount,


                price:
                    market.price,


                value:
                    Number(
                        value.toFixed(2)
                    )


            });


        }




        const largest =
            holdings.sort(
                (a,b)=>
                b.value - a.value
            )[0];



        let riskScore = 50;



        if(holdings.length >= 3){

            riskScore -= 10;

        }
        else{

            riskScore += 10;

        }



        if(
            largest.value /
            totalValue
            >
            0.7
        ){

            riskScore += 15;

        }



        return {


            totalValue:
                Number(
                    totalValue.toFixed(2)
                ),



            holdings,



            concentrationRisk:
                largest.symbol,



            riskScore:
                Math.min(
                    100,
                    riskScore
                )


        };


    }


}



module.exports = PortfolioEngine;