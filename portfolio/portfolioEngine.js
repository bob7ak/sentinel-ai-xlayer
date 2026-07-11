class PortfolioEngine {


    analyze(assets) {


        let totalValue = 0;

        let holdings = [];



        for(const asset of assets){


            const value =
                asset.amount *
                asset.price;



            totalValue += value;



            holdings.push({

                symbol:
                    asset.symbol,

                amount:
                    asset.amount,

                value:
                    Number(
                        value.toFixed(2)
                    )

            });


        }



        let riskScore = 50;



        if(assets.length >= 3){

            riskScore -= 10;

        }
        else{

            riskScore += 10;

        }



        const concentration =
            assets
            .sort(
                (a,b)=>
                (b.amount*b.price) -
                (a.amount*a.price)
            )[0];



        return {


            totalValue:
                Number(
                    totalValue.toFixed(2)
                ),


            holdings,


            concentrationRisk:
                concentration.symbol,


            riskScore:


                Math.max(
                    0,
                    Math.min(
                        100,
                        riskScore
                    )
                )


        };


    }


}


module.exports = PortfolioEngine;