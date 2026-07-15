const fs = require("fs");

const file = "api/server.js";

const backup = "api/server.before-asp-upgrade.js";


// Backup first
fs.copyFileSync(file, backup);

console.log("Backup created:", backup);


let code = fs.readFileSync(file, "utf8");


// =======================================
// Upgrade analyze_crypto_risk schema
// =======================================

code = code.replace(
`inputSchema:{


            request:"string"


        },`,
`
inputSchema:{

            asset:{
                type:"string",
                description:"Trading pair or cryptocurrency asset to analyze.",
                example:"BTC-USDT"
            },

            analysisType:{
                type:"string",
                description:"Type of analysis requested.",
                example:"risk"
            }

        },`
);


// =======================================
// Upgrade analyze request builder
// =======================================

code = code.replace(
`agent.analyze(


                args.request ||


                "Analyze crypto risk"


            )`,
`
agent.analyze(

                args.request ||

                \`Analyze \${args.asset || "BTC-USDT"} \${args.analysisType || "risk"} conditions\`

            )`
);


// =======================================
// Upgrade MCP info description
// =======================================

code = code.replace(
`"Autonomous Web3 AI risk intelligence agent running on X Layer."`,
`"AI-powered cryptocurrency risk analysis service providing real-time market intelligence, technical indicators, LLM-based reasoning, and blockchain-verifiable risk reports."`
);


// Add pricing + extra capability
code = code.replace(
`
        identityEndpoint:

        "/identity",`,
`
        identityEndpoint:

        "/identity",


        pricing:

        "free",`
);


code = code.replace(
`
            "blockchain-proof-verification"


        ]`,
`
            "blockchain-proof-verification",

            "verifiable-ai-reports"


        ]`
);


fs.writeFileSync(file, code);

console.log("ASP metadata upgrade completed.");