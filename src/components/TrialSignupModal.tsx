import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Shield,
  Server,
  Mail,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface TrialSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  onOpenDocs: () => void;
  onScrollToConsole: () => void;
}

export const TrialSignupModal: React.FC<TrialSignupModalProps> = ({
  isOpen,
  onClose,
  planName,
  onOpenDocs,
  onScrollToConsole,
}) => {
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('eu-north-1');
  const [nodes, setNodes] = useState('10-25');
  const [isProvisioned, setIsProvisioned] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsProvisioned(true);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText('op_live_trial_948f2c019be745d');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleResetAndClose = () => {
    setIsProvisioned(false);
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6 sm:p-7 text-slate-900 dark:text-slate-100 transition-all">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {planName === 'Enterprise Cloud' ? (
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Enterprise Cloud Solutions
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Custom VPC Peering, PrivateLink &amp; Dedicated SLAs
                </p>
              </div>
            </div>

            <div className="my-5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-3 text-xs leading-relaxed">
              <p className="text-slate-700 dark:text-slate-300">
                Enterprise deployments are tailored to your AWS organization&apos;s compliance requirements (SOC 2, ISO 27001, HIPAA).
              </p>
              <div className="space-y-1.5 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Procurement via AWS Marketplace Private Offers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Custom Invoicing &amp; Net-30/60 Terms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Dedicated SRE Lead &amp; 99.999% Uptime Guarantee</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="mailto:contact@opspulse.in?subject=Enterprise%20Cloud%20Architecture%20Inquiry"
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-md transition"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Enterprise Solutions: contact@opspulse.in</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenDocs();
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition flex items-center justify-center gap-2"
              >
                <span>Review Architecture Specifications</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ) : !isProvisioned ? (
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Start 14-Day Startup Pro Sandbox
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Autonomous SRE &amp; AI healing. No credit card required.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Work Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="sre@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Primary AWS Region
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
                  >
                    <option value="eu-north-1">eu-north-1 (Stockholm)</option>
                    <option value="us-east-1">us-east-1 (N. Virginia)</option>
                    <option value="ap-south-1">ap-south-1 (Mumbai)</option>
                    <option value="us-west-2">us-west-2 (Oregon)</option>
                    <option value="eu-west-1">eu-west-1 (Ireland)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    AWS Service Nodes
                  </label>
                  <select
                    value={nodes}
                    onChange={(e) => setNodes(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
                  >
                    <option value="1-10">1 – 10 Services</option>
                    <option value="10-25">10 – 25 Services</option>
                    <option value="25+">25+ Services</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                  <Shield className="h-3.5 w-3.5 text-cyan-500" />
                  <span>Private Beta Assurance</span>
                </div>
                <p>
                  Zero commitment. At the end of 14 days, you may choose to scale via standard AWS Marketplace billing or remain on the Developer Free plan.
                </p>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl py-2.5 px-4 text-xs font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-md transition flex items-center justify-center gap-1.5"
              >
                <span>Provision Trial Workspace</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-2 animate-in zoom-in-95 duration-200">
            <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Trial Workspace Provisioned!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Your 14-day Sandbox has been initialized in <code className="text-cyan-600 dark:text-cyan-400 font-mono">{region}</code> for <span className="font-semibold text-slate-800 dark:text-slate-200">{email}</span>.
            </p>

            <div className="mt-5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-1.5">
                <span>OTel Ingestion API Token</span>
                <span className="text-emerald-500 font-semibold">Active • 14 Days</span>
              </div>
              <div className="flex items-center justify-between bg-white dark:bg-slate-900 rounded-lg p-2 border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-800 dark:text-slate-200">
                <span className="truncate mr-2">op_live_trial_948f2c019be745d</span>
                <button
                  type="button"
                  onClick={handleCopyKey}
                  className="p-1 rounded text-slate-400 hover:text-cyan-500 transition"
                  title="Copy Token"
                >
                  {copiedKey ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  handleResetAndClose();
                  onOpenDocs();
                }}
                className="py-2 px-4 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white transition flex items-center gap-1.5"
              >
                <Server className="h-3.5 w-3.5" />
                <span>View Integration Guide</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleResetAndClose();
                  onScrollToConsole();
                }}
                className="py-2 px-4 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
              >
                <span>Live Console</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
