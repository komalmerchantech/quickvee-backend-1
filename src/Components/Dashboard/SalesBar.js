
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'External Credit', value1: 10 },
  { name: 'Cash', value1: 25 },
 
  // Add more data as needed
];

const SalesBar = () => {
  return (
    <div className="mx-4 py-7 h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} width={20}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value1" fill="#438AFF" name="Value 1" width={20} />
          <Bar dataKey="value2" fill="#438AFF" name="Value 2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesBar;
