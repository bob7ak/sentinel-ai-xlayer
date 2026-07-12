require("dotenv").config();

const { ethers } = require("ethers");

const config = require("./contractConfig");


class ContractAgent {


    constructor(){


        // X Layer Testnet RPC
        this.provider =
        new ethers.JsonRpcProvider(
            "https://testrpc.xlayer.tech"
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
            "stored on X Layer Testnet"

        };

    }



    async verifyReport(reportHash){


        const reports =
        await this.contract.getReports();



        const report =
        reports.find(

            item =>
            item.reportHash === reportHash

        );



        if(!report){


            return {

                verified:false,

                message:
                "Report not found on X Layer"

            };

        }



        return {


            verified:true,


            report:{


                user:
                report.user,


                asset:
                report.asset,


                riskScore:
                Number(report.riskScore),


                decision:
                report.decision,


                timestamp:
                Number(report.timestamp),


                reportHash:
                report.reportHash

            }

        };


    }


}



module.exports = ContractAgent;