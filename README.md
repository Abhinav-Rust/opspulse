# OpsPulse — AI Cloud Observability & Incident Intelligence Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Cloud: AWS Native](https://img.shields.io/badge/Cloud-AWS%20Native-orange.svg)](https://aws.amazon.com/)
[![Region: ap-south-1](https://img.shields.io/badge/Region-ap--south--1-cyan.svg)](https://opspulse.in)

**OpsPulse** (`opspulse.in`) is a next-generation AI-driven cloud infrastructure observability and autonomous remediation platform. OpsPulse ingests high-throughput distributed telemetry metrics, predicts service anomalies via foundation models on Amazon Bedrock, and executes automated infrastructure healing on AWS compute clusters.

---

## 🚀 Key Architectural Capabilities

- **Real-Time Distributed Telemetry**: Sub-second latency tracking across EC2 auto-scaling groups, container workloads, and edge proxies.
- **Amazon Bedrock Anomaly Intelligence**: Foundation model reasoning applied to raw CloudWatch log streams and metric anomalies to identify root causes in real time.
- **Ultra-Low Latency State Store**: Amazon DynamoDB powered hot-cache for instant metric lookups and sub-millisecond anomaly thresholds.
- **Long-Term Metric Lake**: Amazon S3 Glacier integrated telemetry archive for cross-quarter capacity forecasting.
- **Autonomous Remediation**: One-click and automated self-healing workflows with reproducible AWS CLI remediation commands.

---

## 🏗 AWS Infrastructure Blueprint

OpsPulse is architected natively on Amazon Web Services:

| Service Component | Role in OpsPulse Architecture |
| :--- | :--- |
| **Amazon EC2 & ASG** | High-throughput telemetry ingestion daemons & worker nodes |
| **Amazon Bedrock** | Multi-modal anomaly classification and root-cause diagnosis |
| **Amazon DynamoDB** | High-concurrency, low-latency telemetry time-series state |
| **Amazon S3 & CloudWatch** | Persistent metric lake and compliance event archiving |
| **Amazon CloudFront & Route 53** | Global edge acceleration and low-latency DNS routing (`opspulse.in`) |

---

## 🛠 Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **State & Real-time**: Reactive telemetry polling & simulated live socket stream
- **Hosting & CI/CD**: AWS Amplify Hosting with automated ACM SSL/TLS certificate management

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/Abhinav-Rust/opspulse.git
cd opspulse

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📄 License & Contact

- **Domain**: [opspulse.in](https://opspulse.in)
- **Contact**: `founder@opspulse.in`
- **Founder**: Abhinav Sharma
