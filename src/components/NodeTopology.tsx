import React, { useState } from 'react';
import { Server, Brain, Database, HardDrive, Zap, Radio, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import type { AwsServiceNode } from '../types';

interface NodeTopologyProps {
  nodes: AwsServiceNode[];
}

export const NodeTopology: React.FC<NodeTopologyProps> = ({ nodes }) => {
  const [selectedNode, setSelectedNode] = useState<AwsServiceNode | null>(null);

  const getServiceIcon = (service: AwsServiceNode['serviceType']) => {
    switch (service) {
      case 'EC2 Cluster':
        return <Server className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />;
      case 'Amazon Bedrock':
        return <Brain className="h-4 w-4 text-purple-500 dark:text-purple-400" />;
      case 'DynamoDB':
        return <Database className="h-4 w-4 text-blue-500 dark:text-blue-400" />;
      case 'Amazon S3':
        return <HardDrive className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />;
      case 'AWS Lambda':
        return <Zap className="h-4 w-4 text-amber-500 dark:text-amber-400" />;
      case 'CloudFront':
        return <Radio className="h-4 w-4 text-pink-500 dark:text-pink-400" />;
      default:
        return <Server className="h-4 w-4 text-slate-500 dark:text-slate-400" />;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-sm dark:shadow-xl backdrop-blur-sm transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            AWS Infrastructure Topology
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Live operational nodes running in eu-north-1 &amp; CloudFront edge distribution
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>6/6 Nodes Healthy</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {nodes.map((node) => {
          const isSelected = selectedNode?.id === node.id;
          return (
            <div
              key={node.id}
              onClick={() => setSelectedNode(isSelected ? null : node)}
              className={`group relative rounded-xl border p-4 transition cursor-pointer active:scale-[0.98] ${
                isSelected
                  ? 'border-cyan-500 bg-cyan-50/50 dark:bg-slate-950 ring-1 ring-cyan-500'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 hover:border-cyan-500/50 hover:bg-white dark:hover:bg-slate-950/90'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm group-hover:border-cyan-500/40">
                    {getServiceIcon(node.serviceType)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition">
                      {node.name}
                    </h4>
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {node.serviceType}
                    </p>
                  </div>
                </div>

                <span className="flex h-2.5 w-2.5 relative">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                </span>
              </div>

              {/* Metrics */}
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-200/80 dark:border-slate-800/80 pt-3 text-[11px]">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block font-medium">Latency</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200 font-bold">{node.latencyMs}ms</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block font-medium">Uptime</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200 font-bold">{node.uptime}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block font-medium">Capacity</span>
                  <span className="font-mono text-slate-800 dark:text-slate-200 font-bold">
                    {node.instances ? `${node.instances} units` : `${node.utilization}%`}
                  </span>
                </div>
              </div>

              {/* Utilization Bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mb-1 font-medium">
                  <span>Resource Saturation</span>
                  <span className="font-mono font-semibold">{node.utilization}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 transition-all duration-500"
                    style={{ width: `${node.utilization}%` }}
                  ></div>
                </div>
              </div>

              {/* Tappable feedback */}
              <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Activity className="h-2.5 w-2.5 text-cyan-500" />
                  {node.region || 'eu-north-1'}
                </span>
                <span className="group-hover:text-cyan-600 dark:group-hover:text-cyan-400 flex items-center">
                  {isSelected ? 'Selected' : 'Tap to inspect'}
                  <ChevronRight className="h-3 w-3 ml-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
