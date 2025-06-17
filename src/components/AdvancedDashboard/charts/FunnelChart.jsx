import React from 'react';

const FunnelChart = ({ data }) => {
  const total = data[0]?.value || 1;

  return (
    <div className="funnel-chart">
      <div className="funnel-steps">
        {data.map((step, index) => {
          const percentage = ((step.value / total) * 100).toFixed(1);
          const width = Math.max(20, percentage);
          
          return (
            <div key={index} className="funnel-step">
              <div 
                className="funnel-bar"
                style={{ 
                  width: `${width}%`,
                  backgroundColor: step.color || '#3b82f6'
                }}
              >
                <span className="step-label">{step.name}</span>
                <span className="step-value">{step.value.toLocaleString()}</span>
                <span className="step-percentage">{percentage}%</span>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="funnel-stats">
        <div className="conversion-rate">
          <span className="label">Overall Conversion</span>
          <span className="value">
            {((data[data.length - 1]?.value / total) * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default FunnelChart; 

