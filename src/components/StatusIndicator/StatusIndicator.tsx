import * as React from 'react';

interface StatusIndicatorProps {
  total: number;
  healthy: number;
  degraded: number;
  progressing: number;
  unknown: number;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  total,
  healthy,
  degraded,
  progressing,
  unknown
}) => {
  if (total === 0) return null;
  
  const healthyPercentage = (healthy / total) * 100;
  const degradedPercentage = (degraded / total) * 100;
  const progressingPercentage = (progressing / total) * 100;
  const unknownPercentage = (unknown / total) * 100;
  
  return (
    <div style={{ 
      display: 'flex', 
      height: '8px', 
      width: '100%', 
      borderRadius: '4px', 
      overflow: 'hidden',
      marginBottom: '1.5rem'
    }}>
      {healthy > 0 && (
        <div style={{ 
          width: `${healthyPercentage}%`, 
          backgroundColor: '#18BE94' 
        }} />
      )}
      {progressing > 0 && (
        <div style={{ 
          width: `${progressingPercentage}%`, 
          backgroundColor: '#3B73D0' 
        }} />
      )}
      {degraded > 0 && (
        <div style={{ 
          width: `${degradedPercentage}%`, 
          backgroundColor: '#E96D76' 
        }} />
      )}
      {unknown > 0 && (
        <div style={{ 
          width: `${unknownPercentage}%`, 
          backgroundColor: '#8D9BAE' 
        }} />
      )}
    </div>
  );
};

export default StatusIndicator;