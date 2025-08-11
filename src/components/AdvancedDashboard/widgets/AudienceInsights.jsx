import React from 'react';
import { Users, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const AudienceInsights = ({ data }) => {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} className="trend-up" />;
      case 'down':
        return <TrendingDown size={16} className="trend-down" />;
      default:
        return <Minus size={16} className="trend-stable" />;
    }
  };

  return (
    <div className="audience-insights-widget">
      <div className="widget-header">
        <h3>
          <Users className="icon" />
          Audience Insights
        </h3>
      </div>
      
      <div className="insights-list">
        {data.map((item, index) => (
          <div key={index} className="insight-item">
            <div className="insight-metric">
              {item.metric}
            </div>
            <div className="insight-value">
              <span className="value">{item.value}</span>
              {getTrendIcon(item.trend)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudienceInsights; 

