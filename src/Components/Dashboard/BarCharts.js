import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import Customtooltip from "./Customtooltip";

const dataByHourly = [
  { name: "9:00AM", pv: 2400, amt: 0 },
  { name: "10:00AM", pv: 1398, amt: 100 },
  { name: "11:00AM", pv: 20000, amt: 50 },
  { name: "12:00PM", pv: 5000, amt: 50 },
  { name: "1:00PM", pv: 10000, amt: 50 },
  { name: "2:00PM", pv: 9800, amt: 200 },
  { name: "3:00PM", pv: 5000, amt: 0 },
  { name: "4:00PM", pv: 5000, amt: 0 },
  { name: "5:00PM", pv: 6800, amt: 0 },
];

const dataByDay = [
  { name: "Sun", pv: 2400, amt: 0 },
  { name: "Mon", pv: 1398, amt: 100 },
  { name: "Tue", pv: 20000, amt: 50 },
  { name: "Wed", pv: 5000, amt: 50 },
  { name: "Thu", pv: 10000, amt: 50 },
  { name: "Fri", pv: 9800, amt: 200 },
  { name: "Sat", pv: 5000, amt: 0 },
];

const dataByMonth = [
  { name: "Jan", pv: 2400, amt: 0 },
  { name: "Feb", pv: 1398, amt: 100 },
  { name: "Mar", pv: 20000, amt: 50 },
  { name: "Apr", pv: 5000, amt: 50 },
  { name: "May", pv: 10000, amt: 50 },
  { name: "Jun", pv: 9800, amt: 200 },
  { name: "Jul", pv: 5000, amt: 0 },
  { name: "Aug", pv: 5000, amt: 0 },
  { name: "Sep", pv: 6800, amt: 0 },
  { name: "Oct", pv: 6800, amt: 0 },
  { name: "Nov", pv: 6800, amt: 0 },
  { name: "Dec", pv: 6800, amt: 0 },
];

const BarCharts = () => {
  const [selectedFilter, setSelectedFilter] = useState("month");

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const getChartData = () => {
    switch (selectedFilter) {
      case "day":
        return dataByDay;
      case "month":
        return dataByMonth;
      case "time":
        return dataByHourly;
      default:
        return dataByDay;
    }
  };

  const chartData = getChartData();
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-[20px] font-normal opacity-100 text-black ml-4 admin_medium">
          Hourly Net Sales
        </h2>
        
        <div className="flex items-center space-x-4 mt-4">
          {/* Add your filter component here */}
          <select
            className="border-2 border-customColor rounded px-8 py-2 mr-7 bg-white text-blue-500 text-[16px] Admin_std"
            value={selectedFilter}
            onChange={handleFilterChange} 
          >
            <option value="day">Days</option>
            <option value="month">Months</option>
            <option value="time">Time</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>
      {/* <div className="text-[16px] text-[#848484] admin_medium ml-4">
        <span className=""></span>Oct 4, 2023 - Oct 4, 2023
      </div> */}
      <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<Customtooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} />
          <Legend />
          <Bar dataKey="pv" fill="#438AFF" width={10} />
          {/* Add more Bars as needed */}
        </BarChart>
      </ResponsiveContainer>
    </div>
    </div>
  );
};

export default BarCharts;
