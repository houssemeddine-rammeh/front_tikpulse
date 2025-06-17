import React, { useState, useEffect } from 'react';
import './AnalyticsDashboard.css';
import api from '../../services/api';

;
  timeSeriesData: {
    date;
    views;
    likes;
    shares;
    comments;
    followers;
  }[];
  topContent: {
    id;
    title;
    type;
    views;
    likes;
    engagementRate;
    publishedAt;
  }[];
  demographics: {
    ageGroups: { range; percentage: number }[];
    genders: { gender; percentage: number }[];
    locations: { country; percentage: number }[];
  };
  performance: {
    bestPostingTimes: { hour; engagement: number }[];
    hashtagPerformance: { hashtag; reach; engagement: number }[];
  };
}

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const response = await api.getAnalytics();
      setAnalyticsData(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
      setAnalyticsData(null);
    }
  };

  const generateTimeSeriesData = () => {
    const data = [];
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 ;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      data.push({
        date).split('T')[0],
        views: Math.floor(Math.random() * 50000) + 20000,
        likes: Math.floor(Math.random() * 5000) + 2000,
        shares: Math.floor(Math.random() * 1000) + 500,
        comments: Math.floor(Math.random() * 800) + 300,
        followers: Math.floor(Math.random() * 200) + 50,
      });
    }
    
    return data;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatPercentage = (num) => {
    return `${num >= 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="analytics-loading">
        <div className="loading-spinner"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (!analyticsData) {
    return <div>Error loading analytics data</div>;
  }

  return (
    <div className="analytics-dashboard">
      <div className="analytics-header">
        <h1>Analytics Dashboard</h1>
        <p>Track your TikTok performance and audience insights</p>
      </div>

      <div className="analytics-controls">
        <div className="time-range-selector">
          <button
            className={timeRange === '7d' ? 'active' ) => setTimeRange('7d')}
          >
            7 Days
          </button>
          <button
            className={timeRange === '30d' ? 'active' : ''}
            onClick={() => setTimeRange('30d')}
          >
            30 Days
          </button>
          <button
            className={timeRange === '90d' ? 'active' : ''}
            onClick={() => setTimeRange('90d')}
          >
            90 Days
          </button>
        </div>
      </div>

      <div className="analytics-tabs">
        <button
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={activeTab === 'content' ? 'active' : ''}
          onClick={() => setActiveTab('content')}
        >
          Content Performance
        </button>
        <button
          className={activeTab === 'audience' ? 'active' : ''}
          onClick={() => setActiveTab('audience')}
        >
          Audience Insights
        </button>
        <button
          className={activeTab === 'optimization' ? 'active' : ''}
          onClick={() => setActiveTab('optimization')}
        >
          Optimization
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="analytics-content">
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-icon">👁️</div>
              <div className="metric-info">
                <h3>{formatNumber(analyticsData.overview.totalViews)}</h3>
                <p>Total Views</p>
                <span className="metric-change positive">
                  {formatPercentage(analyticsData.overview.reachGrowth)}
                </span>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">❤️</div>
              <div className="metric-info">
                <h3>{formatNumber(analyticsData.overview.totalLikes)}</h3>
                <p>Total Likes</p>
                <span className="metric-change positive">
                  {formatPercentage(12.5)}
                </span>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">🔄</div>
              <div className="metric-info">
                <h3>{formatNumber(analyticsData.overview.totalShares)}</h3>
                <p>Total Shares</p>
                <span className="metric-change positive">
                  {formatPercentage(8.3)}
                </span>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">💬</div>
              <div className="metric-info">
                <h3>{formatNumber(analyticsData.overview.totalComments)}</h3>
                <p>Total Comments</p>
                <span className="metric-change positive">
                  {formatPercentage(15.7)}
                </span>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">📈</div>
              <div className="metric-info">
                <h3>{analyticsData.overview.engagementRate}%</h3>
                <p>Engagement Rate</p>
                <span className="metric-change positive">
                  {formatPercentage(2.1)}
                </span>
              </div>
            </div>
            
            <div className="metric-card">
              <div className="metric-icon">👥</div>
              <div className="metric-info">
                <h3>{formatPercentage(analyticsData.overview.followerGrowth)}</h3>
                <p>Follower Growth</p>
                <span className="metric-change positive">
                  {formatPercentage(5.2)}
                </span>
              </div>
            </div>
          </div>

          <div className="chart-section">
            <h3>Performance Trends</h3>
            <div className="chart-placeholder">
              <div className="chart-bars">
                {analyticsData.timeSeriesData.slice(-7).map((data, index) => (
                  <div key={index} className="chart-bar">
                    <div
                      className="bar"
                      style={{
                        height) * 100}%`,
                        backgroundColor: '#ff6b6b',
                      }}
                    ></div>
                    <span className="bar-label">
                      {new Date(data.date).toLocaleDateString('en-US', { weekday)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="chart-description">Daily views over the last 7 days</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="analytics-content">
          <div className="top-content-section">
            <h3>Top Performing Content</h3>
            <div className="content-performance-list">
              {analyticsData.topContent.map((content, index) => (
                <div key={content.id} className="content-performance-item">
                  <div className="content-rank">#{index + 1}</div>
                  <div className="content-details">
                    <h4>{content.title}</h4>
                    <div className="content-stats">
                      <span>👁️ {formatNumber(content.views)}</span>
                      <span>❤️ {formatNumber(content.likes)}</span>
                      <span>📈 {content.engagementRate}%</span>
                    </div>
                  </div>
                  <div className="content-type">{content.type}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'audience' && (
        <div className="analytics-content">
          <div className="demographics-grid">
            <div className="demographic-card">
              <h3>Age Groups</h3>
              <div className="demographic-chart">
                {analyticsData.demographics.ageGroups.map((group, index) => (
                  <div key={index} className="demographic-item">
                    <span className="demographic-label">{group.range}</span>
                    <div className="demographic-bar">
                      <div
                        className="demographic-fill"
                        style={{ width))}
              </div>
            </div>

            <div className="demographic-card">
              <h3>Gender Distribution</h3>
              <div className="demographic-chart">
                {analyticsData.demographics.genders.map((gender, index) => (
                  <div key={index} className="demographic-item">
                    <span className="demographic-label">{gender.gender}</span>
                    <div className="demographic-bar">
                      <div
                        className="demographic-fill"
                        style={{ width))}
              </div>
            </div>

            <div className="demographic-card">
              <h3>Top Locations</h3>
              <div className="demographic-chart">
                {analyticsData.demographics.locations.map((location, index) => (
                  <div key={index} className="demographic-item">
                    <span className="demographic-label">{location.country}</span>
                    <div className="demographic-bar">
                      <div
                        className="demographic-fill"
                        style={{ width))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'optimization' && (
        <div className="analytics-content">
          <div className="optimization-grid">
            <div className="optimization-card">
              <h3>Best Posting Times</h3>
              <div className="posting-times">
                {analyticsData.performance.bestPostingTimes.map((time, index) => (
                  <div key={index} className="posting-time-item">
                    <span className="time-label">{time.hour}:00</span>
                    <div className="engagement-bar">
                      <div
                        className="engagement-fill"
                        style={{ width: `${(time.engagement / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="engagement-value">{time.engagement}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="optimization-card">
              <h3>Hashtag Performance</h3>
              <div className="hashtag-performance">
                {analyticsData.performance.hashtagPerformance.map((hashtag, index) => (
                  <div key={index} className="hashtag-item">
                    <span className="hashtag-name">#{hashtag.hashtag}</span>
                    <div className="hashtag-stats">
                      <span>Reach)}</span>
                      <span>Engagement: {hashtag.engagement}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard; 

