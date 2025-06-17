import React, { useState, useEffect } from 'react';
import { buildApiUrl, getApiHeaders } from '../../config/api';
import './ContentManager.css';

const ContentManager = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    fetchContents();
  }, [filter, searchTerm]);

  const fetchContents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter !== 'ALL') params.append('status', filter);
      if (searchTerm) params.append('search', searchTerm);
      
      const response = await fetch(buildApiUrl(`/api/v1/content?${params}`), {
        headers: getApiHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        setContents(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching contents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (contentId, status) => {
    try {
      const response = await fetch(buildApiUrl(`/api/v1/content/${contentId}/status`), {
        method: 'PATCH',
        headers: getApiHeaders(),
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchContents();
      }
    } catch (error) {
      console.error('Error updating content status:', error);
    }
  };

  const handleDelete = async (contentId) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        const response = await fetch(buildApiUrl(`/api/v1/content/${contentId}`), {
          method: 'DELETE',
          headers: getApiHeaders(),
        });

        if (response.ok) {
          fetchContents();
        }
      } catch (error) {
        console.error('Error deleting content:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'DRAFT': return '#ffa726';
      case 'SCHEDULED': return '#42a5f5';
      case 'PUBLISHED': return '#66bb6a';
      case 'ARCHIVED': return '#bdbdbd';
      default: return '#757575';
    }
  };

  const filteredContents = contents.filter(content => {
    if (filter !== 'ALL' && content.status !== filter) return false;
    if (searchTerm && !content.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="content-manager-loading">
        <div className="loading-spinner"></div>
        <p>Loading content...</p>
      </div>
    );
  }

  return (
    <div className="content-manager">
      <div className="content-manager-header">
        <h1>Content Management</h1>
        <p>Manage your TikTok content, schedule posts, and track performance</p>
      </div>

      <div className="content-controls">
        <div className="search-filter-section">
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="ALL">All Content</option>
            <option value="DRAFT">Drafts</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        <button
          className="btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          Create New Content
        </button>
      </div>

      <div className="content-stats">
        <div className="stat-item">
          <span className="stat-number">{contents.filter(c => c.status === 'DRAFT').length}</span>
          <span className="stat-label">Drafts</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{contents.filter(c => c.status === 'SCHEDULED').length}</span>
          <span className="stat-label">Scheduled</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{contents.filter(c => c.status === 'PUBLISHED').length}</span>
          <span className="stat-label">Published</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {contents.reduce((sum, c) => sum + (c.analytics?.views || 0), 0).toLocaleString()}
          </span>
          <span className="stat-label">Total Views</span>
        </div>
      </div>

      <div className="content-grid">
        {filteredContents.map((content) => (
          <div key={content.id} className="content-card">
            <div className="content-thumbnail">
              {content.thumbnailPath ? (
                <img src={content.thumbnailPath} alt={content.title} />
              ) : (
                <div className="placeholder-thumbnail">
                  {content.type === 'VIDEO' ? '🎬' : '📷'}
                </div>
              )}
              <div 
                className="content-status"
                style={{ backgroundColor: getStatusColor(content.status) }}
              >
                {content.status}
              </div>
            </div>

            <div className="content-info">
              <h3>{content.title}</h3>
              <p className="content-description">{content.description}</p>
              
              <div className="content-meta">
                <span className="content-type">{content.type}</span>
                <span className="content-date">
                  {content.status === 'SCHEDULED' && content.scheduledAt
                    ? `Scheduled: ${formatDate(content.scheduledAt)}`
                    : content.status === 'PUBLISHED' && content.publishedAt
                    ? `Published: ${formatDate(content.publishedAt)}`
                    : `Created: ${formatDate(content.createdAt)}`
                  }
                </span>
              </div>

              {content.hashtags && content.hashtags.length > 0 && (
                <div className="content-hashtags">
                  {content.hashtags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="hashtag">#{tag}</span>
                  ))}
                  {content.hashtags.length > 3 && (
                    <span className="hashtag-more">+{content.hashtags.length - 3}</span>
                  )}
                </div>
              )}

              {content.analytics && (
                <div className="content-analytics">
                  <div className="analytics-item">
                    <span className="analytics-label">Views:</span>
                    <span className="analytics-value">{content.analytics.views?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="analytics-item">
                    <span className="analytics-label">Likes:</span>
                    <span className="analytics-value">{content.analytics.likes?.toLocaleString() || '0'}</span>
                  </div>
                  <div className="analytics-item">
                    <span className="analytics-label">Engagement:</span>
                    <span className="analytics-value">{content.analytics.engagementRate ? `${content.analytics.engagementRate}%` : 'N/A'}</span>
                  </div>
                </div>
              )}

              <div className="content-actions">
                <button
                  className="btn-secondary"
                  onClick={() => setSelectedContent(content)}
                >
                  Edit
                </button>
                
                {content.status === 'DRAFT' && (
                  <button
                    className="btn-primary"
                    onClick={() => handleStatusChange(content.id, 'SCHEDULED')}
                  >
                    Schedule
                  </button>
                )}

                {content.status === 'SCHEDULED' && (
                  <button
                    className="btn-warning"
                    onClick={() => handleStatusChange(content.id, 'DRAFT')}
                  >
                    Unschedule
                  </button>
                )}

                <button
                  className="btn-danger"
                  onClick={() => handleDelete(content.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredContents.length === 0 && (
        <div className="empty-state">
          <h3>No content found</h3>
          <p>
            {searchTerm || filter !== 'ALL'
              ? 'Try adjusting your search or filter criteria.'
              : 'Create your first piece of content to get started.'}
          </p>
          <button
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            Create Content
          </button>
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create New Content</h2>
            <p>Content creation form would go here</p>
            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button className="btn-primary">
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedContent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Content</h2>
            <p>Content editing form would go here for: {selectedContent.title}</p>
            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setSelectedContent(null)}
              >
                Cancel
              </button>
              <button className="btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentManager; 

