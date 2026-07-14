const fs = require("fs");
const path = require("path");


const file =
path.join(
    __dirname,
    "jobs.json"
);





function loadJobs(){

    if(!fs.existsSync(file)){

        fs.writeFileSync(
            file,
            JSON.stringify({})
        );

    }


    const content =
    fs.readFileSync(file, "utf8");


    if(!content.trim()){

        return {};

    }


    return JSON.parse(content);

}






function saveJobs(jobs){

    fs.writeFileSync(

        file,

        JSON.stringify(
            jobs,
            null,
            2
        )

    );

}








function createJob(){


    const jobs =
    loadJobs();



    const id =
    "sentinel-" +
    Date.now();




    jobs[id]={


        id,


        status:"processing",


        createdAt:
        new Date().toISOString(),


        result:null

    };




    saveJobs(jobs);



    return id;

}









function updateJob(id,data){


    const jobs =
    loadJobs();




    if(!jobs[id]){

        return;

    }





    // Successful AI job

    if(
        !data.error
    ){

        jobs[id]={

            ...jobs[id],

            status:"completed",

            result:data,

            completedAt:
            new Date().toISOString()

        };


    }



    // Failed AI job

    else{


        jobs[id]={


            ...jobs[id],


            status:"failed",


            error:{


                message:
                "AI model unavailable",


                details:
                data.error,


                retryable:true


            },


            completedAt:
            new Date().toISOString()


        };


    }





    saveJobs(jobs);



}









function getJob(id){


    const jobs =
    loadJobs();



    return jobs[id] || null;


}






module.exports={


    createJob,


    updateJob,


    getJob


};