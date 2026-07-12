module.exports = {

    network: {
        name: "X Layer Testnet",
        chainId: 1952,
        rpc: "https://testrpc.xlayer.tech"
    },


    contracts: {

        SentinelReport: {

            address:
            "0xdc5F05b1A631687C13Ff3dB693F126b4f378b467",


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

        },


        SentinelAgentRegistry: {

            address:
            "0x321E3E8ef23B1Addc9409a8FFac8512B6404F934",

            abi: []

        }

    }

};