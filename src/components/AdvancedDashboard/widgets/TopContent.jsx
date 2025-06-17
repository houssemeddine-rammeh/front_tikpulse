import React from 'react';
import { Play, TrendingUp } from 'lucide-react';

const TopContent = ({ data }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="top-content-widget">
      <div className="widget-header">
        <h3>
          <Play className="icon" />
          Top Content
        </h3>
      </div>
      
      <div className="content-list">
        {data.map((item, index) => (
          <div key={item.id} className="content-item">
            <div className="content-rank">
              #{index + 1}
            </div>
            <div className="content-info">
              <h4 className="content-title">{item.title}</h4>
              <div className="content-stats">
                <span className="views">{formatNumber(item.views)} views</span>
                <span className="engagement">
                  <TrendingUp size={12} />
                  {item.engagement.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopContent; 

