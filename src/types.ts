export type Severity = 'critical' | 'warning' | 'info' | 'resolved';

export interface TelemetryMetric {
  id: string;
  name: string;
  value: string;
  unit: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  status: 'healthy' | 'warning' | 'critical';
  history: number[];
}

export interface AwsServiceNode {
  id: string;
  name: string;
  serviceType: 'EC2 Cluster' | 'Amazon Bedrock' | 'DynamoDB' | 'Amazon S3' | 'AWS Lambda' | 'CloudFront';
  region: string;
  status: 'healthy' | 'degraded' | 'error';
  latencyMs: number;
  uptime: string;
  utilization: number;
  instances?: number;
}

export interface IncidentAlert {
  id: string;
  title: string;
  service: string;
  severity: Severity;
  timestamp: string;
  impact: string;
  aiRootCause: string;
  suggestedAction: string;
  awsCliCommand: string;
  resolved: boolean;
}
