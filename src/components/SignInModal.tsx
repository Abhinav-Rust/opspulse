import React from 'react';
import { X, Activity, Mail, ArrowRight, Lock } from 'lucide-react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTrial: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  onOpenTrial,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="signin-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md my-auto max-h-[88dvh] sm:max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6 sm:p-7 text-slate-900 dark:text-slate-100 transition-all">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 shadow-md shadow-cyan-500/20 shrink-0">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 id="signin-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
              Private Developer Preview
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Access restricted to authorized pilot partners
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5 mb-5 leading-relaxed">
          <Lock className="h-4 w-4 text-cyan-500 shrink-0 mt-0.5" />
          <span>
            OpsPulse is currently in <strong>Private Developer Preview</strong>. Dedicated ingestion pipelines and multi-tenant workspaces are planned deliverables over the next 60–90 days. We aim to onboard up to five design partners as the backend becomes ready.
          </span>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenTrial();
            }}
            className="w-full rounded-xl py-2.5 px-4 text-xs font-bold bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-md transition flex items-center justify-center gap-1.5 active:scale-95"
          >
            <span>Request Early Access (Private Beta)</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <a
            href="mailto:founder@opspulse.in?subject=OpsPulse%20Tenant%20Access%20Request"
            className="w-full rounded-xl py-2.5 px-4 text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition flex items-center justify-center gap-1.5"
          >
            <Mail className="h-3.5 w-3.5 text-cyan-500" />
            <span>Contact Founder: founder@opspulse.in</span>
          </a>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-500 dark:text-slate-400">
          Design partner workspaces will be provisioned directly as backend infrastructure becomes ready.
        </div>
      </div>
    </div>
  );
};
