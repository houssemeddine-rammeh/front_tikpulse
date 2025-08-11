import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  Share2, 
  MessageCircle,
  Settings,
  Download,
  RefreshCw,
  Filter,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Activity
} from 'lucide-react';
import { format, subDays, startOfDay, endOfDay } from 'date-fns';

// Chart Components
import EngagementChart from './charts/EngagementChart';
import AudienceChart from './charts/AudienceChart';
import PerformanceChart from './charts/PerformanceChart';
import RealtimeChart from './charts/RealtimeChart';
import HeatmapChart from './charts/HeatmapChart';
import FunnelChart from './charts/FunnelChart';
import SecurityChart from './charts/SecurityChart';
import GeoChart from './charts/GeoChart';

// Widgets
import MetricCard from './widgets/MetricCard';
import TopContent from './widgets/TopContent';
import TrendingHashtags from './widgets/TrendingHashtags';
import AudienceInsights from './widgets/AudienceInsights';
import SecurityOverview from './widgets/SecurityOverview';

import './AdvancedDashboard.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const AdvancedDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: startOfDay(subDays(new Date(), 30)),
    end: endOfDay(new Date())
  });
  const [selectedMetrics, setSelectedMetrics] = useState([
    'views', 'likes', 'shares', 'comments', 'engagement'
  ]);
  const [layouts, setLayouts] = useState({});
  const [isCustomizing, setIsCustomizing] = useState(false);

  // Default layout configuration
  const defaultLayouts = useMemo(() => ({
    lg: [
      { i: 'metrics', x: 0, y: 0, w: 12, h: 2 },
      { i: 'engagement', x: 0, y: 2, w: 6, h: 4 },
      { i: 'audience', x: 6, y: 2, w: 6, h: 4 },
      { i: 'performance', x: 0, y: 6, w: 8, h: 4 },
      { i: 'realtime', x: 8, y: 6, w: 4, h: 4 }
    ]
  }), []);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.getDashboardData();
      setDashboardData(response.data || {});
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setDashboardData({});
    } finally {
      setLoading(false);
    }
  };

  // Real-time data updates
  useEffect(() => {
    if (!realTimeEnabled) return;

    const interval = setInterval(() => {
      if (dashboardData) {
        setDashboardData(prev => ({
          ...prev,
          realtimeData: generateRealtimeData(),
          metrics: {
            ...prev.metrics,
            activeUsers: prev.metrics.activeUsers + Math.floor(Math.random() * 20 - 10)
          }
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [realTimeEnabled, dashboardData]);

  // Initial data fetch
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Load saved layouts
  useEffect(() => {
    const savedLayouts = localStorage.getItem('dashboard-layouts');
    if (savedLayouts) {
      setLayouts(JSON.parse(savedLayouts));
    } else {
      setLayouts(defaultLayouts);
    }
  }, [defaultLayouts]);

  // Save layouts
  const handleLayoutChange = useCallback((layout, layouts) => {
    setLayouts(layouts);
    localStorage.setItem('dashboard-layouts', JSON.stringify(layouts));
  }, []);

  // Export dashboard data
  const exportData = useCallback(async (format) => {
    try {
      const response = await fetch('/api/v1/analytics/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format, dateRange, metrics: selectedMetrics })
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dashboard-export-${format}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export failed:', error);
    }
  }, [dateRange, selectedMetrics]);

  // Reset layouts to default
  const resetLayouts = useCallback(() => {
    setLayouts(defaultLayouts);
    localStorage.setItem('dashboard-layouts', JSON.stringify(defaultLayouts));
  }, [defaultLayouts]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading advanced dashboard...</p>
      </div>
    );
  }

  if (!dashboardData) {
    return <div className="dashboard-error">Error loading dashboard data</div>;
  }

  return (
    <div className="advanced-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1>
            <BarChart3 className="header-icon" />
            Advanced Analytics Dashboard
          </h1>
          <p>Real-time insights and interactive visualizations</p>
        </div>
        
        <div className="header-controls">
          <div className="date-range-picker">
            <Calendar className="icon" />
            <input
              type="date"
              value={format(dateRange.start, 'yyyy-MM-dd')}
              onChange={(e) => setDateRange(prev => ({
                ...prev,
                start: startOfDay(new Date(e.target.value))
              }))}
            />
            <span>to</span>
            <input
              type="date"
              value={format(dateRange.end, 'yyyy-MM-dd')}
              onChange={(e) => setDateRange(prev => ({
                ...prev,
                end: endOfDay(new Date(e.target.value))
              }))}
            />
          </div>

          <button
            className={`realtime-toggle ${realTimeEnabled ? 'active' : ''}`}
            onClick={() => setRealTimeEnabled(!realTimeEnabled)}
          >
            <Activity className="icon" />
            Real-time {realTimeEnabled ? 'ON' : 'OFF'}
          </button>

          <div className="export-dropdown">
            <button className="export-btn">
              <Download className="icon" />
              Export
            </button>
            <div className="dropdown-content">
              <button onClick={() => exportData('pdf')}>Export as PDF</button>
              <button onClick={() => exportData('csv')}>Export as CSV</button>
              <button onClick={() => exportData('xlsx')}>Export as Excel</button>
            </div>
          </div>

          <button
            className="customize-btn"
            onClick={() => setIsCustomizing(!isCustomizing)}
          >
            <Settings className="icon" />
            Customize
          </button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        onLayoutChange={handleLayoutChange}
        isDraggable={isCustomizing}
        isResizable={isCustomizing}
        margin={[16, 16]}
        containerPadding={[16, 16]}
        rowHeight={60}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        {/* Metrics Overview */}
        <div key="metrics" className="dashboard-widget">
          <div className="metrics-grid">
            <MetricCard
              title="Total Views"
              value={dashboardData.metrics.totalViews}
              icon={<Eye />}
              trend={12.5}
              color="#3b82f6"
            />
            <MetricCard
              title="Total Likes"
              value={dashboardData.metrics.totalLikes}
              icon={<Heart />}
              trend={8.2}
              color="#ef4444"
            />
            <MetricCard
              title="Total Shares"
              value={dashboardData.metrics.totalShares}
              icon={<Share2 />}
              trend={15.3}
              color="#10b981"
            />
            <MetricCard
              title="Total Comments"
              value={dashboardData.metrics.totalComments}
              icon={<MessageCircle />}
              trend={-2.1}
              color="#f59e0b"
            />
            <MetricCard
              title="Engagement Rate"
              value={`${dashboardData.metrics.engagementRate}%`}
              icon={<TrendingUp />}
              trend={5.7}
              color="#8b5cf6"
            />
            <MetricCard
              title="Active Users"
              value={dashboardData.metrics.activeUsers}
              icon={<Users />}
              trend={18.9}
              color="#06b6d4"
              isRealtime={true}
            />
          </div>
        </div>

        {/* Engagement Chart */}
        <div key="engagement" className="dashboard-widget">
          <EngagementChart data={dashboardData.timeSeriesData} />
        </div>

        {/* Audience Chart */}
        <div key="audience" className="dashboard-widget">
          <AudienceChart data={dashboardData.audienceData} />
        </div>

        {/* Performance Chart */}
        <div key="performance" className="dashboard-widget">
          <PerformanceChart data={dashboardData.performanceData} />
        </div>

        {/* Real-time Chart */}
        <div key="realtime" className="dashboard-widget">
          <RealtimeChart 
            data={dashboardData.realtimeData} 
            enabled={realTimeEnabled}
          />
        </div>

        {/* Additional Widgets */}
        <div key="top-content" className="dashboard-widget">
          <TopContent data={dashboardData.topContent} />
        </div>

        <div key="trending-hashtags" className="dashboard-widget">
          <TrendingHashtags data={dashboardData.trendingHashtags} />
        </div>

        <div key="audience-insights" className="dashboard-widget">
          <AudienceInsights data={dashboardData.audienceInsights} />
        </div>

        <div key="security-overview" className="dashboard-widget">
          <SecurityOverview data={dashboardData.securityOverview} />
        </div>
      </ResponsiveGridLayout>

      {/* Customization Panel */}
      {isCustomizing && (
        <div className="customization-panel">
          <h3>Customize Dashboard</h3>
          <p>Drag and resize widgets to customize your dashboard layout.</p>
          <div className="customization-actions">
            <button onClick={resetLayouts} className="reset-btn">
              Reset to Default
            </button>
            <button onClick={() => setIsCustomizing(false)} className="done-btn">
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedDashboard; 

