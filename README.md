# Sentinel AI X Layer

## Autonomous Web3 Risk Intelligence Agent

Sentinel AI is an autonomous Web3 AI agent that analyzes crypto market conditions, evaluates risk, generates intelligence reports, and stores verifiable AI proofs directly on X Layer Testnet.

The project combines:

* AI decision making
* Market intelligence
* Risk scoring
* Blockchain verification
* Autonomous agent identity

---

# Problem

Crypto markets move quickly, but users lack transparent AI systems that can explain decisions and provide verifiable proof of analysis.

Traditional AI analysis is centralized and cannot prove:

* who generated the analysis
* when it was created
* whether the report was modified

---

# Solution

Sentinel AI creates a complete AI + blockchain intelligence pipeline.

Flow:

```
User
 |
Frontend Dashboard
 |
Sentinel AI API
 |
AI Analysis Engine
 |
Risk Engine
 |
Blockchain Proof Storage
 |
X Layer
 |
Agent Registry
```

---

# Features

## AI Market Intelligence

Sentinel AI provides:

* crypto market analysis
* technical indicators
* risk scoring
* AI-generated reports

Supported analysis includes:

* price trends
* RSI
* EMA
* SMA
* MACD
* ATR

---

## Autonomous Agent Identity

Sentinel AI is registered as an on-chain agent.

Agent:

```
Name:
Sentinel AI

Capabilities:

- portfolio-analysis
- risk-scoring
- crypto-monitoring
```

The identity is stored on X Layer through SentinelAgentRegistry.

---

## Blockchain Verified AI Reports

Every AI analysis generates:

1. AI report
2. SHA-256 proof hash
3. Blockchain transaction

Pipeline:

```
AI Report
    |
    |
SHA-256 Hash
    |
    |
SentinelReport Contract
    |
    |
X Layer Transaction
```

---

# X Layer Deployment

Network:

```
X Layer Testnet

Chain ID:
1952

RPC:
https://testrpc.xlayer.tech
```

---

## Smart Contracts

### SentinelReport

Purpose:

Stores Sentinel AI analysis proofs.

Contract:

```
0xdc5F05b1A631687C13Ff3dB693F126b4f378b467
```

---

### SentinelAgentRegistry

Purpose:

Registers autonomous AI agents and tracks activity.

Contract:

```
0x321E3E8ef23B1Addc9409a8FFac8512B6404F934
```

---

# Architecture

```
                 User
                  |
                  v

          Web Dashboard
                  |
                  v

             API Server
                  |
        --------------------
        |                  |
        v                  v

 Sentinel AI Brain     Risk Engine

        |
        v

  AI Generated Report

        |
        v

 SHA-256 Verification Hash

        |
        v

      X Layer

   -----------------

   SentinelReport

   SentinelAgentRegistry

```

---

# Dashboard

The Sentinel AI dashboard displays:

* On-chain agent identity
* Agent capabilities
* AI market reports
* Risk scores
* Blockchain proofs
* X Layer transactions

---

# Installation

Clone repository:

```
git clone https://github.com/bob7ak/sentinel-ai-xlayer.git
```

Install dependencies:

```
npm install
```

Create environment file:

```
.env
```

Add:

```
PRIVATE_KEY=your_wallet_private_key
```

Run API:

```
node api/server.js
```

Open:

```
frontend/index.html
```

---

# Demo Flow

1. Open Sentinel AI dashboard

2. View on-chain agent identity

3. Run BTC market analysis

4. Generate AI risk report

5. Verify blockchain transaction

6. Confirm proof stored on X Layer

---

# Deployment Information

Deployer:

```
0x70997970C51812dc3A010C7d01b50e0d17dc79C8
```

Deployment Date:

```
2026-07-12
```

---

# Future Roadmap

Future improvements:

* Multi-chain agent deployment
* More market data sources
* Autonomous portfolio management
* Agent-to-agent communication
* DAO governed AI agents

---

# Built for

OKX X Layer Build X Series

Sentinel AI demonstrates how autonomous AI agents can create transparent, verifiable, and blockchain-native intelligence.
