# Sentinel AI X Layer

## Autonomous Web3 Risk Intelligence Agent

Sentinel AI is an autonomous Web3 AI agent built on **X Layer Testnet** that analyzes crypto markets, evaluates risk, generates explainable AI reports, and stores verifiable AI proofs directly on-chain.

The project combines:

* AI reasoning
* Market intelligence
* Technical analysis
* Explainable risk scoring
* Blockchain verification
* Autonomous AI agent identity

---

# Vision

AI systems can generate powerful decisions, but users often cannot verify:

* Who created the analysis
* How the decision was generated
* Whether the report was modified
* When the intelligence was created

Sentinel AI solves this by combining AI analysis with blockchain verification.

---

# Architecture

```
User
 |
Frontend Dashboard
 |
Sentinel AI API
 |
AI Brain (Llama3)
 |
Market Intelligence Engine
 |
Technical Indicators
 |
Explainable Risk Engine
 |
SHA-256 Proof Generation
 |
X Layer Blockchain
 |
Agent Registry
```

---

# Core Features

## 1. AI Market Intelligence

Sentinel AI analyzes live crypto market data using:

* Price feeds
* Candlestick data
* Market volume
* Technical indicators

Supported indicators:

* SMA20
* EMA20
* RSI14
* MACD
* ATR

---

# 2. Explainable AI Risk Intelligence Layer

Sentinel AI does not only produce predictions.

It explains:

* Why risk increased
* Which indicators affected the decision
* Market factors behind the recommendation

Example output:

```
Risk Score: 60/100

Risk Level:
MODERATE RISK

Factors:

- RSI oversold condition detected
- MACD momentum weakening
- Price below EMA20
- Volatility controlled

Recommendation:
WAIT
```

---

# 3. Autonomous AI Agent Identity

Sentinel AI is registered as an autonomous agent on X Layer.

Agent:

```
Name:
Sentinel AI

Capabilities:

- portfolio-analysis
- risk-scoring
- crypto-monitoring
```

The identity is stored using:

```
SentinelAgentRegistry
```

---

# 4. Blockchain Verified AI Reports

Every analysis creates:

1. AI generated report
2. SHA-256 verification hash
3. Blockchain transaction proof

Pipeline:

```
AI Analysis

      |

Report Hash

      |

SentinelReport Contract

      |

X Layer Transaction
```

Users can verify reports using the verification API.

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

Deployment date:

```
2026-07-12
```

---

# Smart Contracts

## SentinelReport

Purpose:

Stores Sentinel AI analysis proofs.

Address:

```
0xdc5F05b1A631687C13Ff3dB693F126b4f378b467
```

---

## SentinelAgentRegistry

Purpose:

Registers autonomous AI agents and tracks activity.

Address:

```
0x321E3E8ef23B1Addc9409a8FFac8512B6404F934
```

---

# API

## Agent Identity

```
GET /agent
```

Returns:

* Agent ID
* Owner
* Capabilities
* Activity status

---

## AI Analysis

```
POST /analyze
```

Example:

```
{
 "request":"Analyze BTC risk"
}
```

Returns:

* Market analysis
* Technical indicators
* Risk score
* AI explanation
* Blockchain proof

---

## Blockchain Reports

```
GET /reports
```

Returns stored AI proofs from X Layer.

---

## Verify AI Proof

```
GET /verify/:hash
```

Confirms whether an AI report exists on-chain.

---

# Dashboard

The Sentinel AI dashboard displays:

* On-chain agent identity
* Agent capabilities
* Market analysis
* AI generated reports
* Risk scores
* Blockchain proofs
* X Layer transactions

Screenshots included:

```
screenshots/

01-agent-identity.png

02-ai-analysis.png

03-blockchain-proof.png
```

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

Create:

```
.env
```

Add:

```
PRIVATE_KEY=your_wallet_private_key
```

Run:

```
node api/server.js
```

Open:

```
frontend/index.html
```

---

# Demo Flow

1. Launch Sentinel AI dashboard

2. Verify autonomous agent identity

3. Request BTC market analysis

4. AI analyzes market conditions

5. Risk Engine generates explanation

6. Report hash is created

7. Proof is stored on X Layer

8. Transaction can be verified

---

# Deployment Information

Deployer:

```
0x70997970C51812dc3A010C7d01b50e0d17dc79C8
```

Network:

```
X Layer Testnet
```

---

# Future Roadmap

Planned improvements:

* Multi-chain AI agents
* Autonomous portfolio management
* Agent-to-agent communication
* More market data sources
* DAO governed AI intelligence
* AI agent marketplace integration

---

# Built For

## OKX X Layer Build X Series

Sentinel AI demonstrates how autonomous AI agents can create:

* Transparent intelligence
* Explainable decisions
* Verifiable blockchain proofs
* Native Web3 AI infrastructure

```
```
