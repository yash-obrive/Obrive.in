// src/lib/oblink/observability.ts

// 1. STRUCTURED LOGGING
export type OblinkEventName = 
  | 'JOB_STARTED'
  | 'CONTENT_GENERATED'
  | 'AI_REVIEW_PASSED'
  | 'PUBLISHING'
  | 'PUBLISHED'
  | 'PUBLISH_FAILED'
  | 'VERIFICATION_FAILED'
  | 'RECONCILIATION_INCONCLUSIVE'
  | 'DUPLICATE_DETECTED';

export interface OblinkLogPayload {
  jobId: string;
  targetId?: string;
  platform?: string;
  status: string;
  durationMs?: number;
  externalPostId?: string;
  errorCategory?: ErrorCategory;
  [key: string]: any; // Allow other safe fields
}

export function logOblinkEvent(eventName: OblinkEventName, payload: OblinkLogPayload) {
  // Never log credentials. Ensure 'credentials', 'password', 'token', 'secret' are not in payload.
  const sanitizedPayload = { ...payload };
  const sensitiveKeys = ['credentials', 'password', 'token', 'secret', 'apiKey'];
  for (const key of Object.keys(sanitizedPayload)) {
    if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
      delete sanitizedPayload[key];
    }
  }

  const logEntry = {
    timestamp: new Date().toISOString(),
    event: eventName,
    ...sanitizedPayload
  };

  // In production this would send to Datadog/CloudWatch/etc.
  console.log(JSON.stringify(logEntry));
  
  // Update metrics based on event
  updateMetricsForEvent(eventName);
}

// 2. METRICS
export const oblinkMetrics = {
  contentGenerated: 0,
  generationFailures: 0,
  publishAttempts: 0,
  successfulPublication: 0,
  verificationFailures: 0,
  reconciliationFailures: 0,
  duplicatePreventionEvents: 0,
  simulatedPublications: 0,
};

function updateMetricsForEvent(eventName: OblinkEventName) {
  switch (eventName) {
    case 'CONTENT_GENERATED':
      oblinkMetrics.contentGenerated++;
      break;
    case 'PUBLISHING':
      oblinkMetrics.publishAttempts++;
      break;
    case 'PUBLISHED':
      oblinkMetrics.successfulPublication++;
      // reset publish failures on success
      consecutiveFailures.publish = 0;
      break;
    case 'PUBLISH_FAILED':
      consecutiveFailures.publish++;
      checkAlerts();
      break;
    case 'VERIFICATION_FAILED':
      oblinkMetrics.verificationFailures++;
      consecutiveFailures.verification++;
      checkAlerts();
      break;
    case 'RECONCILIATION_INCONCLUSIVE':
      oblinkMetrics.reconciliationFailures++;
      break;
    case 'DUPLICATE_DETECTED':
      oblinkMetrics.duplicatePreventionEvents++;
      break;
    // Note: generationFailures and simulatedPublications are tracked manually when those specific actions occur
  }
}

export function incrementMetric(metric: keyof typeof oblinkMetrics, count: number = 1) {
  oblinkMetrics[metric] += count;
}

export function getOblinkMetrics() {
  return { ...oblinkMetrics };
}

// 3. HEALTH
export type OblinkHealthStatus = 'APP_HEALTHY' | 'DB_UNAVAILABLE' | 'WORKER_DEGRADED' | 'PAUSED';

let currentHealthStatus: OblinkHealthStatus = 'APP_HEALTHY';

export function setOblinkHealth(status: OblinkHealthStatus) {
  currentHealthStatus = status;
}

export function getOblinkHealth(): OblinkHealthStatus {
  // In a real implementation, this might dynamically check DB connections, worker heartbeat, etc.
  return currentHealthStatus;
}

// 4. ERROR TRACKING
export type ErrorCategory = '401' | '403' | '429' | '5xx' | 'timeout' | 'network' | 'unknown';

export function classifyError(error: any): ErrorCategory {
  if (error?.response?.status) {
    const status = error.response.status;
    if (status === 401) return '401';
    if (status === 403) return '403';
    if (status === 429) return '429';
    if (status >= 500 && status < 600) return '5xx';
  }
  
  if (error?.code === 'ETIMEDOUT' || error?.message?.toLowerCase().includes('timeout')) {
    return 'timeout';
  }
  
  if (error?.code === 'ECONNREFUSED' || error?.message?.toLowerCase().includes('network')) {
    return 'network';
  }

  return 'unknown';
}

export function trackError(jobId: string, error: any, context: string) {
  const category = classifyError(error);
  
  logOblinkEvent('PUBLISH_FAILED', {
    jobId,
    status: 'failed',
    errorCategory: category,
    context
  });

  return category;
}

// 5. ALERTING
const consecutiveFailures = {
  publish: 0,
  verification: 0
};

const ALERT_THRESHOLDS = {
  REPEATED_PUBLISH_FAILURES: 3,
  REPEATED_VERIFICATION_FAILURES: 3,
};

export interface Alert {
  type: string;
  message: string;
  timestamp: string;
}

const activeAlerts: Alert[] = [];

export function checkAlerts() {
  if (consecutiveFailures.publish >= ALERT_THRESHOLDS.REPEATED_PUBLISH_FAILURES) {
    triggerAlert('REPEATED_PUBLISH_FAILURES', `Publish failed ${consecutiveFailures.publish} times consecutively`);
  }
  
  if (consecutiveFailures.verification >= ALERT_THRESHOLDS.REPEATED_VERIFICATION_FAILURES) {
    triggerAlert('REPEATED_VERIFICATION_FAILURES', `Verification failed ${consecutiveFailures.verification} times consecutively`);
  }
}

export function triggerAlert(type: string, message: string) {
  const alert: Alert = {
    type,
    message,
    timestamp: new Date().toISOString()
  };
  
  // Prevent duplicate noisy alerts if the exact same alert is already active
  if (!activeAlerts.some(a => a.type === type && a.message === message)) {
    activeAlerts.push(alert);
    console.error(`[ALERT] ${type}: ${message}`);
  }
}

export function getActiveAlerts() {
  return [...activeAlerts];
}

export function clearAlerts(type?: string) {
  if (type) {
    const index = activeAlerts.findIndex(a => a.type === type);
    if (index > -1) activeAlerts.splice(index, 1);
  } else {
    activeAlerts.length = 0;
  }
}
