module.exports = {

    address:
    "0x321E3E8ef23B1Addc9409a8FFac8512B6404F934",


    abi:[

        {
            "inputs":[
                {
                    "internalType":"string",
                    "name":"name",
                    "type":"string"
                },
                {
                    "internalType":"string[]",
                    "name":"capabilities",
                    "type":"string[]"
                }
            ],

            "name":"registerAgent",

            "outputs":[
                {
                    "internalType":"uint256",
                    "name":"",
                    "type":"uint256"
                }
            ],

            "stateMutability":"nonpayable",

            "type":"function"
        },


        {
            "inputs":[
                {
                    "internalType":"uint256",
                    "name":"agentId",
                    "type":"uint256"
                }
            ],

            "name":"getAgent",

            "outputs":[
                {
                    "components":[

                        {
                            "internalType":"uint256",
                            "name":"agentId",
                            "type":"uint256"
                        },

                        {
                            "internalType":"address",
                            "name":"owner",
                            "type":"address"
                        },

                        {
                            "internalType":"string",
                            "name":"name",
                            "type":"string"
                        },

                        {
                            "internalType":"string[]",
                            "name":"capabilities",
                            "type":"string[]"
                        },

                        {
                            "internalType":"uint256",
                            "name":"createdAt",
                            "type":"uint256"
                        },

                        {
                            "internalType":"uint256",
                            "name":"reportsGenerated",
                            "type":"uint256"
                        },

                        {
                            "internalType":"bool",
                            "name":"active",
                            "type":"bool"
                        }

                    ],

                    "internalType":"struct SentinelAgentRegistry.Agent",

                    "name":"",

                    "type":"tuple"
                }
            ],

            "stateMutability":"view",

            "type":"function"
        },


        {
            "inputs":[
                {
                    "internalType":"uint256",
                    "name":"agentId",
                    "type":"uint256"
                }
            ],

            "name":"incrementReports",

            "outputs":[],

            "stateMutability":"nonpayable",

            "type":"function"
        }

    ]

};