import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const SecurityChart = ({ data }) => {
  const statusColors = {
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#3b82f6'
  };

  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: data.map(item => statusColors[item.status]),
        borderWidth: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="security-chart">
      <div className="chart-container">
        <Doughnut data={chartData} options={options} />
        <div className="center-stats">
          <div className="security-score">92</div>
          <div className="score-label">Security Score</div>
        </div>
      </div>
      
      <div className="security-items">
        {data.map((item, index) => (
          <div key={index} className="security-item">
            <div 
              className="status-dot" 
              style={{ backgroundColor: statusColors[item.status] }}
            />
            <span className="item-name">{item.name}</span>
            <span className="item-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityChart; 

