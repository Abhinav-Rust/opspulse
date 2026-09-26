import React, { useState, useEffect } from 'react';
import { Activity, Globe, RefreshCw, Layers } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onOpenAwsModal: () => void;
  onOpenFounderModal: () => void;
  isSimulating: boolean;
  onToggleSimulate: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAwsModal,
  onOpenFounderModal,
  isSimulating,
  onToggleSimulate,
  theme,
  onToggleTheme,
}) => {
  const [time, setTime] = useState<string>('');
  const [region, setRegion] = useState<string>('eu-north-1 (Stockholm)');

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
    <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3.5 py-2.5 sm:px-6 sm:py-3 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 shadow-md shadow-cyan-500/20 shrink-0">
            <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                OpsPulse
              </span>
              <span className="rounded-full bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-200 dark:border-cyan-700/50 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-cyan-700 dark:text-cyan-300">
                AI Observability
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              opspulse.in • AWS Native
            </p>
          </div>
        </div>

        {/* Center Live Status (Hidden on small screens, shown on md+) */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/60 px-3.5 py-1.5 shadow-inner text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              All Systems Operational
            </span>
          </div>
          <span className="h-3 w-px bg-slate-300 dark:bg-slate-800"></span>
          <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
            <Globe className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
            <select
              aria-label="Select AWS Region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="bg-transparent font-mono text-xs focus:outline-none cursor-pointer text-slate-700 dark:text-slate-300"
            >
              <option value="eu-north-1 (Stockholm)" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                eu-north-1 (Stockholm - Prod)
              </option>
              <option value="ap-south-1 (Mumbai)" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                ap-south-1 (Mumbai)
              </option>
              <option value="us-east-1 (N. Virginia)" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                us-east-1 (N. Virginia)
              </option>
              <option value="eu-west-1 (Ireland)" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                eu-west-1 (Ireland)
              </option>
            </select>
          </div>
          <span className="h-3 w-px bg-slate-300 dark:bg-slate-800"></span>
          <span className="font-mono text-slate-500 dark:text-slate-400">{time} UTC</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Theme Toggle (Dark / Light) */}
          <ThemeToggle
            theme={theme}
            onToggleTheme={onToggleTheme}
          />

          {/* Live stream toggle */}
          <button
            onClick={onToggleSimulate}
            type="button"
            className={`flex items-center gap-1.5 rounded-xl border p-2 sm:px-3 sm:py-1.5 text-xs font-medium transition active:scale-95 ${
              isSimulating
                ? 'border-cyan-300 dark:border-cyan-500/40 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-900/40'
                : 'border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Toggle Live Telemetry Simulation"
            aria-label="Toggle Live Telemetry Simulation"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSimulating ? 'animate-spin text-cyan-600 dark:text-cyan-400' : ''}`} />
            <span className="hidden sm:inline">
              {isSimulating ? 'Live Stream' : 'Paused'}
            </span>
          </button>

          {/* AWS Specs Button */}
          <button
            onClick={onOpenAwsModal}
            type="button"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 border border-amber-500/40 px-2.5 py-1.5 sm:px-3 text-xs font-semibold text-white shadow-sm transition active:scale-95"
            title="View AWS Cloud Architecture & Infrastructure Details"
          >
            <Layers className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">AWS Architecture</span>
            <span className="sm:hidden">AWS</span>
          </button>

          {/* Founder Profile Button ("AS") - Fully Interactive */}
          <button
            onClick={onOpenFounderModal}
            type="button"
            aria-label="Founder Profile: Abhinav Sharma"
            title="Click to view Founder & AWS Account Profile"
            className="group flex items-center gap-2 pl-1.5 sm:pl-2.5 border-l border-slate-200 dark:border-slate-800 rounded-lg py-1 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition active:scale-95 cursor-pointer"
          >
            <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white shadow group-hover:ring-2 group-hover:ring-indigo-400 group-hover:ring-offset-2 dark:group-hover:ring-offset-slate-950 transition">
              AS
              <span className="absolute bottom-0 right-0 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-white dark:border-slate-950 bg-emerald-500"></span>
              </span>
            </div>
            <div className="hidden lg:block text-left pr-1">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                Abhinav Sharma
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                founder@opspulse.in
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
