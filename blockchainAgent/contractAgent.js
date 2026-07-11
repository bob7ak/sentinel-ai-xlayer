const { ethers } = require("ethers");


const CONTRACT_ADDRESS =
"0x5FbDB2315678afecb367f032d93F642f64180aa3";



const ABI = [

{
    "inputs":[
        {
            "internalType":"string",
            "name":"asset",
            "type":"string"
        },
        {
            "internalType":"uint256",
            "name":"riskScore",
            "type":"uint256"
        },
        {
            "internalType":"string",
            "name":"decision",
            "type":"string"
        },
        {
            "internalType":"string",
            "name":"reportHash",
            "type":"string"
        }
    ],
    "name":"storeReport",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
}

];



class ContractAgent {


constructor(){


const provider =
new ethers.JsonRpcProvider(
    "http://127.0.0.1:8545"
);



const wallet =
new ethers.Wallet(

"LOCAL_PRIVATE_KEY",

provider

);



this.contract =
new ethers.Contract(

CONTRACT_ADDRESS,

ABI,

wallet

);


}



async storeReport(
asset,
riskScore,
decision,
hash
){


const tx =
await this.contract.storeReport(

asset,

riskScore,

decision,

hash

);


await tx.wait();


return tx.hash;


}


}



module.exports = ContractAgent;