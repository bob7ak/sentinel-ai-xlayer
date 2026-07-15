require("dotenv").config();

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const SentinelAgent = require("../agent/brain");
const ContractAgent = require("../blockchainAgent/contractAgent");
const RegistryAgent = require("../blockchainAgent/registryAgent");

const jobManager = require("../services/jobManager");
const identityManager = require("../services/identityManager");


const app = express();

app.use(cors());
app.use(express.json());



const agent = new SentinelAgent();

const blockchain = new ContractAgent();

const registry = RegistryAgent;







// =====================================
// MCP Response Helpers
// Milestone 25.4
// =====================================

function mcpSuccess(res, tool, data){

    return res.json({

        success:true,

        tool,

        timestamp:new Date().toISOString(),

        data

    });

}



function mcpError(res, tool, error, code=500){

    return res.status(code).json({

        success:false,

        tool,

        timestamp:new Date().toISOString(),

        error

    });

}






// =====================================
// Real MCP Tool Registry
// Milestone 25.5
// =====================================


const toolRegistry = {


    analyze_crypto_risk:{


        description:
        "Analyze cryptocurrency market risk using AI reasoning, technical indicators and blockchain verified proof storage.",


        inputSchema:{

            request:"string"

        },


        async execute(args){


            const jobId =
            jobManager.createJob();



            agent.analyze(

                args.request ||

                "Analyze crypto risk"

            )

            .then(async(result)=>{


                const reportData =
                JSON.stringify(result);



                const reportHash =
                crypto
                .createHash("sha256")
                .update(reportData)
                .digest("hex");



                const asset =
                result.asset ??

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



                jobManager.updateJob(

                    jobId,

                    {


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


                    }

                );


            })


            .catch(error=>{


                jobManager.updateJob(

                    jobId,

                    {

                        error:error.message

                    }

                );


            });



            return {


                status:"processing",


                jobId,


                resultEndpoint:

                `/result/${jobId}`


            };


        }


    },







    get_analysis_result:{


        description:

        "Retrieve asynchronous Sentinel AI analysis job results.",



        inputSchema:{

            jobId:"string"

        },



        async execute(args){


            const job =

            jobManager.getJob(

                args.jobId

            );



            if(!job){

                throw new Error(

                    "Job not found"

                );

            }



            return job;


        }


    },







    verify_blockchain_proof:{


        description:

        "Verify an AI-generated risk report stored on X Layer Testnet.",



        inputSchema:{

            hash:"string"

        },



        async execute(args){


            return await blockchain.verifyReport(

                args.hash

            );


        }


    }


};







// =====================================
// Basic Service Status
// =====================================

app.get("/",(req,res)=>{


    res.json({


        project:"Sentinel AI X Layer",

        status:"running",

        agent:agent.name,

        version:agent.version,

        network:"X Layer Testnet"


    });


});






// =====================================
// Health Endpoint
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
// Service Description
// =====================================

app.get("/service",(req,res)=>{


    res.json({


        name:"Sentinel AI Risk Intelligence API",

        type:"A2MCP",


        description:

        "Autonomous crypto risk analysis service with AI reasoning, technical indicators and blockchain verified proofs.",


        capabilities:[

            "crypto-market-analysis",

            "risk-scoring",

            "technical-analysis",

            "AI-report-generation",

            "blockchain-proof-verification"

        ],


        network:"X Layer Testnet",


        endpoints:{


            analyze:"POST /analyze",

            result:"GET /result/:jobId",

            identity:"GET /identity",

            mcpInfo:"GET /mcp/info",

            mcpTools:"GET /mcp/tools",

            mcpCall:"POST /mcp/call"


        }


    });


});






// ===============================
// PART 1 END
// CONTINUE PART 2 BELOW
// ===============================// =====================================
// A2MCP Discovery Information
// =====================================

app.get("/mcp/info",(req,res)=>{


    res.json({


        name:"Sentinel AI Risk Intelligence",

        type:"A2MCP",

        version:"1.0.0",


        description:
        "Autonomous crypto risk analysis agent with AI reasoning and blockchain verified proofs.",


        network:"X Layer Testnet",

        status:"online",


        capabilities:[


            "crypto-market-analysis",

            "risk-scoring",

            "technical-analysis",

            "AI-report-generation",

            "blockchain-proof-verification"


        ],


        identityEndpoint:"/identity"


    });


});







