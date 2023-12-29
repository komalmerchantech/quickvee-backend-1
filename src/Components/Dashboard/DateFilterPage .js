import React, { useState } from 'react';

const DateFilterPage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleFilterSubmit = () => {
    
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Date Filter</h1>

      <div className="flex flex-col space-y-4">
        {/* Start Date */}
        <div className="flex items-center space-x-4">
          <label htmlFor="startDate" className="font-medium">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
            className="border rounded px-2 py-1 border-gray-300"
          />
        </div>

        {/* End Date */}
        <div className="flex items-center space-x-4">
          <label htmlFor="endDate" className="font-medium">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
            className="border rounded px-2 py-1 border-gray-300"
          />
        </div>

        {/* Filter Button */}
        <button onClick={handleFilterSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Filter
        </button>
      </div>
    </div>
  );
};

export default DateFilterPage;
