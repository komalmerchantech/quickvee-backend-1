import React, { useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Grid from "@mui/material/Grid";
import caleIcon from "../../Assests/Filter/Calender.svg";
import TimeIcon from "../../Assests/Filter/Clock.svg";


const CustomDateTime = () => {
  // const [selectedStartDate, handleStartDateChange] = useState(null);
  // const [selectedEndDate, handleEndDateChange] = useState(null);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className="">
            <div
              style={{
                display: "flex",
                gap: "1rem",
                border: "1px solid #E3E3E3",
                borderRadius: "4px",
                height: "45px",
              }}
              className="date_selected"
            >
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                className="date-provider"
              >
                <DatePicker
                  label="Start date"
                  renderInput={() => (
                    <input name="start_date" id="start_date"   />
                  )}
                  components={{
                    OpenPickerIcon: () => (
                      <img src={caleIcon} alt="calendar-icon" />
                    ),
                  }}
                />
              </LocalizationProvider>
              <div className="dividersss" />
              <div className="q_time_display">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Start Time"
                    className="input_label_section"
                    name="start_tym"
                    id="start_tym"
                    components={{
                      OpenPickerIcon: () => (
                        <img src={TimeIcon} alt="time-icon" />
                      ),
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className="">
            <div
              style={{
                display: "flex",
                gap: "1rem",
                border: "1px solid #E3E3E3",
                borderRadius: "4px",
                height: "45px",
              }}
              className="date_selected"
            >
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                className="date-provider"
              >
                <DatePicker
                  label="End date"
                  renderInput={() => (
                    <input
                      name="start_date"
                      id="start_date"
                      className="date-picker-input"
                    />
                  )}
                  components={{
                    OpenPickerIcon: () => (
                      <img src={caleIcon} alt="calendar-icon" />
                    ),
                  }}
                />
              </LocalizationProvider>
              <div className="dividersss" />
              <div className="q_time_display">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="End Time"
                    className="input_label_section"
                    name="start_tym"
                    id="start_tym"
                    components={{
                      OpenPickerIcon: () => (
                        <img src={TimeIcon} alt="time-icon" />
                      ),
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default CustomDateTime;
