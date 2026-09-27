import React from 'react';
import { X, Shield } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
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
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h3 id="privacy-modal-title" className="text-lg font-bold text-slate-900 dark:text-white">
              Privacy Policy
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Last Updated: September 2026 • OpsPulse Technologies
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white">1. Overview</h4>
            <p>
              OpsPulse Technologies (&quot;OpsPulse&quot;, &quot;we&quot;, &quot;our&quot;) is committed to protecting the privacy and security of telemetry metadata collected through our website (<a href="https://www.opspulse.in" className="text-cyan-600 dark:text-cyan-400">opspulse.in</a>) and our early-access cloud software prototypes.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white">2. Telemetry &amp; System Data Collection</h4>
            <p>
              OpsPulse is designed around least-privilege telemetry ingestion. We only ingest operational cloud metrics, structured trace summaries, and service performance metadata. We <strong>do not</strong> ingest, inspect, or retain sensitive customer payloads, passwords, or Personally Identifiable Information (PII).
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white">3. Early Access Information &amp; Form Processing</h4>
            <p>
              When requesting early access, we collect your work email, cloud region, and infrastructure scale solely for communication regarding onboarding, technical support, and architectural evaluations. Early-access form submissions are transmitted securely to our founding inbox via FormSubmit (formsubmit.co). We do not sell or lease your contact information, nor do we run third-party advertising trackers or session recording scripts.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white">4. Cloud Infrastructure &amp; Security</h4>
            <p>
              All OpsPulse infrastructure is hosted on Amazon Web Services (AWS) using TLS 1.3 encryption in transit and AES-256 encryption at rest. Service access is governed by IAM zero-trust policies.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white">5. Contact Information</h4>
            <p>
              For privacy inquiries or data requests, please contact our team at <a href="mailto:founder@opspulse.in" className="text-cyan-600 dark:text-cyan-400 underline">founder@opspulse.in</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
