import React from 'react';
import { Server, Brain, Database, HardDrive, Zap, Radio, CheckCircle2 } from 'lucide-react';
import type { AwsServiceNode } from '../types';

interface NodeTopologyProps {
  nodes: AwsServiceNode[];
}

export const NodeTopology: React.FC<NodeTopologyProps> = ({ nodes }) => {
  const getServiceIcon = (service: AwsServiceNode['serviceType']) => {
    switch (service) {
      case 'EC2 Cluster':
        return <Server className="h-4 w-4 text-cyan-400" />;
      case 'Amazon Bedrock':
        return <Brain className="h-4 w-4 text-purple-400" />;
      case 'DynamoDB':
        return <Database className="h-4 w-4 text-blue-400" />;
      case 'Amazon S3':
        return <HardDrive className="h-4 w-4 text-emerald-400" />;
      case 'AWS Lambda':
        return <Zap className="h-4 w-4 text-amber-400" />;
      case 'CloudFront':
        return <Radio className="h-4 w-4 text-pink-400" />;
      default:
        return <Server className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 shadow-xl backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h2 className="text-base font-semibold text-white">AWS Infrastructure Topology</h2>
          <p className="text-xs text-slate-400">Live operational nodes running in ap-south-1 & edge distribution</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 px-3 py-1 text-xs text-slate-300">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>6/6 Nodes Healthy</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="group relative rounded-xl border border-slate-800 bg-slate-950/60 p-4 transition hover:border-cyan-500/40 hover:bg-slate-950/80"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 group-hover:border-cyan-500/30">
                  {getServiceIcon(node.serviceType)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-200 group-hover:text-cyan-300 transition">
                    {node.name}
                  </h4>
                  <p className="text-[11px] font-mono text-slate-400">{node.serviceType}</p>
                </div>
              </div>

              <span className="flex h-2 w-2 relative">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
            </div>

            {/* Metrics */}
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-800/80 pt-3 text-[11px]">
              <div>
                <span className="text-slate-500 block">Latency</span>
                <span className="font-mono text-slate-300 font-medium">{node.latencyMs}ms</span>
              </div>
              <div>
                <span className="text-slate-500 block">Uptime</span>
                <span className="font-mono text-slate-300 font-medium">{node.uptime}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Capacity</span>
                <span className="font-mono text-slate-300 font-medium">
                  {node.instances ? `${node.instances} units` : `${node.utilization}%`}
                </span>
              </div>
            </div>

            {/* Utilization Bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                <span>Load Factor</span>
                <span className="font-mono">{node.utilization}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500"
                  style={{ width: `${node.utilization}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
