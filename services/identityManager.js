require("dotenv").config();


const identity = {

    agentId:"sentinel-ai-xlayer",

    name:"Sentinel AI Risk Intelligence",

    type:"A2MCP",

    version:"1.0.0",

    network:"X Layer Testnet",

    permissions:[

        "analyze_crypto_risk",

        "get_analysis_result",

        "verify_blockchain_proof"

    ]

};





function getIdentity(){

    return identity;

}





function verifyApiKey(apiKey){


    if(!apiKey){

        return false;

    }


    return (

        apiKey === process.env.SENTINEL_API_KEY

    );


}





function hasPermission(tool){


    return identity.permissions.includes(tool);


}





module.exports={

    getIdentity,

    verifyApiKey,

    hasPermission

};