import React, { useState } from 'react';
import { TrendingDown, Zap, Clock, ShieldCheck, DollarSign } from 'lucide-react';

export const FinOpsRoiSection: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'30d' | 'quarter'>('30d');

  const stats = timeframe === '30d'
    ? {
        mttr: '14 sec',
        mttrImprovement: '98.2% faster',
        reclaimed: '$4,280',
        reclaimedDetail: 'Idle EC2 & unattached EBS pruned',
        successRate: '94.8%',
        incidentsAutoResolved: '142 incidents',
        availability: '99.99%',
      }
    : {
        mttr: '12 sec',
        mttrImprovement: '98.5% faster',
        reclaimed: '$12,840',
        reclaimedDetail: 'Cross-AZ traffic & cold storage tiered',
        successRate: '96.2%',
        incidentsAutoResolved: '486 incidents',
        availability: '99.995%',
      };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-sm dark:shadow-xl backdrop-blur-sm transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Autonomous Value &amp; FinOps Intelligence
            </h2>
            <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/70 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
              Verified ROI
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Measurable impact on infrastructure uptime, human engineering hours, and cloud cost efficiency
          </p>
        </div>

        {/* Timeframe Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setTimeframe('30d')}
            className={`px-3 py-1 rounded-lg transition ${
              timeframe === '30d'
                ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Last 30 Days
          </button>
          <button
            type="button"
            onClick={() => setTimeframe('quarter')}
            className={`px-3 py-1 rounded-lg transition ${
              timeframe === 'quarter'
                ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Quarterly Cumulative
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* MTTR */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-4">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Mean Time to Resolve</span>
            <Clock className="h-4 w-4 text-cyan-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">{stats.mttr}</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
              <TrendingDown className="h-3 w-3 mr-0.5" />
              {stats.mttrImprovement}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            vs. 42 min human on-call pager average
          </p>
        </div>

        {/* Autonomous Resolution Rate */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-4">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Auto-Healed Rate</span>
            <Zap className="h-4 w-4 text-purple-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">{stats.successRate}</span>
            <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">
              {stats.incidentsAutoResolved}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Zero engineering wake-ups required
          </p>
        </div>

        {/* Cloud Waste Reclaimed */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-4">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Cloud Waste Reclaimed</span>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{stats.reclaimed}</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">reclaimed</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            {stats.reclaimedDetail}
          </p>
        </div>

        {/* Production SLA */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 p-4">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Availability SLA</span>
            <ShieldCheck className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">{stats.availability}</span>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Multi-Region</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            Zero customer-impacting outages
          </p>
        </div>
      </div>
    </div>
  );
};
