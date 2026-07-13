const API =
"http://localhost:3000";




// Load on-chain agent identity

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






// Run AI analysis

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
            "transaction"
        ).innerText =
        data.blockchain.transaction;




        document.getElementById(
            "registry"
        ).innerText =
        data.blockchain.registryTransaction;



        // refresh identity after new report

        loadAgentIdentity();



    }
    catch(error){


        document.getElementById(
            "analysis"
        ).innerText =
        error.message;


    }


}




// Start dashboard

loadAgentIdentity();