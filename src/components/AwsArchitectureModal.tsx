import React from 'react';
import { X, Cloud, Server, Brain, Database, HardDrive, DollarSign, Layers, CheckCircle2 } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/30">
              <Cloud className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AWS Cloud Architecture & Credit Allocation</h3>
              <p className="text-xs text-slate-400">OpsPulse Production Infrastructure Specification • AWS Activate Founder Tier</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-6">
          {/* Architecture Pipeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-cyan-400" />
              End-to-End Ingestion & Anomaly Detection Pipeline
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-center">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-950 text-cyan-400 mb-2">
                  <Server className="h-4 w-4" />
                </div>
                <p className="font-semibold text-white">1. Ingestion</p>
                <p className="text-[11px] text-slate-400 mt-1">EC2 Auto-Scaling Cluster (c6i.2xlarge)</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-center">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-purple-950 text-purple-400 mb-2">
                  <Brain className="h-4 w-4" />
                </div>
                <p className="font-semibold text-white">2. AI Inference</p>
                <p className="text-[11px] text-slate-400 mt-1">Amazon Bedrock Anomaly Classifier</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-center">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-blue-950 text-blue-400 mb-2">
                  <Database className="h-4 w-4" />
                </div>
                <p className="font-semibold text-white">3. Telemetry Store</p>
                <p className="text-[11px] text-slate-400 mt-1">DynamoDB Hot Cache (Zero Throttling)</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-center">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-950 text-emerald-400 mb-2">
                  <HardDrive className="h-4 w-4" />
                </div>
                <p className="font-semibold text-white">4. Metric Lake</p>
                <p className="text-[11px] text-slate-400 mt-1">Amazon S3 Glacier + CloudWatch Lake</p>
              </div>
            </div>
          </div>

          {/* Budget Allocation Table ($1000 Credits) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              AWS Activate Founder Tier Allocation Blueprint ($1,000 Budget)
            </h4>
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 bg-slate-900/50 font-semibold text-slate-300">
                  <tr>
                    <th className="p-3">AWS Service Component</th>
                    <th className="p-3">Target Workload</th>
                    <th className="p-3 text-right">Allocated Credits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                  <tr>
                    <td className="p-3 font-sans font-medium text-white flex items-center gap-2">
                      <Server className="h-3.5 w-3.5 text-cyan-400" /> Amazon EC2 & ASG
                    </td>
                    <td className="p-3 text-slate-400 font-sans">Distributed telemetry collection & edge daemons</td>
                    <td className="p-3 text-right text-emerald-400 font-bold">$450.00</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-medium text-white flex items-center gap-2">
                      <Brain className="h-3.5 w-3.5 text-purple-400" /> Amazon Bedrock
                    </td>
                    <td className="p-3 text-slate-400 font-sans">LLM incident diagnosis & root-cause inference</td>
                    <td className="p-3 text-right text-emerald-400 font-bold">$250.00</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-medium text-white flex items-center gap-2">
                      <Database className="h-3.5 w-3.5 text-blue-400" /> Amazon DynamoDB
                    </td>
                    <td className="p-3 text-slate-400 font-sans">Sub-millisecond state management & time-series indices</td>
                    <td className="p-3 text-right text-emerald-400 font-bold">$150.00</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-medium text-white flex items-center gap-2">
                      <HardDrive className="h-3.5 w-3.5 text-emerald-400" /> Amazon S3 & CloudWatch
                    </td>
                    <td className="p-3 text-slate-400 font-sans">Historical log archiving & distributed metrics lake</td>
                    <td className="p-3 text-right text-emerald-400 font-bold">$100.00</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-medium text-white flex items-center gap-2">
                      <Cloud className="h-3.5 w-3.5 text-amber-400" /> CloudFront & Route 53
                    </td>
                    <td className="p-3 text-slate-400 font-sans">Global edge latency optimization & DNS routing</td>
                    <td className="p-3 text-right text-emerald-400 font-bold">$50.00</td>
                  </tr>
                  <tr className="bg-slate-900/60 font-sans font-bold">
                    <td className="p-3 text-white" colSpan={2}>
                      Total Activate Allocation Plan
                    </td>
                    <td className="p-3 text-right font-mono text-emerald-300 font-bold text-sm">$1,000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-3.5 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <span className="font-semibold text-emerald-300">AWS Ecosystem Compliance Verified: </span>
              <span className="text-slate-300">
                Meets all architectural prerequisites for the AWS Activate Founders Tier review guidelines.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end border-t border-slate-800 pt-4">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-700 transition"
          >
            Close Architecture View
          </button>
        </div>
      </div>
    </div>
  );
};
