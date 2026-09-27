import React from 'react';
import { X, FileText } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-7 shadow-2xl overflow-y-auto max-h-[85vh] text-slate-900 dark:text-slate-100">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800 text-cyan-600 dark:text-cyan-400">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h3 id="terms-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
              Terms of Service
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Last Updated: September 2026 • OpsPulse Technologies
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h4>
            <p>
              By accessing or using the OpsPulse platform, documentation, or private preview software at <a href="https://www.opspulse.in" className="text-cyan-600 dark:text-cyan-400">opspulse.in</a>, you agree to comply with and be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white">2. Private Developer Preview Status</h4>
            <p>
              OpsPulse is currently provided as an early-stage developmental preview and demonstration platform. All interactive dashboards, metrics, and incident streams displayed on the public website represent architectural simulations intended to showcase autonomous remediation patterns on AWS.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white">3. Permitted Usage</h4>
            <p>
              Users may evaluate the platform, test integration scripts, and submit early access requests. Reverse engineering, unauthorized penetration testing against preview endpoints, or unauthorized reselling of OpsPulse prototypes is strictly prohibited.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white">4. Intellectual Property</h4>
            <p>
              All software designs, generative diagnostic algorithms, and trademarks associated with OpsPulse are the intellectual property of OpsPulse Technologies. Open-source integration modules are licensed under the MIT License as indicated on our GitHub repository.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white">5. Governing Law &amp; Contact</h4>
            <p>
              These terms are governed by the laws of India. For questions or legal notices, contact <a href="mailto:founder@opspulse.in" className="text-cyan-600 dark:text-cyan-400 underline">founder@opspulse.in</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
