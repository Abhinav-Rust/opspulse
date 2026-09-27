import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  Shield,
  Server,
  Mail,
  ArrowRight,
  ExternalLink,
  Loader2,
  AlertCircle,
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
  const [workload, setWorkload] = useState('Amazon ECS / EKS');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      // Real network dispatch to founder inbox
      const res = await fetch('https://formsubmit.co/ajax/founder@opspulse.in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `OpsPulse Early Access Request - ${email}`,
          email,
          targetPlan: planName,
          awsRegion: region,
          estimatedNodes: nodes,
          workloadType: workload,
          timestamp: new Date().toISOString(),
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data || (data.success !== 'true' && data.success !== true)) {
        throw new Error(data?.message || 'Form submission could not be verified by endpoint.');
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission could not be completed';
      setErrorMsg(`${msg}. Please use the direct email link below.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setEmail('');
    setErrorMsg(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="trial-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6 sm:p-7 text-slate-900 dark:text-slate-100 transition-all">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          aria-label="Close modal"
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
                <h3 id="trial-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
                  Enterprise Cloud Architecture
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Custom VPC Peering, PrivateLink &amp; Dedicated Deployment
                </p>
              </div>
            </div>

            <div className="my-5 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-3 text-xs leading-relaxed">
              <p className="text-slate-700 dark:text-slate-300">
                OpsPulse enterprise deployments are designed for mission-critical AWS workloads requiring strict zero-trust IAM isolation and multi-region resilience.
              </p>
              <div className="space-y-1.5 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                  <span>Custom VPC Peering &amp; PrivateLink Data Ingestion</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                  <span>Targeting 99.9% Uptime Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                  <span>Procurement via AWS Marketplace Private Offers (Roadmap)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="mailto:founder@opspulse.in?subject=OpsPulse%20Enterprise%20Architecture%20Inquiry"
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-md transition"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Founding Team: founder@opspulse.in</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenDocs();
                }}
                className="w-full py-2.5 px-4 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition flex items-center justify-center gap-2"
              >
                <span>Review Integration Specifications</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ) : !isSubmitted ? (
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 id="trial-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
                  Request Early Access — Private Beta
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Evaluate autonomous AWS SRE healing on your staging workloads.
                </p>
              </div>
            </div>

            {errorMsg && (
              <div className="my-3 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-amber-800 dark:text-amber-200 text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
                <div className="pt-1">
                  <a
                    href={`mailto:founder@opspulse.in?subject=OpsPulse%20Early%20Access%20Request&body=Work%20Email:%20${encodeURIComponent(email)}%0AAWS%20Region:%20${encodeURIComponent(region)}%0ANodes:%20${encodeURIComponent(nodes)}%0AWorkload:%20${encodeURIComponent(workload)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-[11px] transition shadow-sm"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Send Request Directly to founder@opspulse.in</span>
                  </a>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Work Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="engineer@company.com"
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
                    <option value="ap-south-1">ap-south-1 (Mumbai)</option>
                    <option value="us-east-1">us-east-1 (N. Virginia)</option>
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

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Cloud Workload
                </label>
                <select
                  value={workload}
                  onChange={(e) => setWorkload(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
                >
                  <option value="Amazon ECS / EKS">Amazon ECS / EKS Containers</option>
                  <option value="EC2 Auto-Scaling Groups">EC2 Auto-Scaling Groups</option>
                  <option value="Serverless Lambda">Serverless (AWS Lambda &amp; API Gateway)</option>
                  <option value="Hybrid / Mixed Workload">Hybrid / Multi-Service Workload</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                  <Shield className="h-3.5 w-3.5 text-cyan-500" />
                  <span>Private Beta Assurance</span>
                </div>
                <p>
                  Zero credit card required. We onboard design partners into private evaluation cohorts with dedicated Slack support and AWS architecture guidance.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl py-2.5 px-4 text-xs font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-md transition flex items-center justify-center gap-1.5 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Early Access Request</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-2 animate-in zoom-in-95 duration-200">
            <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Early Access Request Received!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
              Thank you! Our engineering team will review your AWS workload parameters (<span className="text-cyan-600 dark:text-cyan-400 font-mono">{region}</span> • <span className="font-semibold text-slate-800 dark:text-slate-200">{workload}</span>) and dispatch your onboarding invite to <span className="font-semibold text-slate-800 dark:text-slate-200">{email}</span>.
            </p>

            <div className="mt-5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left text-xs space-y-1.5">
              <span className="font-bold text-slate-800 dark:text-slate-200">What happens next:</span>
              <ul className="list-disc list-inside text-slate-500 dark:text-slate-400 space-y-1 text-[11px]">
                <li>Access credentials will be generated for your private tenant endpoint.</li>
                <li>You will receive an invite to our private developer Slack channel.</li>
                <li>You will receive the CloudFormation template to deploy the non-invasive telemetry collector.</li>
              </ul>
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
                <span>View Architecture Guide</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleResetAndClose();
                  onScrollToConsole();
                }}
                className="py-2 px-4 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition"
              >
                <span>Explore Interactive Demo</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
