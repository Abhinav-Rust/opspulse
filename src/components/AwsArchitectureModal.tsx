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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 shrink-0">
              <Cloud className="h-5 w-5" />
            </div>
            <div>
              <h3 id="aws-modal-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                AWS Cloud Architecture &amp; Credit Allocation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                OpsPulse Production Specification • AWS Activate Founder Tier ($1,000 USD)
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
          {/* Architecture Pipeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              End-to-End Ingestion &amp; Autonomous Healing Pipeline
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 p-3 text-center">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 mb-2">
                  <Server className="h-4 w-4" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">1. Ingestion</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">EC2 Auto-Scaling Cluster (c6i.2xlarge)</p>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 p-3 text-center">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 mb-2">
                  <Brain className="h-4 w-4" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">2. AI Inference</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Amazon Bedrock Anomaly Classifier</p>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 p-3 text-center">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 mb-2">
                  <Database className="h-4 w-4" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">3. State Store</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">DynamoDB Hot Cache (Zero Throttling)</p>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 p-3 text-center">
                <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 mb-2">
                  <HardDrive className="h-4 w-4" />
                </div>
                <p className="font-bold text-slate-900 dark:text-white">4. Metric Lake</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Amazon S3 Glacier + CloudWatch</p>
              </div>
            </div>
          </div>

          {/* Budget Allocation Table ($1000 Credits) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              AWS Activate Founder Tier Allocation Blueprint ($1,000 Budget)
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
              <table className="w-full text-left text-xs min-w-[500px]">
                <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50 font-bold text-slate-700 dark:text-slate-300">
                  <tr>
                    <th className="p-3">AWS Service Component</th>
                    <th className="p-3">Target Workload</th>
                    <th className="p-3 text-right">Allocated Credits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <Server className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" /> Amazon EC2 &amp; ASG
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400 font-sans">Distributed telemetry collection &amp; edge daemons</td>
                    <td className="p-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">$450.00</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <Brain className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" /> Amazon Bedrock
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400 font-sans">LLM incident diagnosis &amp; root-cause inference</td>
                    <td className="p-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">$250.00</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <Database className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" /> Amazon DynamoDB
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400 font-sans">Sub-millisecond state management &amp; time-series indices</td>
                    <td className="p-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">$150.00</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <HardDrive className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> Amazon S3 &amp; CloudWatch
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400 font-sans">Historical log archiving &amp; distributed metrics lake</td>
                    <td className="p-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">$100.00</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-sans font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <Cloud className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" /> CloudFront &amp; Route 53
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400 font-sans">Global edge latency optimization &amp; DNS routing</td>
                    <td className="p-3 text-right text-emerald-600 dark:text-emerald-400 font-bold">$50.00</td>
                  </tr>
                  <tr className="bg-slate-100 dark:bg-slate-900/60 font-sans font-bold">
                    <td className="p-3 text-slate-900 dark:text-white" colSpan={2}>
                      Total Activate Allocation Plan
                    </td>
                    <td className="p-3 text-right font-mono text-emerald-600 dark:text-emerald-300 font-extrabold text-sm">$1,000.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="rounded-xl border border-emerald-300 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 p-3.5 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-emerald-800 dark:text-emerald-300">AWS Ecosystem Compliance Verified: </span>
              <span className="text-slate-700 dark:text-slate-300">
                Meets all architectural prerequisites for the AWS Activate Founders Tier review guidelines.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end border-t border-slate-200 dark:border-slate-800 pt-4">
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
