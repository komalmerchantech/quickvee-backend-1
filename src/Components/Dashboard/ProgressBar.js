// ProgressBar.js

import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);

  useEffect(() => {
    // Simulate progress updates
    const interval1 = setInterval(() => {
      setProgress1((prev) => (prev < 100 ? prev + 10 : prev));
    }, 1000);

    const interval2 = setInterval(() => {
      setProgress2((prev) => (prev < 100 ? prev + 5 : prev));
    }, 1500);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-64 h-4 bg-gray-300 rounded mt-3">
        <div className=''>
        <div
          className="absolute left-0 top-0 h-full bg-blue-500 rounded w-full"
          style={{ width: `${progress1}%` }}
        ></div>

</div>
      </div>
      <div className="relative w-64 h-4 bg-gray-300 rounded">
        <div
          className="absolute left-0 top-0 h-full bg-green-500 rounded"
          style={{ width: `${progress2}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
