import React, { useState, useEffect, useRef } from "react";
import { Container, Row } from "react-bootstrap";
import Calendar from "./Calender";
const Welcome = () => {
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setVisibleCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarRef]);

  const openCalendar = () => {
    setVisibleCalendar(true);
  };

  const closeCalendar = () => {
    setVisibleCalendar(false);
  };

  return (
    <>
      <Container>
        <Row>
          <div className="flex justify-between mx-12 my-7 relative">
            <div className="lg:text-[28px] text-[#000000] adminstd_medium opacity-100 leading-tight font-normal sm:text-sm md:text-sm">
              Welcome Malik Saleh
            </div>
            <div
              onClick={() => setVisibleCalendar((prevState) => !prevState)}
              className={`lg:text-[28px] text-[#000000] adminstd_medium opacity-100 leading-tight font-normal sm:text-sm md:text-sm ${
                visibleCalendar ? "active" : ""
              }`}
            >
              Oct 4, 2023 - Oct 4, 2023
            </div>
            <div
              className={visibleCalendar ? "dataCalender" : "nonedatacalender"}
            >
              <div className="flex mx-auto w-full">
                <div className="w-full border-r border-gray-400 p-4">
                  <div className="my-8">Select Option</div>
                  <div>
                    <ul className="flex space-x-8">
                    <li
          className="flex-1 border select_date_btn py-2 rounded active"
          style={{ borderColor: '#0A64F9', color: '#0A64F9', boxShadow: '' }}
        >
          <a href="#"  className="days_filter">Today</a>
        </li>
                      <li className="flex-1 border select_date_btn py-2 rounded">
                        <a href="#" className="days_filter">Yesterday</a>
                      </li>
                    </ul>
                    <ul className="flex space-x-8 mt-4">
                      <li className="flex-1 border select_date_btn py-2 rounded">
                        <a href="#" className="days_filter">Week to Date</a>
                      </li>
                      <li className="flex-1 border select_date_btn py-2 rounded">
                        <a href="#" className="days_filter">Last Week</a>
                      </li>
                    </ul>
                    <ul className="flex space-x-8 mt-4">
                      <li className="flex-1 border select_date_btn py-2 rounded">
                        <a href="#" className="days_filter">Last 7 Days</a>
                      </li>
                      <li className="flex-1 border select_date_btn py-2 rounded">
                        <a href="#" className="days_filter">Month to Date</a>
                      </li>
                    </ul>
                    <ul className="flex space-x-8 mt-4">
                      <li className="flex-1 border select_date_btn py-2 rounded">
                        <a href="#" className="days_filter">Last 30 Days</a>
                      </li>
                      <li className="flex-1 border select_date_btn py-2 rounded">
                        <a href="#" className="days_filter">Last Month</a>
                      </li>
                      </ul>
                      <ul className="flex space-x-8 mt-4">
                      <li className="flex-1 border select_date_btn py-2 rounded">
                        <a href="#" className="days_filter">This Years</a>
                      </li>
                      <li className="flex-1 border select_date_btn py-2 rounded">
                        <a href="#" className="days_filter">Last Last</a>
                      </li>
                      </ul>
                  </div>
                </div>

                <div className="w-full p-4 md:w-full sm:w-full">
                  <div className="">
                    <Calendar />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Welcome;
