# Sentinel AI X Layer Architecture

## Overview

Sentinel AI is an autonomous Web3 risk intelligence agent built on X Layer Testnet.

The system combines AI analysis, financial intelligence, and blockchain verification.

---

## System Flow

```
                 User
                   |
                   v

          Sentinel AI Dashboard
                   |
                   v

              API Server
                   |
        ------------------------
        |                      |
        v                      v

 Sentinel AI Brain        Risk Engine

        |
        v

 Market Intelligence Report

        |
        v

 SHA-256 Verification Hash

        |
        v

          X Layer Testnet

        |
   ----------------------
   |                    |

SentinelReport     SentinelAgentRegistry

(Store Proofs)     (Agent Identity)

```

---

# Core Components

## 1. Frontend Dashboard

Location:

```
frontend/
```

Responsibilities:

* Display agent identity
* Trigger AI analysis
* Show blockchain proofs
* Display X Layer transactions

---

## 2. API Layer

Location:

```
api/server.js
```

Responsibilities:

* Receives user requests
* Runs Sentinel AI analysis
* Generates report hashes
* Sends proofs to blockchain

---

## 3. AI Engine

Location:

```
agent/brain.js
```

Responsibilities:

* Market interpretation
* AI reasoning
* Report generation

---

## 4. Risk Engine

Location:

```
risk/
```

Responsibilities:

* Calculates risk score
* Evaluates market conditions
* Produces risk decisions

---

## 5. Blockchain Layer

Location:

```
blockchainAgent/
```

Contains:

### SentinelReport

Stores AI analysis proofs.

### SentinelAgentRegistry

Stores autonomous agent identity and activity.

---

# Data Flow

```
Market Data

     |
     v

Sentinel AI Analysis

     |
     v

Risk Evaluation

     |
     v

Report Generation

     |
     v

SHA-256 Hash

     |
     v

X Layer Blockchain Storage

```

---

# Security Model

Sentinel AI does not store raw reports on-chain.

Instead:

1. Generate AI report
2. Create cryptographic hash
3. Store proof on X Layer

This provides:

* integrity verification
* transparent timestamps
* immutable proof

```
```
