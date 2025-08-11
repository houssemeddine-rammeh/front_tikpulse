import React from 'react';
import { Shield } from 'lucide-react';

const SecurityOverview = ({ data }) => {
  const getThreatColor = (level) => {
    switch (level) {
      case 'low':
        return '#10b981';
      case 'medium':
        return '#f59e0b';
      case 'high':
        return '#ef4444';
      default:
        return '#64748b';
    }
  };

  return (
    <div className="security-overview-widget">
      <div className="widget-header">
        <h3>
          <Shield className="icon" />
          Security Overview
        </h3>
      </div>
      
      <div className="security-stats">
        <div className="threat-level">
          <span className="label">Threat Level</span>
          <span 
            className="value" 
            style={{ color: getThreatColor(data.threatLevel) }}
          >
            {data.threatLevel.toUpperCase()}
          </span>
        </div>
        
        <div className="security-metrics">
          <div className="metric">
            <span className="metric-value">{data.securityScore}</span>
            <span className="metric-label">Security Score</span>
          </div>
          <div className="metric">
            <span className="metric-value">{data.activeThreats}</span>
            <span className="metric-label">Active Threats</span>
          </div>
          <div className="metric">
            <span className="metric-value">{data.blockedAttempts}</span>
            <span className="metric-label">Blocked Attempts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityOverview; 

