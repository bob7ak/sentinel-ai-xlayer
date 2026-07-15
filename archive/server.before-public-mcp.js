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
// =====================================

function mcpSuccess(res, tool, data){

    return res.json({

        success:true,

        service:
        "Sentinel AI Risk Intelligence",

        type:
        "A2MCP",

        tool,

        timestamp:
        new Date().toISOString(),

        data

    });

}



function mcpError(res, tool, error, code=500){

    return res.status(code).json({

        success:false,

        service:
        "Sentinel AI Risk Intelligence",

        tool,

        timestamp:
        new Date().toISOString(),

        error

    });

}







// =====================================
// MCP Tool Registry
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


                        service:

                        "Sentinel AI Risk Intelligence",



                        version:

                        "1.0.0",



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


                status:

                "processing",



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
// Root Service
// =====================================

app.get("/",(req,res)=>{


    res.json({


        project:

        "Sentinel AI X Layer",



        service:

        "Sentinel AI Risk Intelligence",



        status:

        "running",



        type:

        "A2MCP",



        version:

        "1.0.0",



        network:

        "X Layer Testnet"


    });


});





// =====================================
// Health Endpoint
// =====================================

app.get("/health",(req,res)=>{


    res.json({


        service:

        "Sentinel AI Risk Intelligence",



        status:

        "online",



        type:

        "A2MCP",



        version:

        "1.0.0",



        network:

        "X Layer Testnet",



        timestamp:

        new Date().toISOString()


    });


});
// =====================================
// Service Description
// =====================================

app.get("/service",(req,res)=>{


    res.json({


        name:

        "Sentinel AI Risk Intelligence API",



        type:

        "A2MCP",



        version:

        "1.0.0",



        description:

        "Autonomous crypto risk intelligence service providing AI analysis, technical indicators, risk scoring and blockchain verified proofs.",



        capabilities:[


            "crypto-market-analysis",


            "risk-scoring",


            "technical-analysis",


            "AI-report-generation",


            "blockchain-proof-verification"


        ],



        network:

        "X Layer Testnet",

 

pricing:{

    type:
    "free",

    amount:
    0,

    currency:
    "USDC",

    description:
    "Free AI risk analysis service"

},



        endpoints:{


            analyze:

            "POST /analyze",



            result:

            "GET /result/:jobId",



            identity:

            "GET /identity",



            mcpInfo:

            "GET /mcp/info",



            mcpTools:

            "GET /mcp/tools",



            mcpCall:

            "POST /mcp/call"


        }


    });


});



// =====================================
// OKX ASP Manifest
// =====================================

app.get("/asp/manifest",(req,res)=>{

    res.json({

        name:
        "Sentinel AI Risk Intelligence",


        type:
        "A2MCP",


        category:
        "Crypto Risk Analysis",


        description:
        "AI-powered cryptocurrency risk intelligence service providing technical analysis, risk scoring, LLM reasoning and blockchain verified reports.",


        developer:
        "Sentinel AI",


        version:
        "1.0.0",


        network:
        "X Layer Testnet",


        pricing:{

            model:
            "free",

            amount:
            0,

            currency:
            "USDC"

        },


        tools:[

            "analyze_crypto_risk",

            "get_analysis_result",

            "verify_blockchain_proof"

        ],


        capabilities:[

            "real-time-market-analysis",

            "technical-indicators",

            "AI-risk-assessment",

            "blockchain-proof-verification"

        ],


        endpoints:{

            info:
            "/mcp/info",

            tools:
            "/mcp/tools",

            execute:
            "/mcp/call"

        }

    });

});




// =====================================
// A2MCP Discovery
// =====================================
// =====================================
// MCP Health Check
// OKX.AI ASP Compatibility
// =====================================

app.get("/mcp/health",(req,res)=>{

    res.json({

        service:
        "Sentinel AI Risk Intelligence",

        type:
        "A2MCP",

        status:
        "online",

        mcp:
        "ready",

        network:
        "X Layer Testnet",

        timestamp:
        new Date().toISOString()

    });

});// =====================================
// MCP Usage Examples
// OKX.AI ASP Discovery
// =====================================

app.get("/mcp/examples",(req,res)=>{

    res.json({

        service:
        "Sentinel AI Risk Intelligence",

        examples:[

            {

                name:
                "Analyze crypto risk",

                method:
                "POST",

                endpoint:
                "/mcp/call",

                request:{

                    tool:
                    "analyze_crypto_risk",

                    arguments:{

                        request:
                        "Analyze BTC-USDT market risk"

                    }

                }

            },

            {

                name:
                "Retrieve analysis result",

                method:
                "POST",

                endpoint:
                "/mcp/call",

                request:{

                    tool:
                    "get_analysis_result",

                    arguments:{

                        jobId:
                        "sentinel-job-id"

                    }

                }

            },

            {

                name:
                "Verify blockchain proof",

                method:
                "POST",

                endpoint:
                "/mcp/call",

                request:{

                    tool:
                    "verify_blockchain_proof",

                    arguments:{

                        hash:
                        "report-hash"

                    }

                }

            }

        ]

    });

});
app.get("/mcp/info",(req,res)=>{


    res.json({


        name:

        "Sentinel AI Risk Intelligence",



        type:

        "A2MCP",



        version:

        "1.0.0",



        description:

        "AI-powered cryptocurrency risk analysis service providing real-time market intelligence, technical indicators, LLM-based reasoning, and blockchain-verifiable risk reports.",



        network:

        "X Layer Testnet",



        status:

        "online",pricing:{

    type:
    "free",

    amount:
    0,

    currency:
    "USDC",

    description:
    "Free AI risk analysis service"

},



        identityEndpoint:

        "/identity",



        capabilities:[


            "crypto-market-analysis",


            "risk-scoring",


            "technical-analysis",


            "AI-report-generation",


            "blockchain-proof-verification"


        ]


    });


});








