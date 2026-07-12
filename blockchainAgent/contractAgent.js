require("dotenv").config();

const { ethers } = require("ethers");

const config = require("./contractConfig");


class ContractAgent {


    constructor(){


        if(!process.env.PRIVATE_KEY){

            throw new Error(
                "PRIVATE_KEY missing from environment"
            );

        }


        // X Layer Testnet RPC
        this.provider =
        new ethers.JsonRpcProvider(
            config.network.rpc
        );


        this.wallet =
        new ethers.Wallet(
            process.env.PRIVATE_KEY,
            this.provider
        );


        this.contract =
        new ethers.Contract(

            config.contracts.SentinelReport.address,

            config.contracts.SentinelReport.abi,

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