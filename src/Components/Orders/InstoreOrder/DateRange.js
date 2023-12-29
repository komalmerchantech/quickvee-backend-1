import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";

const DateRange = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const startDateRef = React.useRef(null);
  const endDateRef = React.useRef(null);

  const handleStartDateIconClick = () => {
    startDateRef.current.setOpen(true);
  };

  const handleEndDateIconClick = () => {
    endDateRef.current.setOpen(true);
  };

  const handleSearch = () => {
    // Perform search logic here
    console.log("Selected Start Date:", startDate);
    console.log("Selected End Date:", endDate);
  };

  const [activeOption, setActiveOption] = useState("Today");

  // Function to set the active option
  const setActive = (option) => {
    setActiveOption(option);
  };

  // Function to check if an option is active
  const isActive = (option) => {
    return option === activeOption;
  };

  return (
    <>
        <div className="q_dateRange_header">
      
        <div className="q-datarange-bottom-detail-section">
         
            <div className="q_datafilter_section">
              <div className="text-black text-[18px] font-semibold leading-none mt-2">
                Date Range
              </div>
        
            
              <div className="datarange_days_order">
                {["Today", "Yesterday", "Last 7 Days", "Last 30 days"].map(
                  (option) => (
                    <div
                      key={option}
                      className={`order_Details_days ${
                        isActive(option) ? "text-blue-500" : "text-gray-600"
                      }`}
                      onClick={() => setActive(option)}
                    >
                      {isActive(option) && <div className="dot mr-2" />}
                      {option}
                    </div>
                  )
                )}
              </div>
            </div>
          

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-start mt-4 px-8 py-6">
            {/* Start Date */}
            <div className="relative">
              <div className="mb-2 text-[#818181]  Admin_std">Start Date</div>
              <div className="lg:w-full sm:w-full md:h-full">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="border rounded px-3 py-2 pr-10 mt-1 focus:outline-none focus:border-blue-500 w-[350px]  Admin_std"
                  ref={startDateRef}
                />
                <span
                  className="absolute right-3 top-14 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={handleStartDateIconClick}
                >
                  <FiCalendar className="text-black" />
                </span>
              </div>
            </div>

            {/* End Date */}
            <div className="relative mt-4 sm:mt-0">
              <div className="mb-2 text-[#818181] Admin_std">End Date</div>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="border rounded px-3 py-2 pr-10 mt-1 focus:outline-none focus:border-blue-500 w-[350px]  Admin_std"
                ref={endDateRef}
              />
              <span
                className="absolute right-3 top-14 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={handleEndDateIconClick}
              >
                <FiCalendar className="text-black " />
              </span>
           
             
            </div>
            <span className="search_btn">
              <button
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline self-start mt-6 sm:mt-0 ml-6"
              >
                Search
              </button>
              </span>

            {/* Search Button */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DateRange;