// =====================================
// Identity Endpoint
// Milestone 26.1
// =====================================

app.get("/identity",(req,res)=>{


    try{


        res.json({


            success:true,


            identity:
            identityManager.getIdentity()



        });


    }


    catch(error){


        res.status(500).json({


            success:false,

            error:error.message


        });


    }


});









// =====================================
// MCP Tools Discovery
// Milestone 25.5
// =====================================

app.get("/mcp/tools",(req,res)=>{


    res.json({


        agent:"Sentinel AI Risk Intelligence",

        type:"A2MCP",

        version:"1.0.0",


        tools:Object.entries(toolRegistry)
        .map(([name,tool])=>({


            name,

            description:
            tool.description,


            method:"POST",

            endpoint:"/mcp/call",


            inputSchema:
            tool.inputSchema


        }))


    });


});









// =====================================
// MCP Tool Execution Router
// Milestone 25.4 + 25.5 + 26.2
// =====================================

app.post("/mcp/call",async(req,res)=>{


    const {


        tool,


        arguments:args={}


    } = req.body;




    try{



        // =============================
        // API KEY VERIFICATION
        // Milestone 26.2
        // =============================


        const apiKey =
        req.headers["x-api-key"];




        if(
            !identityManager.verifyApiKey(apiKey)
        ){


            return mcpError(

                res,

                tool || null,

                "Invalid API key",

                401

            );


        }





        // =============================
        // TOOL NAME CHECK
        // =============================


        if(!tool){


            return mcpError(

                res,

                null,

                "Tool name required",

                400

            );


        }






        // =============================
        // PERMISSION CHECK
        // Milestone 26.2
        // =============================


        if(
            !identityManager.hasPermission(tool)
        ){


            return mcpError(

                res,

                tool,

                "Permission denied",

                403

            );


        }






        // =============================
        // TOOL LOOKUP
        // =============================


        const selectedTool =
        toolRegistry[tool];





        if(!selectedTool){


            return mcpError(

                res,

                tool,

                "Unknown MCP tool",

                404

            );


        }






        // =============================
        // EXECUTE TOOL
        // =============================


        const result =
        await selectedTool.execute(args);




        return mcpSuccess(

            res,

            tool,

            result

        );




    }


    catch(error){


        return mcpError(

            res,

            tool,

            error.message

        );


    }


});






// ===============================
// PART 2 END
// CONTINUE PART 3 BELOW
// ===============================// =====================================
// On-chain AI Agent Identity
// =====================================

app.get("/agent",async(req,res)=>{


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
// Direct AI Analysis Endpoint
// =====================================

app.post("/analyze",async(req,res)=>{


    const jobId =
    jobManager.createJob();



    res.json({


        jobId,


        status:"processing",


        message:
        "Sentinel AI analysis started",


        resultEndpoint:
        `/result/${jobId}`


    });




    try{


        const result =
        await agent.analyze(

            req.body.request

        );





        const reportData =
        JSON.stringify(result);





        const reportHash =
        crypto

        .createHash("sha256")

        .update(reportData)

        .digest("hex");





        jobManager.updateJob(


            jobId,


            {


                ...result,


                blockchainProof:

                reportHash


            }


        );



    }



    catch(error){


        jobManager.updateJob(


            jobId,


            {


                error:error.message


            }


        );


    }



});











// =====================================
// Get Async Result
// =====================================

app.get("/result/:jobId",(req,res)=>{


    const job =

    jobManager.getJob(

        req.params.jobId

    );





    if(!job){


        return res.status(404).json({


            error:"Job not found"


        });


    }





    res.json(job);



});











// =====================================
// Get All AI Proof Reports
// =====================================

app.get("/reports",async(req,res)=>{


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


        res.status(500).json({


            error:error.message


        });


    }



});












// =====================================
// Verify Blockchain Proof
// =====================================

app.get("/verify/:hash",async(req,res)=>{


    try{


        const result =

        await blockchain.verifyReport(


            req.params.hash


        );



        res.json(result);



    }



    catch(error){


        res.status(500).json({


            error:error.message


        });


    }



});












// =====================================
// Start Server
// =====================================

const PORT =

process.env.PORT || 3000;




app.listen(PORT,()=>{


    console.log(

        `Sentinel AI running on port ${PORT}`

    );


});