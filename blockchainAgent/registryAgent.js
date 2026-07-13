require("dotenv").config();

const { ethers } = require("ethers");
const registryConfig = require("./registryConfig");


const provider = new ethers.JsonRpcProvider(
    "https://testrpc.xlayer.tech"
);


// Wallet from .env
const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    provider
);


const registryContract = new ethers.Contract(
    registryConfig.address,
    registryConfig.abi,
    wallet
);



async function registerAgent(name, capabilities) {

    console.log("Registering Sentinel AI Agent...");

    const tx = await registryContract.registerAgent(
        name,
        capabilities
    );


    console.log("Transaction sent:");
    console.log(tx.hash);


    const receipt = await tx.wait();


    console.log("Confirmed block:");
    console.log(receipt.blockNumber);


    return tx.hash;
}



async function getAgent(agentId){

    const agent =
        await registryContract.getAgent(agentId);


    return agent;

}



async function incrementReports(agentId){

    const tx =
        await registryContract.incrementReports(agentId);


    await tx.wait();


    return tx.hash;

}



module.exports = {

    registerAgent,
    getAgent,
    incrementReports

};