// =====================================
// Agent Identity
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
// MCP Tool Discovery
// =====================================

app.get("/mcp/tools",(req,res)=>{


    res.json({


        agent:

        "Sentinel AI Risk Intelligence",



        type:

        "A2MCP",



        version:

        "1.0.0",



        tools:


        Object.entries(toolRegistry)

        .map(([name,tool])=>({



            name,



            description:

            tool.description,



            method:

            "POST",



            endpoint:

            "/mcp/call",



            inputSchema:

            tool.inputSchema



        }))



    });


});








// =====================================
// MCP Execution Router
// API Key + Permission Security
// =====================================

app.post("/mcp/call",async(req,res)=>{


    const {


        tool,


        arguments:args={}


    } = req.body;





    try{



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






        if(!tool){


            return mcpError(


                res,


                null,


                "Tool name required",


                400


            );


        }







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








// =====================================
// On-chain Agent Identity
// =====================================

app.get("/agent",async(req,res)=>{


    try{


        const agentData =

        await registry.getAgent(1);




        res.json({



            agentId:

            Number(agentData.agentId),



            owner:

            agentData.owner,



            name:

            agentData.name,



            capabilities:

            agentData.capabilities,



            createdAt:

            Number(agentData.createdAt),



            reportsGenerated:

            Number(agentData.reportsGenerated),



            active:

            agentData.active



        });



    }


    catch(error){


        res.status(500).json({


            error:error.message


        });


    }


});
// =====================================
// Public Demo Endpoint
// OKX ASP Showcase
// =====================================
app.post("/demo/analyze", async(req,res)=>{

    const requestId =
    crypto.randomUUID();


    const jobId =
    jobManager.createJob();



    res.json({

        service:
        "Sentinel AI Risk Intelligence",


        type:
        "A2MCP Demo",


        requestId,


        jobId,


        status:
        "processing",


        message:
        "Demo BTC-USDT risk analysis started",


        resultEndpoint:
        `/result/${jobId}`

    });



    try{


                const result =
        await agent.analyze(

            "Analyze BTC-USDT market risk for demonstration"

        );



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

                demo:true,

                service:
                "Sentinel AI Risk Intelligence",


                type:
                "A2MCP Demo",


                version:
                "1.0.0",


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

        } 
        
    catch(error){


        jobManager.updateJob(

            jobId,

            {

                error:
                error.message

            }

        );


    }


});
// =====================================
// Direct AI Analysis Endpoint
// OKX.AI A2MCP Ready
// =====================================

app.post("/analyze",async(req,res)=>{


    const requestId =

    crypto.randomUUID();




    const startedAt =

    new Date().toISOString();




    const jobId =

    jobManager.createJob();





    // Immediate A2MCP response

    res.json({


        service:

        "Sentinel AI Risk Intelligence",



        type:

        "A2MCP",



        version:

        "1.0.0",



        requestId,



        timestamp:

        startedAt,



        jobId,



        status:

        "processing",



        message:

        "Sentinel AI analysis started",



        resultEndpoint:

        `/result/${jobId}`


    });





    try{


        const result =

        await agent.analyze(


            req.body.request ||

            "Analyze crypto risk"


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


                service:

                "Sentinel AI Risk Intelligence",



                type:

                "A2MCP",



                version:

                "1.0.0",



                requestId,



                timestamp:

                startedAt,



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


                requestId,



                error:

                error.message



            }


        );


    }



});









// =====================================
// Get Analysis Result
// =====================================

app.get("/result/:jobId",(req,res)=>{


    const job =

    jobManager.getJob(

        req.params.jobId

    );





    if(!job){


        return res.status(404).json({


            success:false,


            error:

            "Job not found"


        });


    }






    res.json({


        success:true,



        service:

        "Sentinel AI Risk Intelligence",



        type:

        "A2MCP",



        result:

        job



    });



});









// =====================================
// Blockchain Reports
// =====================================

app.get("/reports",async(req,res)=>{


    try{


        const reports =

        await blockchain.getReports();




        res.json({



            service:

            "Sentinel AI Risk Intelligence",



            network:

            "X Layer Testnet",



            totalReports:

            reports.length,



            reports



        });



    }


    catch(error){


        res.status(500).json({


            error:

            error.message


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





        res.json({


            service:

            "Sentinel AI Risk Intelligence",



            verified:true,



            result



        });



    }


    catch(error){



        res.status(500).json({


            verified:false,


            error:

            error.message



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