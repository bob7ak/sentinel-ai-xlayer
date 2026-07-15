const { exec } = require("child_process");
const util = require("util");

const execAsync = util.promisify(exec);


class OKXClient {


    async getBalance(){

        const {stdout} = await execAsync(
            "okx account balance"
        );

        return stdout;

    }



    async getTicker(symbol){

        const {stdout} = await execAsync(
            `okx market ticker ${symbol}`
        );

        return stdout;

    }



    async executeDemoOrder(args){

        const command =
        `okx --demo ${args.module} ${args.action} ${args.params || ""}`;


        const {stdout,stderr} =
        await execAsync(command);


        return {

            output:stdout,

            error:stderr || null

        };

    }


}


module.exports = OKXClient;