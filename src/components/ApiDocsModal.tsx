import React, { useState } from 'react';
import { X, BookOpen, Copy, Check, Info } from 'lucide-react';

interface ApiDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiDocsModal: React.FC<ApiDocsModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const otelSnippet = `// Standard OpenTelemetry Node.js SDK Integration
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    // Replace with dedicated tenant gateway assigned during onboarding:
    // Format: https://<workspace-id>.otlp.opspulse.in/v1/traces
    url: process.env.OPSPULSE_INGESTION_URL || 'https://<your-cluster-id>.otlp.opspulse.in/v1/traces',
    headers: {
      'x-opspulse-workspace-key': process.env.OPSPULSE_API_KEY || '<your-workspace-token>',
      'x-opspulse-region': 'eu-north-1',
    },
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();`;

  const cfnSnippet = `# AWS CloudFormation Telemetry Collector IAM Role
Resources:
  OpsPulseTelemetryRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: OpsPulseAutonomousAgentRole
      AssumeRolePolicyDocument:
        Statement:
          - Effect: Allow
            Principal:
              Service: ec2.amazonaws.com
            Action: sts:AssumeRole
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy
        - arn:aws:iam::aws:policy/AmazonBedrockReadOnly`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="docs-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md"
    >
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-2xl overflow-y-auto max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-950 border border-cyan-300 dark:border-cyan-800 text-cyan-700 dark:text-cyan-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h3 id="docs-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                Developer Integration &amp; SDK Quickstart
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Stream telemetry into OpsPulse via OpenTelemetry OTLP or private preview SDK
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close docs"
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Private Developer Preview Notice */}
        <div className="mt-4 p-3.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
          <Info className="h-4 w-4 text-cyan-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-slate-900 dark:text-white">Private Preview Notice:</span>
            <p className="text-[11px] leading-relaxed">
              The proprietary wrapper <code>@opspulse/agent</code> is distributed via GitHub Packages for enrolled design partners. During the private beta, you can stream standard OTel data immediately using the official <code>@opentelemetry/sdk-node</code> package below.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-5">
          {/* Step 1: Install OpenTelemetry */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-600 text-white text-[11px]">1</span>
                Install Standard OpenTelemetry SDK (Public npm)
              </span>
              <button
                type="button"
                onClick={() => copyCode('npm install @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node @opentelemetry/exporter-trace-otlp-http', 'install')}
                className="flex items-center gap-1 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                {copiedKey === 'install' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                <span>{copiedKey === 'install' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="rounded-xl bg-slate-900 p-3 font-mono text-xs text-cyan-300 border border-slate-800 overflow-x-auto">
              <code>npm install @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node @opentelemetry/exporter-trace-otlp-http</code>
            </pre>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 font-mono">
              Enrolled partners with GitHub Packages access: <code>npm install --registry=https://npm.pkg.github.com/Abhinav-Rust @opspulse/agent</code>
            </p>
          </div>

          {/* Step 2: Initialize in Node.js */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-600 text-white text-[11px]">2</span>
                Initialize OTLP Exporter in Entrypoint
              </span>
              <button
                type="button"
                onClick={() => copyCode(otelSnippet, 'node')}
                className="flex items-center gap-1 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                {copiedKey === 'node' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                <span>{copiedKey === 'node' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="rounded-xl bg-slate-900 p-3.5 font-mono text-[11px] text-slate-200 border border-slate-800 overflow-x-auto leading-relaxed">
              <code>{otelSnippet}</code>
            </pre>
          </div>

          {/* Step 3: CloudFormation */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-600 text-white text-[11px]">3</span>
                AWS CloudFormation IAM Policy
              </span>
              <button
                type="button"
                onClick={() => copyCode(cfnSnippet, 'cfn')}
                className="flex items-center gap-1 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                {copiedKey === 'cfn' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                <span>{copiedKey === 'cfn' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="rounded-xl bg-slate-900 p-3.5 font-mono text-[11px] text-slate-200 border border-slate-800 overflow-x-auto leading-relaxed">
              <code>{cfnSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
