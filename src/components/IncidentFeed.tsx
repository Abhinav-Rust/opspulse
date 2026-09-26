import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, ChevronRight, Sparkles, Filter } from 'lucide-react';
import type { IncidentAlert, Severity } from '../types';

interface IncidentFeedProps {
  incidents: IncidentAlert[];
  onSelectIncident: (incident: IncidentAlert) => void;
}

export const IncidentFeed: React.FC<IncidentFeedProps> = ({
  incidents,
  onSelectIncident,
}) => {
  const [filter, setFilter] = useState<'all' | Severity>('all');

  const filteredIncidents = incidents.filter((inc) => {
    if (filter === 'all') return true;
    return inc.severity === filter;
  });

  const getSeverityBadge = (severity: Severity) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800/60 px-2.5 py-0.5 text-[11px] font-semibold text-rose-800 dark:text-rose-300">
            <AlertCircle className="h-3 w-3 text-rose-600 dark:text-rose-400" />
            Critical
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800/60 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 dark:text-amber-300">
            <AlertTriangle className="h-3 w-3 text-amber-600 dark:text-amber-400" />
            Anomaly Warning
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800/60 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
            <CheckCircle className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
            Resolved
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-sm dark:shadow-xl backdrop-blur-sm transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-700/50 shadow-sm">
            <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              AI Incident &amp; Anomaly Stream
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Autonomous CloudWatch telemetry analysis &amp; root-cause classification
            </p>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1 self-start sm:self-auto bg-slate-100 dark:bg-slate-950/70 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs overflow-x-auto max-w-full">
          <Filter className="h-3.5 w-3.5 text-slate-400 ml-1.5 mr-0.5 hidden sm:block shrink-0" />
          {(['all', 'critical', 'warning', 'resolved'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilter(lvl)}
              className={`rounded-lg px-2.5 py-1 font-semibold capitalize transition text-xs shrink-0 active:scale-95 ${
                filter === lvl
                  ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Incident List */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/70">
        {filteredIncidents.map((incident) => (
          <div
            key={incident.id}
            onClick={() => onSelectIncident(incident)}
            role="button"
            tabIndex={0}
            aria-label={`Inspect incident: ${incident.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectIncident(incident);
              }
            }}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 px-3 -mx-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition active:scale-[0.99]"
          >
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                {getSeverityBadge(incident.severity)}
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  [{incident.service}]
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                  • {incident.timestamp}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition truncate">
                {incident.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">OpsPulse AI: </span>
                {incident.aiRootCause}
              </p>
            </div>

            <div className="flex items-center gap-2 sm:self-center shrink-0 pt-1 sm:pt-0">
              <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 shadow-sm group-hover:bg-cyan-50 dark:group-hover:bg-slate-750 transition">
                <span>Inspect AI Diagnosis</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
