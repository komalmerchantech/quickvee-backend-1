import * as React from 'react';


import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import './StaticDatePickerLandscape.css'; // Importing the custom CSS file

export default function Calendar() {
  return (
    <>
      <div className="flex justify-center items-center">
      <div className="">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar className="text-[40px] w-[400px] text-black" />
        </LocalizationProvider>
      </div>
    </div>
      <div className="">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer className="p-8 border border-gray-300 rounded-md daterange_section" components={['DateRangePicker']}>
          <DateRangePicker localeText={{ start: 'Start Date', end: 'End Date' }} />
        </DemoContainer>
      </LocalizationProvider>
    </div>
    </>
  );
}
