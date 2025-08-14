import React, { useState, useEffect } from 'react';
import { buildApiUrl, getApiHeaders } from '../../config/api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch analytics overview
      const statsResponse = await fetch(buildApiUrl('/api/v1/analytics/overview'), {
        headers: getApiHeaders()
      });
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.data);
      }

      // Fetch recent events
      const eventsResponse = await fetch(buildApiUrl('/api/v1/events'), {
        headers: getApiHeaders()
      });
      if (eventsResponse.ok) {
        const eventsData = await eventsResponse.json();
        setEvents(eventsData.data || []);
      }

      // Fetch campaigns
      const campaignsResponse = await fetch(buildApiUrl('/api/v1/campaigns'), {
        headers: getApiHeaders()
      });
      if (campaignsResponse.ok) {
        const campaignsData = await campaignsResponse.json();
        setCampaigns(campaignsData.data || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>DASHTRACER Dashboard</h1>
        <p>Welcome to your DASHTRACER management platform</p>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Events
        </button>
        <button 
          className={`tab ${activeTab === 'campaigns' ? 'active' : ''}`}
          onClick={() => setActiveTab('campaigns')}
        >
          Campaigns
        </button>
        <button 
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="dashboard-content">
          {stats && (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>{stats.users}</h3>
                  <p>Total Users</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📋</div>
                <div className="stat-info">
                  <h3>{stats.campaigns}</h3>
                  <p>Active Campaigns</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🎬</div>
                <div className="stat-info">
                  <h3>{stats.content}</h3>
                  <p>Content Items</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-info">
                  <h3>{stats.events}</h3>
                  <p>Scheduled Events</p>
                </div>
              </div>
            </div>
          )}

          <div className="dashboard-widgets">
            <div className="widget">
              <h3>Recent Events</h3>
              <div className="event-list">
                {events.slice(0, 5).map((event) => (
                  <div key={event._id} className="event-item">
                    <div className="event-info">
                      <h4>{event.title}</h4>
                      <p>{event.description}</p>
                      <span className="event-date">{formatDate(event.date)}</span>
                    </div>
                  </div>
                ))}
                {events.length === 0 && (
                  <p className="no-data">No events scheduled</p>
                )}
              </div>
            </div>

            <div className="widget">
              <h3>Active Campaigns</h3>
              <div className="campaign-list">
                {campaigns.slice(0, 5).map((campaign) => (
                  <div key={campaign._id} className="campaign-item">
                    <div className="campaign-info">
                      <h4>{campaign.name}</h4>
                      <p>Status: <span className={`status-${campaign.status}`}>{campaign.status}</span></p>
                      <p>Budget: {formatCurrency(campaign.budget)}</p>
                    </div>
                  </div>
                ))}
                {campaigns.length === 0 && (
                  <p className="no-data">No active campaigns</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="dashboard-content">
          <div className="section-header">
            <h2>Event Management</h2>
            <button className="btn-primary">Create New Event</button>
          </div>
          <div className="events-grid">
            {events.map((event) => (
              <div key={event._id} className="event-card">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="event-details">
                  <span>📅 {formatDate(event.date)}</span>
                  <span>📍 {event.location}</span>
                </div>
                <div className="event-actions">
                  <button className="btn-secondary">Edit</button>
                  <button className="btn-danger">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'campaigns' && (
        <div className="dashboard-content">
          <div className="section-header">
            <h2>Campaign Management</h2>
            <button className="btn-primary">Create New Campaign</button>
          </div>
          <div className="campaigns-grid">
            {campaigns.map((campaign) => (
              <div key={campaign._id} className="campaign-card">
                <h3>{campaign.name}</h3>
                <p>{campaign.description}</p>
                <div className="campaign-details">
                  <span>💰 Budget: {formatCurrency(campaign.budget)}</span>
                  <span className={`status-${campaign.status}`}>Status: {campaign.status}</span>
                </div>
                <div className="campaign-actions">
                  <button className="btn-secondary">Edit</button>
                  <button className="btn-danger">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="dashboard-content">
          <div className="section-header">
            <h2>Analytics Overview</h2>
          </div>
          <div className="analytics-section">
            <p>Analytics dashboard coming soon...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 

