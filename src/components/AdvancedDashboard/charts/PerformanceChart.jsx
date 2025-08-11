import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceChart = ({ data }) => {
  const [selectedMetric, setSelectedMetric] = useState('all');

  const chartData = {
    labels: data.map(item => item.name),
    datasets: selectedMetric === 'all' ? [
      {
        label: 'Views',
        data: data.map(item => item.views),
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: '#667eea',
        borderWidth: 1
      },
      {
        label: 'Likes',
        data: data.map(item => item.likes),
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: '#10b981',
        borderWidth: 1
      },
      {
        label: 'Shares',
        data: data.map(item => item.shares),
        backgroundColor: 'rgba(245, 158, 11, 0.8)',
        borderColor: '#f59e0b',
        borderWidth: 1
      }
    ] : [
      {
        label: selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1),
        data: data.map(item => item[selectedMetric]),
        backgroundColor: selectedMetric === 'views' ? 'rgba(102, 126, 234, 0.8)' :
                        selectedMetric === 'likes' ? 'rgba(16, 185, 129, 0.8)' :
                        'rgba(245, 158, 11, 0.8)',
        borderColor: selectedMetric === 'views' ? '#667eea' :
                    selectedMetric === 'likes' ? '#10b981' :
                    '#f59e0b',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'normal'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1a202c',
        bodyColor: '#475569',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            
            if (value >= 1000000) {
              return `${label}: ${(value / 1000000).toFixed(1)}M`;
            } else if (value >= 1000) {
              return `${label}: ${(value / 1000).toFixed(1)}K`;
            }
            return `${label}: ${value.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          },
          color: '#64748b'
        }
      },
      y: {
        grid: {
          color: 'rgba(226, 232, 240, 0.5)'
        },
        ticks: {
          font: {
            size: 11
          },
          color: '#64748b',
          callback: function(value) {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + 'M';
            } else if (value >= 1000) {
              return (value / 1000).toFixed(1) + 'K';
            }
            return value;
          }
        }
      }
    }
  };

  return (
    <div className="performance-chart">
      <div className="chart-controls">
        <select 
          value={selectedMetric} 
          onChange={(e) => setSelectedMetric(e.target.value)}
          className="metric-selector"
        >
          <option value="all">All Metrics</option>
          <option value="views">Views</option>
          <option value="likes">Likes</option>
          <option value="shares">Shares</option>
        </select>
      </div>

      <div className="chart-container">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PerformanceChart; 

