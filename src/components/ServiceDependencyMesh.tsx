import React, { useState } from 'react';
import { Radio, Server, Brain, Database, HardDrive, ArrowRight, CheckCircle2 } from 'lucide-react';

interface MeshNode {
  id: string;
  name: string;
  category: string;
  service: string;
  latency: string;
  throughput: string;
  status: 'healthy' | 'optimal';
  description: string;
}

const MESH_NODES: MeshNode[] = [
  {
    id: 'edge',
    name: 'CloudFront Edge POPs',
    category: 'Edge Routing',
    service: 'Amazon CloudFront',
    latency: '12ms',
    throughput: '48.2k req/s',
    status: 'optimal',
    description: 'Global TLS 1.3 edge termination, Route 53 latency routing & DDoS mitigation via AWS Shield.',
  },
  {
    id: 'gateway',
    name: 'Ingestion Gateway',
    category: 'Compute & Queue',
    service: 'EC2 c6i + API Gateway',
    latency: '18ms',
    throughput: '32.4k eps',
    status: 'healthy',
    description: 'High-throughput OpenTelemetry collector daemons buffering raw metrics into streaming queues.',
  },
  {
    id: 'bedrock',
    name: 'Bedrock AI Classifier',
    category: 'AI Diagnostic Engine',
    service: 'Amazon Bedrock (Claude 3.5)',
    latency: '340ms',
    throughput: '1.8k inf/s',
    status: 'healthy',
    description: 'Zero-shot causal anomaly inference, incident clustering & automated SSM runbook synthesis.',
  },
  {
    id: 'state',
    name: 'Global Incident State',
    category: 'Fast Storage',
    service: 'Amazon DynamoDB',
    latency: '3.2ms',
    throughput: '12.5k wcu',
    status: 'optimal',
    description: 'Sub-5ms single-digit millisecond state machine tracking live alerts and topology health.',
  },
  {
    id: 'lakehouse',
    name: 'Telemetry Lakehouse',
    category: 'Long-Term Lake',
    service: 'Amazon S3 + Athena',
    latency: '45ms',
    throughput: '2.4 TB/day',
    status: 'optimal',
    description: 'Columnar Parquet compression with Snappy encoding for historical cross-quarter ML analysis.',
  },
];

export const ServiceDependencyMesh: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<MeshNode>(MESH_NODES[2]); // Default Bedrock

  const getNodeIcon = (id: string) => {
    switch (id) {
      case 'edge':
        return <Radio className="h-4 w-4 text-pink-500" />;
      case 'gateway':
        return <Server className="h-4 w-4 text-cyan-500" />;
      case 'bedrock':
        return <Brain className="h-4 w-4 text-purple-500" />;
      case 'state':
        return <Database className="h-4 w-4 text-blue-500" />;
      case 'lakehouse':
        return <HardDrive className="h-4 w-4 text-emerald-500" />;
      default:
        return <Server className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-sm dark:shadow-xl backdrop-blur-sm transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Causal Telemetry Mesh &amp; Data Pipeline
            </h2>
            <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/70 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 dark:text-indigo-300">
              Active Stream
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time data packet propagation across distributed AWS cloud services
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          <span>Zero Pipeline Bottlenecks</span>
        </div>
      </div>

      {/* Visual Pipeline Flow */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 sm:gap-3 items-center relative mb-6">
        {MESH_NODES.map((node, index) => {
          const isSelected = selectedNode.id === node.id;
          return (
            <React.Fragment key={node.id}>
              <button
                type="button"
                onClick={() => setSelectedNode(node)}
                className={`relative flex flex-col p-3.5 rounded-xl border text-left transition active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-50/70 dark:bg-slate-800 shadow-md ring-1 ring-cyan-500'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 hover:border-cyan-500/40 hover:bg-white dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    {getNodeIcon(node.id)}
                  </div>
                  <span className="flex h-2 w-2 relative">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                  {node.name}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  {node.service}
                </p>
                <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-600 dark:text-slate-400 border-t border-slate-200/80 dark:border-slate-800 pt-2">
                  <span>{node.latency}</span>
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400">{node.throughput}</span>
                </div>
              </button>

              {/* Arrow Connector for larger screens */}
              {index < MESH_NODES.length - 1 && (
                <div className="hidden md:flex justify-center -mx-1 text-slate-400 dark:text-slate-600">
                  <ArrowRight className="h-4 w-4 animate-pulse text-cyan-500" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Selected Node Deep Dive Card */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/70 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-800 px-2 py-0.5 rounded-full">
              {selectedNode.category}
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {selectedNode.name} ({selectedNode.service})
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
            {selectedNode.description}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-800">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Transit Latency</span>
            <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">{selectedNode.latency}</span>
          </div>
          <span className="h-8 w-px bg-slate-300 dark:bg-slate-800"></span>
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Current Load</span>
            <span className="font-mono text-sm font-bold text-cyan-600 dark:text-cyan-400">{selectedNode.throughput}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
