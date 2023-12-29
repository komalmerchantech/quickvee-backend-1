import React from 'react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label}`}</p>
        <p className="intro">{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
