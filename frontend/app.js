const API =
"http://localhost:3000";


const XLAYER_EXPLORER =
"https://www.oklink.com/xlayer-test";



const SENTINEL_REPORT_CONTRACT =
"0xdc5F05b1A631687C13Ff3dB693F126b4f378b467";


const SENTINEL_AGENT_REGISTRY =
"0x321E3E8ef23B1Addc9409a8FFac8512B6404F934";






async function loadAgentIdentity(){

    try {


        const response =
        await fetch(
            `${API}/agent`
        );


        const data =
        await response.json();



        document.getElementById(
            "agentIdentity"
        ).innerText =
`
Agent ID:
${data.agentId}


Name:
${data.name}


Owner:
${data.owner}


Status:
${data.active ? "ACTIVE" : "INACTIVE"}


Capabilities:

${data.capabilities
.map(item => "✓ " + item)
.join("\n")}


Reports Generated:
${data.reportsGenerated}


Created At:
${new Date(data.createdAt * 1000).toLocaleString()}
`;



    }
    catch(error){


        document.getElementById(
            "agentIdentity"
        ).innerText =
        "Unable to load on-chain identity";


        console.log(error);


    }

}









async function analyze(){


    document.getElementById(
        "analysis"
    ).innerText =
    "Running Sentinel AI analysis...";



    try {


        const response =
        await fetch(
            `${API}/analyze`,
            {

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json"

                },


                body:
                JSON.stringify({

                    request:
                    "Analyze BTC market risk"

                })

            }
        );



        const data =
        await response.json();




        document.getElementById(
            "analysis"
        ).innerText =
        data.analysis;




        document.getElementById(
            "hash"
        ).innerText =
        data.blockchain.reportHash;





        document.getElementById(
            "transactionLink"
        ).href =
        `${XLAYER_EXPLORER}/tx/${data.blockchain.transaction}`;





        document.getElementById(
            "registryLink"
        ).href =
        `${XLAYER_EXPLORER}/tx/${data.blockchain.registryTransaction}`;





        document.getElementById(
            "reportContractLink"
        ).href =
        `${XLAYER_EXPLORER}/address/${SENTINEL_REPORT_CONTRACT}`;





        document.getElementById(
            "agentContractLink"
        ).href =
        `${XLAYER_EXPLORER}/address/${SENTINEL_AGENT_REGISTRY}`;





        loadAgentIdentity();



    }
    catch(error){


        document.getElementById(
            "analysis"
        ).innerText =
        error.message;


        console.log(error);


    }


}





// Static contract links on page load

document.getElementById(
    "reportContractLink"
).href =
`${XLAYER_EXPLORER}/address/${SENTINEL_REPORT_CONTRACT}`;



document.getElementById(
    "agentContractLink"
).href =
`${XLAYER_EXPLORER}/address/${SENTINEL_AGENT_REGISTRY}`;





loadAgentIdentity();