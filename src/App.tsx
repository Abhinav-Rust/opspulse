import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MetricCard } from './components/MetricCard';
import { NodeTopology } from './components/NodeTopology';
import { IncidentFeed } from './components/IncidentFeed';
import { AiDiagnosticDrawer } from './components/AiDiagnosticDrawer';
import { AwsArchitectureModal } from './components/AwsArchitectureModal';
import { INITIAL_METRICS, INITIAL_NODES, INITIAL_INCIDENTS } from './data/mockData';
import type { TelemetryMetric, AwsServiceNode, IncidentAlert } from './types';
import { LayoutDashboard, Server, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [metrics, setMetrics] = useState<TelemetryMetric[]>(INITIAL_METRICS);
  const [nodes] = useState<AwsServiceNode[]>(INITIAL_NODES);
  const [incidents, setIncidents] = useState<IncidentAlert[]>(INITIAL_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<IncidentAlert | null>(null);
  const [isAwsModalOpen, setIsAwsModalOpen] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'nodes' | 'incidents'>('overview');

  // Simulation loop for realistic real-time telemetry
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navigation */}
      <Header
        onOpenAwsModal={() => setIsAwsModalOpen(true)}
        isSimulating={isSimulating}
        onToggleSimulate={() => setIsSimulating(!isSimulating)}
      />

      {/* Hero Sub-Header */}
      <section className="border-b border-slate-800/80 bg-slate-900/30 py-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Cloud Observability &amp; Incident Intelligence
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Autonomous telemetry ingestion, predictive anomaly classification, and automated AWS healing.
            </p>
          </div>

          {/* Quick tab controls */}
          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start md:self-auto text-xs font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('nodes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'nodes'
                  ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Server className="h-3.5 w-3.5" />
              <span>AWS Nodes</span>
            </button>
            <button
              onClick={() => setActiveTab('incidents')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
                activeTab === 'incidents'
                  ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Anomaly Stream</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Dashboard Body */}
      <main className="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 space-y-8 w-full">
        {/* Metric Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </section>

        {/* Content Tabs */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <NodeTopology nodes={nodes} />
            <IncidentFeed
              incidents={incidents}
              onSelectIncident={(inc) => setSelectedIncident(inc)}
            />
          </div>
        )}

        {activeTab === 'nodes' && (
          <div className="space-y-8">
            <NodeTopology nodes={nodes} />
          </div>
        )}

        {activeTab === 'incidents' && (
          <div className="space-y-8">
            <IncidentFeed
              incidents={incidents}
              onSelectIncident={(inc) => setSelectedIncident(inc)}
            />
          </div>
        )}
      </main>

      {/* Slide-over Diagnostic Drawer */}
      <AiDiagnosticDrawer
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
        onResolve={handleResolveIncident}
      />

      {/* AWS Cloud Architecture Modal */}
      <AwsArchitectureModal
        isOpen={isAwsModalOpen}
        onClose={() => setIsAwsModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 px-4 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 OpsPulse Inc. • Registered at opspulse.in • Built for AWS Cloud Infrastructure</p>
          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsAwsModalOpen(true)}
              className="hover:text-cyan-400 transition"
            >
              AWS Cloud Architecture
            </button>
            <span>•</span>
            <a
              href="mailto:founder@opspulse.in"
              className="hover:text-cyan-400 transition"
            >
              founder@opspulse.in
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
