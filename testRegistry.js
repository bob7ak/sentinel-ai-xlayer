require("dotenv").config();

const registry =
require("./blockchainAgent/registryAgent");


async function main(){

    try {

        const tx =
        await registry.registerAgent(
            "Sentinel AI",
            [
                "portfolio-analysis",
                "risk-scoring",
                "crypto-monitoring"
            ]
        );


        console.log("\nAgent registered!");
        console.log("Transaction:");
        console.log(tx);


    } catch(error){

        console.error("Registration failed:");
        console.error(error);

    }

}


main();