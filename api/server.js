require("dotenv").config();

const express = require("express");
const cors = require("cors");

const SentinelAgent = require("../agent/brain");


const app = express();

app.use(cors());
app.use(express.json());


const agent = new SentinelAgent();



app.get("/", (req, res) => {

    res.json({
        project: "Sentinel AI X Layer",
        status: "running",
        agent: agent.name,
        version: agent.version
    });

});



app.post("/analyze", async (req, res) => {

    try {

        const result = await agent.analyze(req.body.request);

        res.json(result);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});



const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {

    console.log(`Sentinel AI running on port ${PORT}`);

});