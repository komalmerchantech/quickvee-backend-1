
import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'External Credit', value1: 10 },
  { name: 'Cash', value1: 25 },
 
  // Add more data as needed
];

const Mainbarharts = () => {
  return (
    <div className="mx-4 py-7 h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value1" fill="#FF7700" name="Value 1" />
          <Bar dataKey="value2" fill="#FF7700" name="Value 2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Mainbarharts;
