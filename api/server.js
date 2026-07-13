require("dotenv").config();

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const SentinelAgent = require("../agent/brain");
const ContractAgent = require("../blockchainAgent/contractAgent");
const RegistryAgent = require("../blockchainAgent/registryAgent");


const app = express();

app.use(cors());
app.use(express.json());



const agent = new SentinelAgent();

const blockchain = new ContractAgent();

const registry = RegistryAgent;





// =====================================
// Basic Service Status
// =====================================

app.get("/", (req,res)=>{

    res.json({

        project:"Sentinel AI X Layer",

        status:"running",

        agent:agent.name,

        version:agent.version,

        network:"X Layer Testnet"

    });

});





// =====================================
// OKX.AI ASP Health Endpoint
// =====================================

app.get("/health",(req,res)=>{

    res.json({

        service:"Sentinel AI",

        status:"online",

        type:"A2MCP",

        network:"X Layer Testnet",

        version:agent.version,

        timestamp:new Date().toISOString()

    });

});





// =====================================
// OKX.AI ASP Service Description
// =====================================

app.get("/service",(req,res)=>{

    res.json({

        name:"Sentinel AI Risk Intelligence API",

        type:"A2MCP",

        description:
        "Autonomous AI crypto risk analysis service providing market intelligence, technical indicators, explainable risk scoring, AI reports, and blockchain verified proofs.",


        capabilities:[

            "crypto-market-analysis",

            "risk-scoring",

            "technical-analysis",

            "AI-report-generation",

            "blockchain-proof-verification"

        ],


        network:"X Layer Testnet",

        blockchainProof:true,


        endpoints:{

            analyze:"POST /analyze",

            health:"GET /health",

            service:"GET /service"

        }


    });

});








// =====================================
// On-chain AI Agent Identity
// =====================================

app.get("/agent", async(req,res)=>{

    try{


        const agentData =
        await registry.getAgent(1);



        res.json({

            agentId:Number(agentData.agentId),

            owner:agentData.owner,

            name:agentData.name,

            capabilities:agentData.capabilities,

            createdAt:Number(agentData.createdAt),

            reportsGenerated:Number(agentData.reportsGenerated),

            active:agentData.active

        });


    }
    catch(error){

        console.log(error);

        res.status(500).json({

            error:error.message

        });

    }

});









// =====================================
// AI Analysis + Explainable AI Blockchain Proof
// =====================================


app.post("/analyze", async(req,res)=>{

    try{


        const result =
        await agent.analyze(
            req.body.request
        );




        const reportData =
        JSON.stringify({

            agent:
            result.agent,


            version:
            result.version,


            asset:
            result.asset,


            market:
            result.market,


            technical:
            result.technical,


            risk:{

                score:
                result.risk?.score,


                level:
                result.risk?.level,


                confidence:
                result.risk?.confidence,


                recommendation:
                result.risk?.recommendation,


                categories:
                result.risk?.categories,


                summary:
                result.risk?.summary,


                factors:
                result.risk?.factors

            },


            analysis:
            result.analysis

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
        0;





        const decision =
        result.risk?.level ??
        "UNKNOWN";







        const blockchainResult =
        await blockchain.storeReport(

            asset,

            riskScore,

            decision,

            reportHash

        );








        const registryTransaction =
        await registry.incrementSentinelReports();








        res.json({

            ...result,


            blockchain:{


                stored:true,


                reportHash,


                transaction:
                blockchainResult.transaction,


                registryTransaction,


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









// =====================================
// Get All AI Proof Reports
// =====================================

app.get("/reports", async(req,res)=>{


    try{


        const reports =
        await blockchain.getReports();




        res.json({

            agent:"Sentinel AI",

            network:"X Layer Testnet",

            totalReports:
            reports.length,


            reports

        });



    }
    catch(error){


        console.log(error);


        res.status(500).json({

            error:error.message

        });


    }


});









// =====================================
// Verify Blockchain Proof
// =====================================

app.get("/verify/:hash", async(req,res)=>{


    try{


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



app.listen(PORT,()=>{


    console.log(

        `Sentinel AI running on port ${PORT}`

    );


});