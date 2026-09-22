import React, { useState, useEffect } from 'react';
import { Activity, Globe, RefreshCw, Layers } from 'lucide-react';

interface HeaderProps {
  onOpenAwsModal: () => void;
  isSimulating: boolean;
  onToggleSimulate: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAwsModal,
  isSimulating,
  onToggleSimulate,
}) => {
  const [time, setTime] = useState<string>('');
  const [region, setRegion] = useState<string>('ap-south-1 (Mumbai)');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-500 shadow-lg shadow-cyan-500/20">
            <Activity className="h-6 w-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">OpsPulse</span>
              <span className="rounded-full bg-cyan-950 border border-cyan-700/50 px-2 py-0.5 text-[11px] font-medium text-cyan-300">
                AI Observability
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">opspulse.in • AWS Native</p>
          </div>
        </div>

        {/* Center Live Status */}
        <div className="hidden md:flex items-center gap-4 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1.5 shadow-inner">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-400">All Systems Operational</span>
          </div>
          <span className="h-3 w-px bg-slate-800"></span>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Globe className="h-3.5 w-3.5 text-cyan-400" />
            <select
              aria-label="Select AWS Region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="bg-transparent text-slate-300 font-mono text-xs focus:outline-none cursor-pointer"
            >
              <option value="ap-south-1 (Mumbai)" className="bg-slate-900 text-white">ap-south-1 (Mumbai)</option>
              <option value="us-east-1 (N. Virginia)" className="bg-slate-900 text-white">us-east-1 (N. Virginia)</option>
              <option value="eu-west-1 (Ireland)" className="bg-slate-900 text-white">eu-west-1 (Ireland)</option>
            </select>
          </div>
          <span className="h-3 w-px bg-slate-800"></span>
          <span className="text-xs font-mono text-slate-400">{time} UTC</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Live stream toggle */}
          <button
            onClick={onToggleSimulate}
            className={`hidden sm:flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
              isSimulating
                ? 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/40'
                : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
            }`}
            title="Toggle Live Telemetry Simulation"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSimulating ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{isSimulating ? 'Live Stream Active' : 'Stream Paused'}</span>
          </button>

          {/* AWS Specs Button */}
          <button
            onClick={onOpenAwsModal}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-600/80 to-amber-700/90 hover:from-amber-600 hover:to-amber-700 border border-amber-500/40 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition"
          >
            <Layers className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">AWS Architecture</span>
            <span className="sm:hidden">AWS</span>
          </button>

          {/* Founder Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white shadow">
              AS
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-medium text-slate-200">Abhinav Sharma</p>
              <p className="text-[10px] text-slate-400 font-mono">founder@opspulse.in</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
