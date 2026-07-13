const API =
"http://localhost:3000";



// Check Sentinel AI status

async function loadStatus(){

    try {

        const response =
        await fetch(API);


        const data =
        await response.json();


        document.getElementById(
            "agentStatus"
        ).innerText =
        `
        🟢 ${data.status}

        Agent:
        ${data.agent}

        Version:
        ${data.version}
        `;


    }
    catch(error){

        document.getElementById(
            "agentStatus"
        ).innerText =
        "🔴 Offline";

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



    }

    catch(error){


        document.getElementById(
            "analysis"
        ).innerText =
        error.message;


    }


}




loadStatus();