const ContractAgent =
require("./blockchainAgent/contractAgent");


async function main(){


    const agent =
    new ContractAgent();



    const result =
    await agent.storeReport(

        "BTC-USDT",

        35,

        "MODERATE RISK",

        "sentinel-btc-report-001"

    );


    console.log(result);


}


main();