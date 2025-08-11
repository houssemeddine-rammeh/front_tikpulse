import React from 'react';

const HeatmapChart = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value));

  const getColorIntensity = (value) => {
    const intensity = value / maxValue;
    return `rgba(59, 130, 246, ${intensity})`;
  };

  return (
    <div className="heatmap-chart">
      <div className="heatmap-grid">
        {data.map((item, index) => (
          <div
            key={index}
            className="heatmap-cell"
            style={{
              backgroundColor: getColorIntensity(item.value),
              width: '40px',
              height: '40px',
              margin: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              color: item.value > maxValue * 0.5 ? 'white' : 'black',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
            title={`${item.label}: ${item.value}`}
          >
            {item.value}
          </div>
        ))}
      </div>
      
      <div className="heatmap-legend">
        <span>Low</span>
        <div className="legend-bar">
          <div
            className="legend-gradient"
            style={{
              background: 'linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 1))',
              width: '100px',
              height: '20px',
              borderRadius: '4px'
            }}
          />
        </div>
        <span>High</span>
      </div>
    </div>
  );
};

export default HeatmapChart; 

