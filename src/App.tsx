import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MetricCard } from './components/MetricCard';
import { NodeTopology } from './components/NodeTopology';
import { IncidentFeed } from './components/IncidentFeed';
import { AiDiagnosticDrawer } from './components/AiDiagnosticDrawer';
import { AwsArchitectureModal } from './components/AwsArchitectureModal';
import { WorkspaceSettingsModal } from './components/WorkspaceSettingsModal';
import { AutonomousTerminalModal } from './components/AutonomousTerminalModal';
import { ServiceDependencyMesh } from './components/ServiceDependencyMesh';
import { FinOpsRoiSection } from './components/FinOpsRoiSection';
import { PricingSection } from './components/PricingSection';
import { ApiDocsModal } from './components/ApiDocsModal';
import { INITIAL_METRICS, INITIAL_NODES, INITIAL_INCIDENTS } from './data/mockData';
import type { TelemetryMetric, AwsServiceNode, IncidentAlert } from './types';
import {
  LayoutDashboard,
  Server,
  Sparkles,
  ArrowRight,
  Layers,
  BookOpen,
  CheckCircle2,
  Activity,
} from 'lucide-react';

export const App: React.FC = () => {
  const [metrics, setMetrics] = useState<TelemetryMetric[]>(INITIAL_METRICS);
  const [nodes] = useState<AwsServiceNode[]>(INITIAL_NODES);
  const [incidents, setIncidents] = useState<IncidentAlert[]>(INITIAL_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<IncidentAlert | null>(null);
  const [terminalIncident, setTerminalIncident] = useState<IncidentAlert | null>(null);

  // Modals
  const [isAwsModalOpen, setIsAwsModalOpen] = useState<boolean>(false);
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState<boolean>(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState<boolean>(false);
  const [isTerminalModalOpen, setIsTerminalModalOpen] = useState<boolean>(false);

  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'nodes' | 'incidents'>('overview');

  // Theme Management (Light & Dark)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('opspulse-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('opspulse-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Real-time telemetry simulation loop
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => {
          const delta = (Math.random() - 0.48) * 1.5;
          const currentVal = parseFloat(metric.value.replace(/,/g, ''));
          let newVal = currentVal + delta;
          if (metric.id === 'cpu-load') newVal = Math.max(25, Math.min(85, newVal));
          if (metric.id === 'mem-saturation') newVal = Math.max(50, Math.min(90, newVal));
          if (metric.id === 'p99-latency') newVal = Math.max(12, Math.min(45, newVal));
          if (metric.id === 'ai-throughput') newVal = Math.max(4000, Math.min(5500, newVal));

          const formattedVal =
            metric.id === 'ai-throughput'
              ? Math.round(newVal).toLocaleString('en-US')
              : newVal.toFixed(1);

          const updatedHistory = [...metric.history.slice(1), parseFloat(formattedVal.replace(/,/g, ''))];

          return {
            ...metric,
            value: formattedVal,
            history: updatedHistory,
          };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleResolveIncident = (id: string) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, severity: 'resolved', resolved: true } : inc))
    );
    if (selectedIncident && selectedIncident.id === id) {
      setSelectedIncident((prev) => (prev ? { ...prev, severity: 'resolved', resolved: true } : null));
    }
  };

  const handleOpenTerminalForIncident = (incident: IncidentAlert) => {
    setTerminalIncident(incident);
    setIsTerminalModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Top Navigation Bar */}
      <Header
        onOpenAwsModal={() => setIsAwsModalOpen(true)}
        onOpenWorkspaceModal={() => setIsWorkspaceModalOpen(true)}
        onOpenDocsModal={() => setIsDocsModalOpen(true)}
        onScrollToSection={handleScrollToSection}
        isSimulating={isSimulating}
        onToggleSimulate={() => setIsSimulating(!isSimulating)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Hero Section */}
      <section id="hero" className="border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/30 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="mx-auto max-w-7xl text-center space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 dark:border-cyan-800/80 bg-cyan-50 dark:bg-cyan-950/60 px-3.5 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-cyan-500 animate-pulse" />
            <span>OpsPulse Enterprise Cloud • AWS Native Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
            Autonomous Cloud Remediation &amp; SRE Intelligence for AWS
          </h1>

          <p className="mt-3 text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            OpsPulse ingests distributed OpenTelemetry streams, classifies infrastructure anomalies using Amazon Bedrock foundation models in milliseconds, and executes self-healing runbooks before customer outages occur.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={() => handleScrollToSection('console')}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition active:scale-95 cursor-pointer"
            >
              <span>Explore Live Telemetry Console</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setIsAwsModalOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 px-5 py-3 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 shadow-sm transition active:scale-95 cursor-pointer"
            >
              <Layers className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <span>AWS Architecture Specs</span>
            </button>

            <button
              type="button"
              onClick={() => setIsDocsModalOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 px-4 py-3 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 shadow-sm transition active:scale-95 cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-indigo-500" />
              <span>Integration SDK</span>
            </button>
          </div>

          {/* Enterprise Badges Row */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Amazon Bedrock Multi-Model Diagnostics</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>99.99% Availability SLA</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Zero-Trust IAM Role Isolation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Global Sub-20ms CloudFront POPs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Sandbox Body */}
      <main className="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 w-full">
        {/* Section 1: Live Interactive Console */}
        <section id="console" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500"></span>
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  Live Autonomous Observability Console
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Real-time telemetry streams, node health state, and zero-shot anomaly classification
              </p>
            </div>

            {/* Quick tab controls */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto text-xs font-semibold overflow-x-auto max-w-full">
              <button
                onClick={() => setActiveTab('overview')}
                type="button"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition active:scale-95 shrink-0 ${
                  activeTab === 'overview'
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span>Overview</span>
              </button>
              <button
                onClick={() => setActiveTab('nodes')}
                type="button"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition active:scale-95 shrink-0 ${
                  activeTab === 'nodes'
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Server className="h-3.5 w-3.5" />
                <span>AWS Nodes</span>
              </button>
              <button
                onClick={() => setActiveTab('incidents')}
                type="button"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition active:scale-95 shrink-0 ${
                  activeTab === 'incidents'
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>AI Anomaly Stream</span>
              </button>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>

          {/* Content Tabs */}
          {activeTab === 'overview' && (
            <div className="space-y-6 sm:space-y-8">
              <NodeTopology nodes={nodes} />
              <IncidentFeed
                incidents={incidents}
                onSelectIncident={(inc) => setSelectedIncident(inc)}
              />
            </div>
          )}

          {activeTab === 'nodes' && (
            <div className="space-y-6 sm:space-y-8">
              <NodeTopology nodes={nodes} />
            </div>
          )}

          {activeTab === 'incidents' && (
            <div className="space-y-6 sm:space-y-8">
              <IncidentFeed
                incidents={incidents}
                onSelectIncident={(inc) => setSelectedIncident(inc)}
              />
            </div>
          )}
        </section>

        {/* Section 2: Causal Telemetry Mesh */}
        <section id="mesh">
          <ServiceDependencyMesh />
        </section>

        {/* Section 3: FinOps ROI Intelligence */}
        <section id="finops">
          <FinOpsRoiSection />
        </section>

        {/* Section 4: Transparent SaaS Pricing */}
        <section id="pricing">
          <PricingSection />
        </section>
      </main>

      {/* Slide-over Diagnostic Drawer */}
      <AiDiagnosticDrawer
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
        onResolve={handleResolveIncident}
        onOpenTerminal={handleOpenTerminalForIncident}
      />

      {/* Interactive AWS CloudShell Autonomous Terminal Modal */}
      <AutonomousTerminalModal
        isOpen={isTerminalModalOpen}
        incident={terminalIncident}
        onClose={() => setIsTerminalModalOpen(false)}
        onCompleteHealing={handleResolveIncident}
      />

      {/* AWS Cloud Architecture Specifications Modal */}
      <AwsArchitectureModal
        isOpen={isAwsModalOpen}
        onClose={() => setIsAwsModalOpen(false)}
      />

      {/* Workspace & Infrastructure Settings Modal */}
      <WorkspaceSettingsModal
        isOpen={isWorkspaceModalOpen}
        onClose={() => setIsWorkspaceModalOpen(false)}
        onOpenAwsModal={() => setIsAwsModalOpen(true)}
      />

      {/* Developer SDK & API Documentation Modal */}
      <ApiDocsModal
        isOpen={isDocsModalOpen}
        onClose={() => setIsDocsModalOpen(false)}
      />

      {/* Comprehensive Enterprise Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 transition-colors">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Activity className="h-4 w-4 text-cyan-500" />
              <span className="font-bold text-sm text-slate-900 dark:text-white">OpsPulse Systems</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Autonomous cloud infrastructure telemetry, generative root-cause analysis, and self-healing runbooks.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => handleScrollToSection('console')} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">
                  Live SRE Console
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection('mesh')} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">
                  Causal Service Mesh
                </button>
              </li>
              <li>
                <button onClick={() => setIsAwsModalOpen(true)} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">
                  Cloud Specifications
                </button>
              </li>
              <li>
                <button onClick={() => handleScrollToSection('finops')} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">
                  FinOps Analytics
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-3">
              Developers
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => setIsDocsModalOpen(true)} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">
                  Integration Quickstart
                </button>
              </li>
              <li>
                <button onClick={() => setIsDocsModalOpen(true)} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">
                  CloudFormation Templates
                </button>
              </li>
              <li>
                <a href="https://github.com/Abhinav-Rust/opspulse" target="_blank" rel="noreferrer" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">
                  GitHub Open Source
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-3">
              Governance &amp; Contact
            </h4>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>
                <a href="mailto:contact@opspulse.in" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition font-mono">
                  contact@opspulse.in
                </a>
              </li>
              <li>
                <button onClick={() => setIsWorkspaceModalOpen(true)} className="hover:text-cyan-600 dark:hover:text-cyan-400 transition">
                  Workspace Settings
                </button>
              </li>
              <li>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  SLA: 99.99% Operational
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto max-w-7xl pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© 2026 OpsPulse Systems Inc. • opspulse.in • All rights reserved.</p>
          <p className="font-mono">Registered Domain: opspulse.in (Multi-Region CloudFront Production)</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
