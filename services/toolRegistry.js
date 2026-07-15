const jobManager = require("./jobManager");
const crypto = require("crypto");

const tools = {};


function registerTool(name, description, inputSchema, handler){

    tools[name] = {

        name,

        description,

        inputSchema,

        handler

    };

}



function getTools(){

    return Object.values(tools).map(tool => ({

        name: tool.name,

        description: tool.description,

        method: "POST",

        endpoint: "/mcp/call",

        inputSchema: tool.inputSchema

    }));

}



async function executeTool(name, args){


    const tool = tools[name];


    if(!tool){

        throw new Error(
            "Tool not registered"
        );

    }


    return await tool.handler(args);

}



// ==================================
// Analyze Crypto Risk
// ==================================

registerTool(

"analyze_crypto_risk",

"Analyze cryptocurrency market risk using AI reasoning and blockchain proof.",

{
    request:"string"
},


async(args)=>{


    const SentinelAgent =
    require("../agent/brain");


    const agent =
    new SentinelAgent();



    const jobId =
    jobManager.createJob();



    agent.analyze(

        args.request ||
        "Analyze crypto risk"

    )

    .then(result=>{


        const hash =
        crypto
        .createHash("sha256")
        .update(JSON.stringify(result))
        .digest("hex");



        jobManager.updateJob(

            jobId,

            {

                ...result,

                blockchainProof:hash

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


);





// ==================================
// Get Analysis Result
// ==================================

registerTool(

"get_analysis_result",

"Retrieve Sentinel AI analysis result.",

{
    jobId:"string"
},


async(args)=>{


    return jobManager.getJob(

        args.jobId

    ) || {


        error:"Job not found"

    };


}


);







// ==================================
// Verify Blockchain Proof
// ==================================

registerTool(

"verify_blockchain_proof",

"Verify AI-generated risk report stored on X Layer Testnet.",

{
    hash:"string"
},


async(args)=>{


    const ContractAgent =
    require("../blockchainAgent/contractAgent");


    const blockchain =
    new ContractAgent();



    return await blockchain.verifyReport(

        args.hash

    );


}


);







// ==================================
// OKX Market Data Tool
// ==================================

registerTool(

"okx_market_ticker",

"Get live crypto market price from OKX demo environment.",

{
    symbol:"string"
},


async(args)=>{


    const OKXClient =
    require("./okxClient");


    const okx =
    new OKXClient();



    return await okx.getTicker(

        args.symbol || "BTC-USDT"

    );


}


);







// ==================================
// OKX Account Balance Tool
// ==================================

registerTool(

"okx_balance",

"Get Sentinel AI OKX demo trading account balance.",

{},


async()=>{


    const OKXClient =
    require("./okxClient");


    const okx =
    new OKXClient();



    return await okx.getBalance();


}


);







module.exports = {

    registerTool,

    getTools,

    executeTool

};