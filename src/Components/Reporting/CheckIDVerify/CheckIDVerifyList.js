import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchCheckIDVerifyData } from "../../../Redux/features/Reports/CheckIDVerify/CheckIDVerifySlice";

const CheckIDVerifyList = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (props && props.selectedDateRange) 
        {
            const StartDateData = props.selectedDateRange.startDate.toLocaleDateString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
    
            const EndDateData = props.selectedDateRange.endDate.toLocaleDateString('en-GB', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
            console.log(StartDateData);
            console.log(EndDateData);

            let data = {
                merchant_id: "MAL0100CA",
                start_date: StartDateData,
                end_date: EndDateData,
                order_typ: "both",
                order_env: "1",
            };
            if (data) {
                dispatch(fetchCheckIDVerifyData(data));
            }

        }
    }, [props]);
    const [allCheckIDVerifyData, setallCheckIDVerifyData] = useState();
    const AllCheckIDVerifyDataState = useSelector((state) => state.CheckIDVerifyList);

    useEffect(() => {
        if (!AllCheckIDVerifyDataState.loading && AllCheckIDVerifyDataState.CheckIDVerifyData)
        {
            console.log(AllCheckIDVerifyDataState.CheckIDVerifyData)
            setallCheckIDVerifyData(AllCheckIDVerifyDataState.CheckIDVerifyData );
        }
    }, [
        AllCheckIDVerifyDataState,
        AllCheckIDVerifyDataState.loading,
        AllCheckIDVerifyDataState.CheckIDVerifyData,
    ]);

    return (
        <>
            <div className="q-daily-report-bottom-report-header">
                <p className="report-sort">Date</p>
                <p className="report-sort">Time</p>
                <p className="report-sort">Employee</p>
                <p className="report-sort">Order ID</p>
                <p className="report-sort">Item Name</p>
            </div>

            {allCheckIDVerifyData && allCheckIDVerifyData.length >= 1 && allCheckIDVerifyData.map((CheckData, index) => (
                <div key={index} className="q-category-bottom-categories-listing">
                    <div className="q-category-bottom-categories-single-category">
                        <p className="report-title">{CheckData.merchant_date}</p>
                        <p className="report-title">{CheckData.merchant_time}</p>
                        <p className="report-title">{CheckData.full_name}</p>
                        <p className="report-title">{CheckData.order_id}</p>
                        <p className="report-title">{CheckData.name}</p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default CheckIDVerifyList;

