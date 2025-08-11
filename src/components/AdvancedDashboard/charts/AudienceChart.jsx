import React, { useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const AudienceChart = ({ data }) => {
  const [chartType, setChartType] = useState('doughnut');
  const [showPercentages, setShowPercentages] = useState(true);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: data.map(item => item.color),
        borderColor: data.map(item => item.color),
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverOffset: 8
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'normal'
          },
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const value = data.datasets[0].data[i];
                const percentage = ((value / total) * 100).toFixed(1);
                return {
                  text: showPercentages ? `${label} (${percentage}%)` : label,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].borderColor[i],
                  lineWidth: data.datasets[0].borderWidth,
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
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
            const label = context.label || '';
            const value = context.parsed;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
    cutout: chartType === 'doughnut' ? '60%' : '0%',
    elements: {
      arc: {
        borderWidth: 2
      }
    }
  };

  return (
    <div className="audience-chart">
      <div className="chart-controls">
        <div className="chart-type-selector">
          <button
            className={`chart-type-btn ${chartType === 'pie' ? 'active' : ''}`}
            onClick={() => setChartType('pie')}
          >
            Pie
          </button>
          <button
            className={`chart-type-btn ${chartType === 'doughnut' ? 'active' : ''}`}
            onClick={() => setChartType('doughnut')}
          >
            Doughnut
          </button>
        </div>
        
        <button
          className={`percentage-toggle ${showPercentages ? 'active' : ''}`}
          onClick={() => setShowPercentages(!showPercentages)}
        >
          Show %
        </button>
      </div>

      <div className="chart-container">
        {chartType === 'pie' ? (
          <Pie data={chartData} options={options} />
        ) : (
          <Doughnut data={chartData} options={options} />
        )}
        
        {chartType === 'doughnut' && (
          <div className="center-stats">
            <div className="total-value">
              {total.toLocaleString()}
            </div>
            <div className="total-label">
              Total Users
            </div>
          </div>
        )}
      </div>

      <div className="audience-breakdown">
        {data.map((item, index) => {
          const percentage = ((item.value / total) * 100).toFixed(1);
          return (
            <div key={index} className="breakdown-item">
              <div className="breakdown-header">
                <div 
                  className="color-indicator" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="label">{item.name}</span>
                <span className="percentage">{percentage}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AudienceChart; 

