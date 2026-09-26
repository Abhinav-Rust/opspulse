import React, { useState } from 'react';
import { Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { TrialSignupModal } from './TrialSignupModal';

interface PricingSectionProps {
  onOpenDocs: () => void;
  onScrollToConsole: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onOpenDocs,
  onScrollToConsole,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [modalPlan, setModalPlan] = useState<string | null>(null);

  const plans = [
    {
      name: 'Developer Free',
      description: 'Ideal for independent cloud builders, prototypes, and staging clusters.',
      price: '$0',
      period: 'forever',
      features: [
        'Up to 3 AWS service nodes',
        '1M telemetry events / mo',
        '7-day log & trace retention',
        'Community Discord & Forum support',
        'Standard metric dashboards',
      ],
      cta: 'Start Building Free',
      highlighted: false,
    },
    {
      name: 'Startup Pro',
      description: 'For growing cloud startups needing autonomous incident healing.',
      price: billingCycle === 'annual' ? '$39' : '$49',
      period: 'per month',
      features: [
        'Up to 25 AWS service nodes',
        '25,000,000 telemetry events / mo',
        'Amazon Bedrock AI Anomaly Classifier',
        'Autonomous AWS SSM Runbook Execution',
        '30-day hot cache + 1-year S3 lakehouse',
        'Slack & PagerDuty incident webhooks',
        'Priority email support (4hr SLA)',
      ],
      cta: 'Start 14-Day Free Trial',
      badge: 'Most Popular',
      highlighted: true,
    },
    {
      name: 'Enterprise Cloud',
      description: 'Mission-critical observability with dedicated VPC peering & custom SLAs.',
      price: 'Custom',
      period: 'tailored deployment',
      features: [
        'Unlimited AWS service nodes',
        'Unlimited high-throughput event ingestion',
        'Dedicated VPC Peering & PrivateLink',
        'Custom fine-tuned Bedrock models',
        '99.999% Availability SLA guarantee',
        'SOC 2 Type II compliance audit reports',
        '24/7 dedicated SRE support engineer',
      ],
      cta: 'Contact Enterprise Sales',
      highlighted: false,
    },
  ];

  const handlePlanClick = (planName: string) => {
    if (planName === 'Developer Free') {
      onOpenDocs();
    } else {
      setModalPlan(planName);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-8 shadow-sm dark:shadow-xl backdrop-blur-sm transition-all">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-800 px-3 py-1 rounded-full">
          Transparent SaaS Pricing
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
          Predictable Plans for Modern Cloud Teams
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          Start free, evaluate in sandbox, and scale effortlessly on AWS. Zero payment friction.
        </p>

        {/* Annual / Monthly Toggle */}
        <div className="mt-5 inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setBillingCycle('annual')}
            className={`px-3 py-1 rounded-lg transition ${
              billingCycle === 'annual'
                ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Annual Billing <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold ml-1">Save 20%</span>
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            className={`px-3 py-1 rounded-lg transition ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border p-6 flex flex-col justify-between transition ${
              plan.highlighted
                ? 'border-cyan-500 bg-white dark:bg-slate-900 shadow-xl ring-2 ring-cyan-500/20'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60'
            }`}
          >
            {plan.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-600 to-indigo-600 px-3 py-0.5 text-[11px] font-bold text-white shadow-sm">
                {plan.badge}
              </span>
            )}

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {plan.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">
                {plan.description}
              </p>

              <div className="my-5 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                  {plan.price}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  / {plan.period}
                </span>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800/80 pt-4 space-y-2.5">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                type="button"
                onClick={() => handlePlanClick(plan.name)}
                className={`w-full rounded-xl py-2.5 px-4 text-xs font-bold transition flex items-center justify-center gap-1.5 active:scale-95 shadow-sm ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white'
                    : 'border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Enterprise Procurement & AWS Marketplace Banner */}
      <div className="mt-8 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span>Enterprise Procurement via AWS Marketplace</span>
              <span className="text-[10px] bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 px-2 py-0.5 rounded font-mono font-medium">
                Private Beta
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Draw down existing AWS EDP commitments with zero credit card friction. Invoiced directly on your AWS monthly bill.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setModalPlan('Startup Pro')}
          className="whitespace-nowrap px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center gap-1.5 shadow-sm text-xs"
        >
          <Zap className="h-3.5 w-3.5 text-amber-500" />
          <span>Request Private Beta</span>
        </button>
      </div>

      {/* Active Modal */}
      {modalPlan && (
        <TrialSignupModal
          isOpen={!!modalPlan}
          onClose={() => setModalPlan(null)}
          planName={modalPlan}
          onOpenDocs={onOpenDocs}
          onScrollToConsole={onScrollToConsole}
        />
      )}
    </div>
  );
};
