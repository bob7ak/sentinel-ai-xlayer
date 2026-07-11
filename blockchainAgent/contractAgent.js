require("dotenv").config();

const { ethers } = require("ethers");

const config =
require("./contractConfig");


class ContractAgent {


    constructor(){

        this.provider =
        new ethers.JsonRpcProvider(
            "http://127.0.0.1:8545"
        );


        this.wallet =
        new ethers.Wallet(
            process.env.PRIVATE_KEY,
            this.provider
        );


        this.contract =
        new ethers.Contract(
            config.address,
            config.abi,
            this.wallet
        );

    }



    async storeReport(
        asset,
        riskScore,
        decision,
        reportHash
    ){

        const tx =
        await this.contract.storeReport(

            asset,

            riskScore,

            decision,

            reportHash

        );


        await tx.wait();


        return {

            transaction:
            tx.hash,

            status:
            "stored on blockchain"

        };

    }


}


module.exports = ContractAgent;