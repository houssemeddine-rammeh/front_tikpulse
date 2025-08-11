import React from 'react';
import { TrendingUp, TrendingDown, Eye, Heart, Share2, MessageCircle, Users, Clock } from 'lucide-react';

const MetricCard = ({ data }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getChangeColor = (change) => {
    if (change > 0) return '#10b981'; // green
    if (change < 0) return '#ef4444'; // red
    return '#64748b'; // gray
  };

  const metrics = [
    {
      label: 'Total Views',
      value: formatNumber(data.totalViews),
      change: data.reachGrowth,
      icon,
      color: '#667eea'
    },
    {
      label: 'Total Likes',
      value: formatNumber(data.totalLikes),
      change: data.followerGrowth,
      icon,
      color: '#10b981'
    },
    {
      label: 'Total Shares',
      value: formatNumber(data.totalShares),
      change: 12.3,
      icon,
      color: '#f59e0b'
    },
    {
      label: 'Comments',
      value: formatNumber(data.totalComments),
      change: 8.7,
      icon,
      color: '#ef4444'
    },
    {
      label: 'Engagement Rate',
      value: data.engagementRate.toFixed(1) + '%',
      change: data.engagementRate - 6.5,
      icon,
      color: '#8b5cf6'
    },
    {
      label: 'Active Users',
      value: formatNumber(data.activeUsers),
      change: 5.2,
      icon,
      color: '#06b6d4'
    },
    {
      label: 'Avg Session',
      value: data.sessionDuration.toFixed(1) + 'm',
      change: 2.1,
      icon,
      color: '#84cc16'
    },
    {
      label: 'Conversion Rate',
      value: data.conversionRate.toFixed(1) + '%',
      change: data.conversionRate - 2.8,
      icon,
      color: '#f97316'
    }
  ];

  return (
    <div className="metrics-grid">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        const isPositive = metric.change >= 0;
        
        return (
          <div key={index} className="metric-card" style={{ background: getChangeColor(metric.change) }}>
            <div className="metric-header">
              <IconComponent className="metric-icon" />
              <h4>{metric.label}</h4>
            </div>
            
            <div className="metric-value">
              {metric.value}
            </div>
            
            <div className={`metric-change ${isPositive ? 'positive' : 'negative'}`}>
              {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span>
                {isPositive ? '+' : ''}{metric.change.toFixed(1)}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricCard; 

