import React, { useState } from 'react';
import { X, BookOpen, Copy, Check } from 'lucide-react';

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

  const nodeSnippet = `// Initialize OpsPulse OpenTelemetry SDK
import { initOpsPulse } from '@opspulse/agent';

const tracer = initOpsPulse({
  apiKey: process.env.OPSPULSE_API_KEY,
  serviceName: 'checkout-service',
  awsRegion: 'ap-south-1',
  enableBedrockDiagnostics: true,
  autoRemediation: {
    enabled: true,
    maxConcurrentActions: 2,
    approvalPolicy: 'human-in-the-loop'
  }
});`;

  const cfnSnippet = `# AWS CloudFormation 1-Click Agent Launch
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
                Deploy the OpsPulse OpenTelemetry Collector into your AWS stack in under 5 minutes
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

        {/* Content */}
        <div className="mt-5 space-y-5">
          {/* Step 1: Install */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-600 text-white text-[11px]">1</span>
                Install OpenTelemetry Agent
              </span>
              <button
                type="button"
                onClick={() => copyCode('npm install @opspulse/agent @opentelemetry/api', 'install')}
                className="flex items-center gap-1 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                {copiedKey === 'install' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                <span>{copiedKey === 'install' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="rounded-xl bg-slate-900 p-3 font-mono text-xs text-cyan-300 border border-slate-800">
              <code>npm install @opspulse/agent @opentelemetry/api</code>
            </pre>
          </div>

          {/* Step 2: Initialize in Node.js */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-600 text-white text-[11px]">2</span>
                Initialize in Application Entrypoint
              </span>
              <button
                type="button"
                onClick={() => copyCode(nodeSnippet, 'node')}
                className="flex items-center gap-1 text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                {copiedKey === 'node' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                <span>{copiedKey === 'node' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="rounded-xl bg-slate-900 p-3.5 font-mono text-[11px] text-slate-200 border border-slate-800 overflow-x-auto leading-relaxed">
              <code>{nodeSnippet}</code>
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

        {/* Footer */}
        <div className="mt-6 flex justify-end border-t border-slate-200 dark:border-slate-800 pt-4">
          <button
            onClick={onClose}
            type="button"
            className="rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 px-5 py-2 text-xs font-bold text-white transition active:scale-95 shadow-sm"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
