import React, { useState } from 'react';
import { X, Terminal, CheckCircle2, Play, RefreshCw, Copy, Check } from 'lucide-react';
import type { IncidentAlert } from '../types';

interface AutonomousTerminalModalProps {
  isOpen: boolean;
  incident: IncidentAlert | null;
  onClose: () => void;
  onCompleteHealing: (id: string) => void;
}

export const AutonomousTerminalModal: React.FC<AutonomousTerminalModalProps> = ({
  isOpen,
  incident,
  onClose,
  onCompleteHealing,
}) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeIncidentId, setActiveIncidentId] = useState<string | null>(null);

  if (!isOpen || !incident) return null;

  // Initialize logs when opening for a new incident
  if (activeIncidentId !== incident.id) {
    setActiveIncidentId(incident.id);
    const initialTimestamp = new Date().toISOString().substring(11, 19);
    setLogs([
      `[${initialTimestamp} UTC] [INIT] OpsPulse Autonomous SRE Agent v2.4 initialized.`,
      `[${initialTimestamp} UTC] [TARGET] Incident ID: ${incident.id} | Target Service: ${incident.service}`,
      `[${initialTimestamp} UTC] [AUTH] Authenticated via AWS IAM Role: arn:aws:iam::aws-account-id:role/OpsPulseRemediationEngine`,
      `[${initialTimestamp} UTC] [READY] Ready to execute autonomous runbook. Click 'Run Execution' to start.`,
    ]);
    setIsRunning(false);
    setIsCompleted(false);
  }

  const handleStartRunbook = () => {
    if (!incident || isRunning || isCompleted) return;

    setIsRunning(true);
    const steps = [
      `[DIAGNOSTIC] Querying Amazon CloudWatch metric alarms for ${incident.service}...`,
      `[INFERENCE] Amazon Bedrock (Claude 3.5 Sonnet) analyzing causal log stream...`,
      `[ROOT-CAUSE] Root cause confirmed: ${incident.aiRootCause}`,
      `[SSM-DISPATCH] Invoking AWS Systems Manager Run Command: ${incident.awsCliCommand}`,
      `[CONTAINER-ORCH] Triggering healthy instance drain & graceful worker recycle...`,
      `[VERIFY] Polling target health check endpoint: GET /health (HTTP 200 OK received in 18ms)...`,
      `[COMPLETE] Remediation successful. Node telemetry stabilized. Zero customer traffic dropped.`,
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        const time = new Date().toISOString().substring(11, 19);
        setLogs((prev) => [...prev, `[${time} UTC] ${step}`]);

        if (index === steps.length - 1) {
          setIsRunning(false);
          setIsCompleted(true);
          onCompleteHealing(incident.id);
        }
      }, (index + 1) * 600);
    });
  };

  const handleCopyLogs = () => {
    navigator.clipboard.writeText(logs.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="terminal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md transition-all"
    >
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 mr-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <Terminal className="h-4 w-4 text-cyan-400" />
            <h3 id="terminal-modal-title" className="text-xs sm:text-sm font-mono font-semibold text-slate-200">
              OpsPulse CloudShell Autonomous Runbook Execution
            </h3>
          </div>
          <button
            onClick={() => {
              setActiveIncidentId(null);
              onClose();
            }}
            aria-label="Close terminal"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Terminal Header Info */}
        <div className="border-b border-slate-800/80 bg-slate-900/60 px-4 py-2.5 text-xs font-mono flex flex-wrap items-center justify-between gap-2 text-slate-400">
          <div>
            <span className="text-slate-500">Incident: </span>
            <span className="text-cyan-300 font-semibold">{incident.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Target: </span>
            <span className="text-slate-200">{incident.service} (Multi-Region)</span>
          </div>
        </div>

        {/* Terminal Log Screen */}
        <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] sm:text-xs text-slate-300 space-y-1.5 bg-slate-950 min-h-[260px] max-h-[400px]">
          {logs.map((log, index) => {
            const isRootCause = log.includes('[ROOT-CAUSE]');
            const isSuccess = log.includes('[COMPLETE]');
            const isCommand = log.includes('[SSM-DISPATCH]');
            return (
              <div
                key={index}
                className={`leading-relaxed ${
                  isSuccess
                    ? 'text-emerald-400 font-bold'
                    : isRootCause
                    ? 'text-amber-300 font-semibold'
                    : isCommand
                    ? 'text-cyan-300'
                    : 'text-slate-300'
                }`}
              >
                {log}
              </div>
            );
          })}
          {isRunning && (
            <div className="flex items-center gap-2 text-cyan-400 animate-pulse pt-2">
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              <span>Executing AWS runbook steps...</span>
            </div>
          )}
        </div>

        {/* Terminal Footer Controls */}
        <div className="border-t border-slate-800 bg-slate-900 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleCopyLogs}
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-mono text-slate-300 hover:text-white transition"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Audit Log Copied' : 'Copy Audit Log'}</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setActiveIncidentId(null);
                onClose();
              }}
              type="button"
              className="rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 transition"
            >
              Exit Terminal
            </button>
            <button
              disabled={isRunning || isCompleted}
              onClick={handleStartRunbook}
              type="button"
              className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-xs font-semibold shadow-md transition ${
                isCompleted
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/80 cursor-default'
                  : isRunning
                  ? 'bg-cyan-700 text-white animate-pulse'
                  : 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white cursor-pointer active:scale-95'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Runbook Completed</span>
                </>
              ) : isRunning ? (
                <span>Streaming Execution...</span>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Run Autonomous Execution</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
