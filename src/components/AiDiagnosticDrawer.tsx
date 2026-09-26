import React, { useState } from 'react';
import { X, Sparkles, Terminal, Copy, Check, ShieldAlert, Cpu, Wrench, CheckCircle } from 'lucide-react';
import type { IncidentAlert } from '../types';

interface AiDiagnosticDrawerProps {
  incident: IncidentAlert | null;
  onClose: () => void;
  onResolve: (id: string) => void;
  onOpenTerminal?: (incident: IncidentAlert) => void;
}

export const AiDiagnosticDrawer: React.FC<AiDiagnosticDrawerProps> = ({
  incident,
  onClose,
  onResolve,
  onOpenTerminal,
}) => {
  const [copied, setCopied] = useState(false);
  const [isResolving, setIsResolving] = useState(false);

  if (!incident) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(incident.awsCliCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecuteRemediation = () => {
    setIsResolving(true);
    setTimeout(() => {
      onResolve(incident.id);
      setIsResolving(false);
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="diagnostic-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm transition-opacity"
    >
      <div className="relative flex h-full w-full max-w-xl flex-col bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-700/50 shadow-sm">
              <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 id="diagnostic-drawer-title" className="text-base font-bold text-slate-900 dark:text-white">
                AI Diagnostic Report
              </h3>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                {incident.id} • 98.4% Confidence Score
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close diagnostic report"
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white transition active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-4 sm:space-y-5">
          {/* Status banner */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
            <div className="flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {incident.title}
                </h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  <span>Target AWS Service: </span>
                  <span className="font-mono text-slate-800 dark:text-slate-300 font-bold">{incident.service}</span>
                </p>
              </div>
            </div>
          </div>

          {/* AI Root Cause */}
          <div className="rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/60 dark:bg-indigo-950/20 p-4">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 mb-2">
              <Cpu className="h-4 w-4" />
              <h5 className="text-xs font-bold uppercase tracking-wider">Root-Cause Analysis</h5>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
              {incident.aiRootCause}
            </p>
          </div>

          {/* Impact */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Blast Radius &amp; Latency Impact
            </h5>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {incident.impact}
            </p>
          </div>

          {/* Remediation Plan */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-4">
            <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 mb-2">
              <Wrench className="h-4 w-4" />
              <h5 className="text-xs font-bold uppercase tracking-wider">Remediation Strategy</h5>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {incident.suggestedAction}
            </p>

            {/* AWS CLI Command */}
            <div className="mt-3.5">
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-1.5 font-mono">
                <span className="flex items-center gap-1 font-semibold">
                  <Terminal className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                  AWS CLI Remediation Script
                </span>
                <button
                  onClick={handleCopy}
                  type="button"
                  className="flex items-center gap-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-0.5 text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-white transition"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="rounded-xl bg-slate-900 p-3 font-mono text-[11px] text-cyan-300 overflow-x-auto border border-slate-800 shadow-inner">
                <code>{incident.awsCliCommand}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            type="button"
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            Close
          </button>

          {onOpenTerminal && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenTerminal(incident);
              }}
              className="flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3.5 py-2 text-xs font-bold text-cyan-700 dark:text-cyan-300 transition active:scale-95"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Live CloudShell</span>
            </button>
          )}

          <button
            disabled={incident.resolved || isResolving}
            onClick={handleExecuteRemediation}
            type="button"
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold shadow-md transition active:scale-95 ${
              incident.resolved
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/60 cursor-default'
                : isResolving
                ? 'bg-cyan-700 text-white animate-pulse'
                : 'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white'
            }`}
          >
            {incident.resolved ? (
              <>
                <CheckCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Healed &amp; Stabilized</span>
              </>
            ) : isResolving ? (
              <span>Deploying AWS Fix...</span>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                <span>Execute Autonomous Healing</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
