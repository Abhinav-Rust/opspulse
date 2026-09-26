import React from 'react';
import { Activity, Layers, BookOpen, ArrowRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onOpenAwsModal: () => void;
  onOpenDocsModal: () => void;
  onOpenTrialModal: () => void;
  onOpenSignInModal: () => void;
  onScrollToSection: (sectionId: string) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAwsModal,
  onOpenDocsModal,
  onOpenTrialModal,
  onOpenSignInModal,
  onScrollToSection,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3.5 py-2.5 sm:px-6 sm:py-3 lg:px-8">
        {/* Brand & Desktop Navigation */}
        <div className="flex items-center gap-6">
          <div
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer"
            onClick={() => onScrollToSection('hero')}
          >
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
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                opspulse.in • AWS Native
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <button
              type="button"
              onClick={() => onScrollToSection('console')}
              className="px-3 py-1.5 rounded-lg hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              Live Console
            </button>
            <button
              type="button"
              onClick={() => onScrollToSection('mesh')}
              className="px-3 py-1.5 rounded-lg hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              Causal Mesh
            </button>
            <button
              type="button"
              onClick={onOpenAwsModal}
              className="px-3 py-1.5 rounded-lg hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              Cloud Architecture
            </button>
            <button
              type="button"
              onClick={() => onScrollToSection('finops')}
              className="px-3 py-1.5 rounded-lg hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              FinOps ROI
            </button>
            <button
              type="button"
              onClick={() => onScrollToSection('pricing')}
              className="px-3 py-1.5 rounded-lg hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
            >
              Pricing
            </button>
            <button
              type="button"
              onClick={onOpenDocsModal}
              className="px-3 py-1.5 rounded-lg hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition flex items-center gap-1"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Docs</span>
            </button>
          </nav>
        </div>

        {/* Right Actions: Clean SaaS Header */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cloud Specs (Secondary) */}
          <button
            onClick={onOpenAwsModal}
            type="button"
            className="hidden sm:flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 transition active:scale-95"
            title="View AWS Cloud Architecture & Infrastructure Details"
          >
            <Layers className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Cloud Specs</span>
          </button>

          {/* Sign In Button */}
          <button
            onClick={onOpenSignInModal}
            type="button"
            className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition"
          >
            Sign In
          </button>

          {/* Primary CTA: Start Free Trial */}
          <button
            onClick={onOpenTrialModal}
            type="button"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 px-3 sm:px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition active:scale-95"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="h-3 w-3 hidden sm:inline" />
          </button>

          {/* Theme Toggle (Dark / Light) cleanly positioned at right edge */}
          <div className="pl-1 border-l border-slate-200 dark:border-slate-800">
            <ThemeToggle theme={theme} onToggleTheme={onToggleTheme} />
          </div>
        </div>
      </div>
    </header>
  );
};
