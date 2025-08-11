import React from 'react';
import { Hash, TrendingUp } from 'lucide-react';

const TrendingHashtags = ({ data }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="trending-hashtags-widget">
      <div className="widget-header">
        <h3>
          <Hash className="icon" />
          Trending Hashtags
        </h3>
      </div>
      
      <div className="hashtag-list">
        {data.map((item, index) => (
          <div key={item.hashtag} className="hashtag-item">
            <div className="hashtag-rank">
              #{index + 1}
            </div>
            <div className="hashtag-info">
              <h4 className="hashtag-name">{item.hashtag}</h4>
              <div className="hashtag-stats">
                <span className="count">{formatNumber(item.count)} posts</span>
                <span className="growth">
                  <TrendingUp size={12} />
                  +{item.growth.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingHashtags; 

