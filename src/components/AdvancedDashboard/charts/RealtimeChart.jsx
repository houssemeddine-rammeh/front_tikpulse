import React, { useRef, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const RealtimeChart = ({ data, enabled }) => {
  const chartRef = useRef(null);
  const [animationEnabled, setAnimationEnabled] = useState(true);

  useEffect(() => {
    if (chartRef.current && enabled) {
      chartRef.current.update('none');
    }
  }, [data, enabled]);

  const chartData = {
    labels: data.map(item => item.time),
    datasets: [
      {
        label: 'Active Users',
        data: data.map(item => item.value),
        borderColor: enabled ? '#10b981' : '#94a3b8',
        backgroundColor: enabled 
          ? 'rgba(16, 185, 129, 0.1)' 
          : 'rgba(148, 163, 184, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: enabled ? '#10b981' : '#94a3b8',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: animationEnabled ? 750 : 0,
      easing: 'easeInOutQuart'
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1a202c',
        bodyColor: '#475569',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (context) => {
            return `Time: ${context[0].label}`;
          },
          label: (context) => {
            return `Active Users: ${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false
        },
        ticks: {
          maxTicksLimit: 8,
          font: {
            size: 10
          },
          color: '#64748b'
        }
      },
      y: {
        display: true,
        grid: {
          color: 'rgba(226, 232, 240, 0.3)'
        },
        ticks: {
          font: {
            size: 10
          },
          color: '#64748b',
          callback: function(value) {
            return value.toLocaleString();
          }
        }
      }
    },
    elements: {
      point: {
        hoverBackgroundColor: '#ffffff',
        hoverBorderWidth: 3
      }
    }
  };

  const currentValue = data[data.length - 1]?.value || 0;
  const previousValue = data[data.length - 2]?.value || 0;
  const change = currentValue - previousValue;
  const changePercent = previousValue > 0 ? ((change / previousValue) * 100).toFixed(1) : 0;

  return (
    <div className="realtime-chart">
      <div className="realtime-stats">
        <div className="current-value">
          <span className="value">{currentValue.toLocaleString()}</span>
          <span className="label">Active Users</span>
        </div>
        <div className={`change ${change >= 0 ? 'positive' : 'negative'}`}>
          <span className="change-value">
            {change >= 0 ? '+' : ''}{change}
          </span>
          <span className="change-percent">
            ({changePercent >= 0 ? '+' : ''}{changePercent}%)
          </span>
        </div>
      </div>
      
      <div className="chart-container">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
      
      <div className="realtime-controls">
        <button
          className={`animation-toggle ${animationEnabled ? 'active' : ''}`}
          onClick={() => setAnimationEnabled(!animationEnabled)}
        >
          {animationEnabled ? 'Disable' : 'Enable'} Animation
        </button>
        <div className="update-indicator">
          <div className={`pulse ${enabled ? 'active' : ''}`} />
          <span>Live Updates</span>
        </div>
      </div>
    </div>
  );
};

export default RealtimeChart; 

