# OpsPulse — AI Cloud Observability & Autonomous SRE Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Cloud: AWS Native](https://img.shields.io/badge/Cloud-AWS%20Native-orange.svg)](https://aws.amazon.com/)
[![Hosting: AWS Amplify](https://img.shields.io/badge/Hosting-AWS%20Amplify-cyan.svg)](https://www.opspulse.in)
[![Status: Prototype / In Development](https://img.shields.io/badge/Status-Prototype%20%2F%20In%20Development-emerald.svg)](https://www.opspulse.in)

**OpsPulse Technologies** is an early-stage cloud software initiative founded in India in 2026 by Abhinav Sharma. We are developing an autonomous cloud observability and incident remediation platform architected for Amazon Web Services (AWS).

---

## 🌐 Current State & Live Simulation

- **Live Web Application**: Hosted publicly on **AWS Amplify** at [https://www.opspulse.in](https://www.opspulse.in) with Amazon CloudFront global edge delivery and automated TLS/SSL certificate management.
- **Interactive Remediation Sandbox**: A client-side demonstration illustrating automated anomaly classification, causal graph root-cause analysis, and human-in-the-loop AWS Systems Manager remediation workflows using sample telemetry data.
- **Development Roadmap (60–90 Days)**: Live Amazon Bedrock foundation model integration, multi-tenant OpenTelemetry (OTLP) ingestion daemons, and automated AWS Systems Manager runbook execution are planned roadmap deliverables funded by AWS Activate credits.

---

## 🚀 Architected Capabilities

- **Distributed Telemetry Ingestion (Planned)**: High-throughput OpenTelemetry collector daemons architected for multi-AZ EC2 auto-scaling groups to ingest metrics, logs, and distributed traces.
- **Bedrock Anomaly Intelligence (Planned)**: Zero-shot classification and generative root-cause analysis powered by Amazon Bedrock foundation models evaluated for cost and diagnostic accuracy.
- **Low-Latency State Store (Planned)**: Amazon DynamoDB on-demand tables for active incident state machines and fast operational lookups.
- **Telemetry Lakehouse (Planned)**: Amazon S3 Parquet archive integrated with Amazon Athena for long-term metric capacity analysis and trend forecasting.
- **Autonomous Runbook Healing (Planned)**: Deterministic infrastructure remediation via AWS Systems Manager (SSM Run Command) with human-in-the-loop validation gates.
- **FinOps Resource Optimization (Planned)**: Detection and scheduled reclamation of idle EC2 compute, unattached EBS volumes, and orphaned Elastic IPs.

---

## 🏗️ Proposed AWS Infrastructure Blueprint

| Service Component | Role in OpsPulse Architecture | Implementation State |
| :--- | :--- | :---: |
| **AWS Amplify & Amazon CloudFront** | Global edge delivery, CDN caching, and HTTPS hosting | **Live / Deployed** |
| **Amazon Bedrock** | Foundation model diagnostic reasoning & root-cause analysis | **Planned Backend** |
| **Amazon EC2 & ASG** | High-throughput OTel ingestion daemons & stream workers | **Planned Backend** |
| **Amazon DynamoDB** | Ultra-low latency incident state machine store | **Planned Backend** |
| **Amazon S3 & Athena** | Persistent telemetry lakehouse and audit log archiving | **Planned Backend** |
| **AWS Systems Manager (SSM)** | Deterministic runbook execution and automated remediation | **Planned Backend** |
| **AWS IAM** | Zero-trust least-privilege role isolation for diagnostic workers | **Planned Backend** |

---

## 🛠️ Frontend Tech Stack

- **Framework**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide Icons
- **Hosting & CI/CD**: AWS Amplify Hosting with Git-driven continuous deployment
- **Domain & DNS**: Route 53 DNS routing for `opspulse.in` and `www.opspulse.in`

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/Abhinav-Rust/opspulse.git
cd opspulse

# Install dependencies
npm install

# Start local Vite development server
npm run dev

# Run linter
npm run lint

# Build production bundle
npm run build
```

---

## 📄 Organization & Inquiries

- **Domain**: [https://www.opspulse.in](https://www.opspulse.in)
- **Organization**: OpsPulse Technologies (Bootstrapped, India)
- **Founder & Systems Architect**: Abhinav Sharma ([GitHub](https://github.com/Abhinav-Rust))
- **Founder Direct Email**: `founder@opspulse.in`
- **General Inquiries**: `contact@opspulse.in`
