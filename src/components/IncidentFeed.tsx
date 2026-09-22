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
          <span className="inline-flex items-center gap-1 rounded-full bg-rose-950/80 border border-rose-800/60 px-2.5 py-0.5 text-[11px] font-medium text-rose-300">
            <AlertCircle className="h-3 w-3 text-rose-400" />
            Critical
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-950/80 border border-amber-800/60 px-2.5 py-0.5 text-[11px] font-medium text-amber-300">
            <AlertTriangle className="h-3 w-3 text-amber-400" />
            Anomaly Warning
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
            <CheckCircle className="h-3 w-3 text-emerald-400" />
            Resolved
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-950 border border-indigo-700/50">
            <Sparkles className="h-4 w-4 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">AI Incident & Anomaly Stream</h2>
            <p className="text-xs text-slate-400">Autonomous log analysis and root-cause classification</p>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-xs">
          <Filter className="h-3.5 w-3.5 text-slate-500 ml-1.5 mr-0.5 hidden sm:block" />
          {(['all', 'critical', 'warning', 'resolved'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilter(lvl)}
              className={`rounded-lg px-2.5 py-1 font-medium capitalize transition ${
                filter === lvl
                  ? 'bg-slate-800 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Incident List */}
      <div className="divide-y divide-slate-800/70">
        {filteredIncidents.map((incident) => (
          <div
            key={incident.id}
            onClick={() => onSelectIncident(incident)}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5 px-2.5 -mx-2.5 rounded-xl hover:bg-slate-800/40 cursor-pointer transition"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                {getSeverityBadge(incident.severity)}
                <span className="font-mono text-xs text-slate-400 font-medium">[{incident.service}]</span>
                <span className="text-xs text-slate-500 font-mono">• {incident.timestamp}</span>
              </div>
              <h4 className="text-sm font-medium text-slate-200 group-hover:text-cyan-300 transition">
                {incident.title}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-1">
                <span className="text-indigo-400 font-medium">OpsPulse AI: </span>
                {incident.aiRootCause}
              </p>
            </div>

            <div className="flex items-center gap-3 sm:self-center shrink-0">
              <button className="flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition">
                <span>Inspect AI Diagnosis</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
