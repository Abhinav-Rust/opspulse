import React from 'react';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';
import type { TelemetryMetric } from '../types';

interface MetricCardProps {
  metric: TelemetryMetric;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  // Generate SVG points for the sparkline
  const min = Math.min(...metric.history);
  const max = Math.max(...metric.history);
  const range = max - min || 1;
  const width = 120;
  const height = 36;

  const points = metric.history
    .map((val, idx) => {
      const x = (idx / (metric.history.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(' ');

  const isHealthy = metric.status === 'healthy';

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-lg backdrop-blur-sm transition-all hover:border-slate-700/80 hover:shadow-cyan-500/5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400">{metric.name}</p>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-bold tracking-tight text-white">{metric.value}</span>
            <span className="text-sm font-semibold text-slate-400">{metric.unit}</span>
          </div>
        </div>

        {/* Sparkline Graph */}
        <div className="h-9 w-28">
          <svg className="h-full w-full overflow-visible" viewBox={`0 0 ${width} ${height}`}>
            <polyline
              fill="none"
              stroke={isHealthy ? '#06b6d4' : '#f59e0b'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
            {/* Last point dot */}
            {metric.history.length > 0 && (
              <circle
                cx={width}
                cy={height - ((metric.history[metric.history.length - 1] - min) / range) * (height - 8) - 4}
                r="3"
                className="fill-cyan-400 animate-pulse"
              />
            )}
          </svg>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs">
        <div className="flex items-center gap-1">
          {metric.trend === 'up' && <TrendingUp className="h-3.5 w-3.5 text-cyan-400" />}
          {metric.trend === 'down' && <TrendingDown className="h-3.5 w-3.5 text-emerald-400" />}
          {metric.trend === 'stable' && <Minus className="h-3.5 w-3.5 text-slate-400" />}
          <span className="text-slate-400 font-mono">{metric.change}</span>
        </div>
        <span className="inline-flex items-center rounded-full bg-emerald-950/80 border border-emerald-800/50 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
          Optimal
        </span>
      </div>
    </div>
  );
};
