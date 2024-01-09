import React, { useState } from 'react';
import DateRange from '../../Orders/InstoreOrder/DateRange'
import CheckIDVerifyList from './CheckIDVerifyList'

const CheckIDVerifyMain = () => {

    const [selectedDateRange, setSelectedDateRange] = useState(null);
    const handleDateRangeChange = (dateRange) => {
        setSelectedDateRange(dateRange);
    };

    return (
        <>
            <div className="q-attributes-main-page">
                <DateRange 
                    onDateRangeChange={handleDateRangeChange}
                />
            </div>
            <div className='mt-10'>
                <div className="q-attributes-main-page">
                    <CheckIDVerifyList 
                        selectedDateRange={selectedDateRange} 
                    />
                </div>
            </div>
        </>
    )
}

export default CheckIDVerifyMain