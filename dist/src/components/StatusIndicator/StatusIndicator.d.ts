import * as React from 'react';
interface StatusIndicatorProps {
    total: number;
    healthy: number;
    degraded: number;
    progressing: number;
    unknown: number;
}
declare const StatusIndicator: React.FC<StatusIndicatorProps>;
export default StatusIndicator;
