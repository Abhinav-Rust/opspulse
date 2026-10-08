import React from 'react';
import { X, Building2, MapPin, Mail, Sparkles, User, ExternalLink } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl my-auto max-h-[88dvh] sm:max-h-[90vh] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-7 shadow-2xl overflow-y-auto text-slate-900 dark:text-slate-100">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h3 id="about-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
              About OpsPulse Technologies
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Autonomous Cloud SRE &amp; AI-Driven Infrastructure Reliability
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            <strong>OpsPulse Technologies</strong> is an early-stage cloud software initiative founded in 2026, building autonomous observability and automated remediation infrastructure natively on Amazon Web Services (AWS).
          </p>

          <p>
            Modern cloud architectures generate millions of telemetry signals per second across distributed microservices. When incidents occur, human on-call engineers spend critical minutes manually parsing log dumps and cross-referencing metrics. OpsPulse eliminates that operational toil by uniting OpenTelemetry stream ingestion with <strong>Amazon Bedrock foundation models</strong> to isolate root causes and trigger safe, deterministic AWS Systems Manager (SSM) remediation runbooks.
          </p>

          {/* Founder Section */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white text-xs">
              <User className="h-4 w-4 text-cyan-500" />
              <span>Founder &amp; Systems Architect</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              <strong>Abhinav Sharma</strong> — Systems Architect &amp; Founder. Specializes in conceptualizing and designing cloud systems architectures and orchestrating agentic AI engineering workflows for AWS infrastructure.
            </p>
            <div className="pt-1">
              <a
                href="https://github.com/Abhinav-Rust"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                <span>GitHub: @Abhinav-Rust</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white text-xs">
                <MapPin className="h-4 w-4 text-cyan-500" />
                <span>Operating Location</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Chandigarh, India.<br />
                Multi-region AWS Cloud Infrastructure.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white text-xs">
                <Mail className="h-4 w-4 text-indigo-500" />
                <span>Direct Contact</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Founder: <a href="mailto:founder@opspulse.in" className="text-cyan-600 dark:text-cyan-400 hover:underline font-mono">founder@opspulse.in</a><br />
                General: <a href="mailto:contact@opspulse.in" className="text-cyan-600 dark:text-cyan-400 hover:underline font-mono">contact@opspulse.in</a>
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
              <span>Current Development Stage</span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              The public website and interactive frontend simulation are live on AWS Amplify at <a href="https://www.opspulse.in" className="text-cyan-600 dark:text-cyan-400 underline font-mono">opspulse.in</a>. The demo illustrates intended investigation and remediation workflows using sample data. Live Amazon Bedrock processing and the multi-tenant backend are planned for the next 60–90 days. We aim to onboard up to five design partners over the next 90 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
