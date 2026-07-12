require("dotenv").config();

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const SentinelAgent = require("../agent/brain");
const ContractAgent = require("../blockchainAgent/contractAgent");


const app = express();

app.use(cors());
app.use(express.json());


const agent = new SentinelAgent();

const blockchain = new ContractAgent();



app.get("/", (req, res) => {

    res.json({

        project: "Sentinel AI X Layer",

        status: "running",

        agent: agent.name,

        version: agent.version

    });

});



app.post("/analyze", async (req, res) => {

    try {


        const result =
        await agent.analyze(
            req.body.request
        );



        const reportData =
        JSON.stringify({

            market: result.market,

            technical: result.technical,

            indicators: result.indicators,

            risk: result.risk,

            analysis: result.analysis

        });



        const reportHash =
        crypto
        .createHash("sha256")
        .update(reportData)
        .digest("hex");



        const asset =
        result.asset ??
        result.market?.asset ??
        "BTC-USDT";



        const riskScore =
        result.risk?.score ??
        result.risk?.riskScore ??
        0;



        const decision =
        result.risk?.level ??
        result.risk?.decision ??
        "UNKNOWN";



        const blockchainResult =
        await blockchain.storeReport(

            asset,

            riskScore,

            decision,

            reportHash

        );



        res.json({

            ...result,


            blockchain: {

                stored: true,

                reportHash,

                transaction:
                blockchainResult.transaction,

                status:
                blockchainResult.status

            }

        });



    }
    catch(error){


        console.log(error);


        res.status(500).json({

            error:error.message

        });


    }

});





// Verify AI proof stored on blockchain

app.get("/verify/:hash", async (req, res) => {

    try {


        const result =
        await blockchain.verifyReport(

            req.params.hash

        );



        res.json(result);



    }
    catch(error){


        console.log(error);


        res.status(500).json({

            error:error.message

        });


    }

});





const PORT =
process.env.PORT || 3000;



app.listen(PORT, () => {

    console.log(
        `Sentinel AI running on port ${PORT}`
    );

});