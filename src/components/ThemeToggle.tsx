import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggleTheme,
  className = '',
  showLabel = false,
}) => {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={onToggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/80 p-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition shadow-sm active:scale-95 ${className}`}
    >
      <div className="relative flex h-6 w-6 items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-amber-500 dark:text-cyan-400 shadow-sm transition">
        {isDark ? (
          <Sun className="h-4 w-4 transition-transform duration-300 rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="h-4 w-4 transition-transform duration-300 -rotate-12 hover:rotate-0" />
        )}
      </div>
      {showLabel && (
        <span className="pr-1.5 text-xs font-semibold">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};
