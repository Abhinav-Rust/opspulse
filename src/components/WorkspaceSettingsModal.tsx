import React, { useState } from 'react';
import { X, Mail, Server, Copy, Check, ExternalLink, CheckCircle2, Activity, Terminal } from 'lucide-react';

interface WorkspaceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAwsModal: () => void;
}

export const WorkspaceSettingsModal: React.FC<WorkspaceSettingsModalProps> = ({
  isOpen,
  onClose,
  onOpenAwsModal,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="workspace-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm transition-all"
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-2xl transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-600 via-indigo-600 to-purple-600 text-lg font-extrabold text-white shadow-lg shadow-indigo-500/25">
            OP
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 id="workspace-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
                Workspace &amp; Environment
              </h3>
              <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/70 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
                Production
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              OpsPulse Cloud Infrastructure • Enterprise SRE Workspace
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="mt-5 space-y-3.5">
          {/* Support / Contact row */}
          <div className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] font-medium uppercase text-slate-400 dark:text-slate-500">Corporate Inquiries</span>
                <p className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                  contact@opspulse.in
                </p>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard('contact@opspulse.in', 'email')}
              className="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition"
            >
              {copiedField === 'email' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
              <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Telemetry Collector Ingestion Endpoint */}
          <div className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Terminal className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] font-medium uppercase text-slate-400 dark:text-slate-500">OTel Ingestion Endpoint</span>
                <p className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">
                  https://telemetry.opspulse.in/v1/traces
                </p>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard('https://telemetry.opspulse.in/v1/traces', 'endpoint')}
              className="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              {copiedField === 'endpoint' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
              <span>{copiedField === 'endpoint' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Enterprise Compliance Banner */}
          <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/70 dark:bg-emerald-950/20 p-3.5">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 mb-1">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider">AWS Well-Architected &amp; Production SLA</span>
            </div>
            <p className="text-xs text-emerald-900/80 dark:text-emerald-200/80 leading-relaxed">
              99.99% Enterprise Uptime SLA • End-to-End TLS 1.3 Encryption • Multi-Region Edge Acceleration • Automated Rollback Protection.
            </p>
          </div>

          {/* Architecture link info */}
          <div className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                  <Server className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] font-medium uppercase text-slate-400 dark:text-slate-500">Live Cloud Topology</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Amplify Hosting + CloudFront Global CDN
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenAwsModal();
                }}
                className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition"
              >
                <span>Architecture</span>
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            <Activity className="h-3.5 w-3.5 text-emerald-500" />
            <span>Telemetry Pipeline: Operational</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-white transition shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
