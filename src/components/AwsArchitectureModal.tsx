import React from 'react';
import { X, Cloud, Server, Brain, Database, HardDrive, Layers, CheckCircle2, ShieldCheck, Zap, Activity } from 'lucide-react';

interface AwsArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AwsArchitectureModal: React.FC<AwsArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="aws-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-3.5 sm:p-4 backdrop-blur-md"
    >
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-500/20 border border-cyan-300 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 shrink-0">
              <Cloud className="h-5 w-5" />
            </div>
            <div>
              <h3 id="aws-modal-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                AWS Cloud Native Architecture Specification
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                OpsPulse Production Observability Engine • Multi-Region Resilient Infrastructure
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close architecture modal"
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white transition active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-6">
          {/* Architecture Pipeline Cards */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              End-to-End Ingestion &amp; Autonomous Healing Pipeline
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 p-3.5 text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 mb-2 shadow-sm">
                  <Server className="h-4 w-4" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">1. Stream Ingestion</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  EC2 c6i.2xlarge ASG + OTel Daemons (100k eps)
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 p-3.5 text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 mb-2 shadow-sm">
                  <Brain className="h-4 w-4" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">2. AI Inference</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Amazon Bedrock Anomaly &amp; Root-Cause Models
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 p-3.5 text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 mb-2 shadow-sm">
                  <Database className="h-4 w-4" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">3. Fast State Store</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Amazon DynamoDB Global Tables (&lt;5ms p99)
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 p-3.5 text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 mb-2 shadow-sm">
                  <HardDrive className="h-4 w-4" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">4. Metrics Lakehouse</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  Amazon S3 Parquet Compaction + Athena Analytics
                </p>
              </div>
            </div>
          </div>

          {/* Technical Specifications Matrix */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              Core Infrastructure Capabilities &amp; Performance SLA
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
              <table className="w-full text-left text-xs min-w-[500px]">
                <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50 font-bold text-slate-700 dark:text-slate-300">
                  <tr>
                    <th className="p-3">AWS Service Component</th>
                    <th className="p-3">Architectural Role</th>
                    <th className="p-3 text-right">Performance / SLA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <Server className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" /> Amazon EC2 &amp; Auto-Scaling
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400 font-sans">
                      Distributed telemetry collectors &amp; high-throughput stream ingestion daemons
                    </td>
                    <td className="p-3 text-right text-cyan-600 dark:text-cyan-400 font-bold">100k+ eps / Auto-Scale</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <Brain className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" /> Amazon Bedrock
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400 font-sans">
                      Causal graph analysis, anomaly classification, and automated remediation generation
                    </td>
                    <td className="p-3 text-right text-purple-600 dark:text-purple-400 font-bold">&lt;450ms p99 Latency</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <Database className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" /> Amazon DynamoDB
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400 font-sans">
                      Active incident state machine, alert deduplication, and service topology registry
                    </td>
                    <td className="p-3 text-right text-blue-600 dark:text-blue-400 font-bold">&lt;5ms Single-Digit Latency</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <HardDrive className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Amazon S3 &amp; CloudWatch
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400 font-sans">
                      Long-term columnar Parquet log archiving, metrics lakehouse, and distributed telemetry
                    </td>
                    <td className="p-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">99.999999999% Durability</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <Cloud className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" /> CloudFront &amp; Route 53
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400 font-sans">
                      Global edge points-of-presence (POPs), TLS 1.3 termination, and DNS health routing
                    </td>
                    <td className="p-3 text-right text-amber-600 dark:text-amber-400 font-bold">Global Sub-20ms Edge</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Security & Well-Architected Framework */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 p-3.5 flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                  Zero-Trust Security &amp; KMS
                </span>
                <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  IAM least-privilege role separation, customer-managed KMS encryption at rest, and strict mutual TLS.
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-300 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 p-3.5 flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-emerald-900 dark:text-emerald-300 block mb-0.5">
                  AWS Well-Architected Framework
                </span>
                <span className="text-emerald-800/80 dark:text-emerald-200/80 leading-relaxed">
                  Engineered to meet the five pillars: Operational Excellence, Security, Reliability, Performance, and Cost Optimization.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            <Activity className="h-3.5 w-3.5 text-cyan-500" />
            <span>Multi-Region High Availability: Active</span>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 px-5 py-2 text-xs font-bold text-white transition active:scale-95 shadow-sm"
          >
            Close Architecture View
          </button>
        </div>
      </div>
    </div>
  );
};
