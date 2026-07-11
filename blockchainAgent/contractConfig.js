module.exports = {

    address:
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",


    abi:[

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
        },


        {
            "inputs":[],

            "name":"getReports",

            "outputs":[
                {
                    "components":[

                        {
                            "internalType":"address",
                            "name":"user",
                            "type":"address"
                        },

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
                            "internalType":"uint256",
                            "name":"timestamp",
                            "type":"uint256"
                        },

                        {
                            "internalType":"string",
                            "name":"reportHash",
                            "type":"string"
                        }

                    ],

                    "internalType":"struct SentinelReport.Report[]",

                    "name":"",

                    "type":"tuple[]"
                }
            ],

            "stateMutability":"view",

            "type":"function"
        }

    ]

};