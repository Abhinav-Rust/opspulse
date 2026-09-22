import React, { useState } from 'react';
import { X, Sparkles, Terminal, Copy, Check, ShieldAlert, Cpu, Wrench, CheckCircle } from 'lucide-react';
import type { IncidentAlert } from '../types';

interface AiDiagnosticDrawerProps {
  incident: IncidentAlert | null;
  onClose: () => void;
  onResolve: (id: string) => void;
}

export const AiDiagnosticDrawer: React.FC<AiDiagnosticDrawerProps> = ({
  incident,
  onClose,
  onResolve,
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
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm transition-opacity">
      <div className="relative flex h-full w-full max-w-xl flex-col bg-slate-900 border-l border-slate-800 p-6 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-950 border border-indigo-700/50">
              <Sparkles className="h-4 w-4 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI Diagnostic Report</h3>
              <p className="text-xs font-mono text-slate-400">{incident.id} • 98.4% Confidence</p>
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
        <div className="mt-5 space-y-5">
          {/* Status banner */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className="flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-slate-100">{incident.title}</h4>
                <p className="mt-1 text-xs text-slate-400">
                  <span className="text-slate-500">Service: </span>
                  <span className="font-mono text-slate-300 font-medium">{incident.service}</span>
                </p>
              </div>
            </div>
          </div>

          {/* AI Root Cause */}
          <div className="rounded-xl border border-indigo-900/40 bg-indigo-950/20 p-4">
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <Cpu className="h-4 w-4" />
              <h5 className="text-xs font-bold uppercase tracking-wider">Root-Cause Analysis</h5>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">{incident.aiRootCause}</p>
          </div>

          {/* Impact */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Blast Radius & Impact
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed">{incident.impact}</p>
          </div>

          {/* Remediation Plan */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Wrench className="h-4 w-4" />
              <h5 className="text-xs font-bold uppercase tracking-wider">Remediation Strategy</h5>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{incident.suggestedAction}</p>

            {/* AWS CLI Command */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono">
                <span className="flex items-center gap-1">
                  <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                  AWS CLI Remediation Script
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition"
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="rounded-lg bg-slate-900 p-2.5 font-mono text-[11px] text-cyan-200 overflow-x-auto border border-slate-800">
                <code>{incident.awsCliCommand}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-6 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-800 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 transition"
          >
            Close
          </button>
          <button
            disabled={incident.resolved || isResolving}
            onClick={handleExecuteRemediation}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold shadow-md transition ${
              incident.resolved
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/60 cursor-default'
                : isResolving
                ? 'bg-cyan-700 text-white animate-pulse'
                : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white'
            }`}
          >
            {incident.resolved ? (
              <>
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span>Incident Resolved</span>
              </>
            ) : isResolving ? (
              <span>Applying AWS Patch...</span>
            ) : (
              <span>Simulate One-Click Remediation</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
