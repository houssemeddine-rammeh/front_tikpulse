import React from 'react';

const GeoChart = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="geo-chart">
      <div className="geo-map">
        <div className="map-placeholder">
          <span>Geographic Map Visualization</span>
          <small>Chart.js doesn't include geo charts by default</small>
        </div>
      </div>
      
      <div className="geo-legend">
        {data.map((location, index) => {
          const intensity = (location.value / maxValue) * 100;
          
          return (
            <div key={index} className="legend-item">
              <div 
                className="location-indicator"
                style={{ 
                  backgroundColor: `rgba(59, 130, 246, ${intensity / 100})`,
                  width: `${Math.max(20, intensity)}%`
                }}
              />
              <span className="location-name">{location.name}</span>
              <span className="location-value">{location.value.toLocaleString()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GeoChart; 

