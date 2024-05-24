import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchCheckIDVerifyData } from "../../../Redux/features/Reports/CheckIDVerify/CheckIDVerifySlice";
import { useAuthDetails } from "../../../Common/cookiesHelper";

const CheckIDVerifyList = (props) => {
    const { LoginGetDashBoardRecordJson, LoginAllStore, userTypeData } =
    useAuthDetails();
    const dispatch = useDispatch();
    const [allCheckIDVerifyData, setallCheckIDVerifyData] = useState("");
    const AllCheckIDVerifyDataState = useSelector((state) => state.CheckIDVerifyList);

    let AuthDecryptDataDashBoardJSONFormat = LoginGetDashBoardRecordJson;
    const merchant_id = AuthDecryptDataDashBoardJSONFormat?.data?.merchant_id;

    useEffect(() => {
        if (props && props.selectedDateRange) 
        {
            let data = {
                merchant_id: merchant_id,
                start_date: props.selectedDateRange.start_date,
                end_date: props.selectedDateRange.end_date,
                order_typ: props.OrderTypeData,
                order_env: props.OrderSourceData,
                token_id: userTypeData?.token_id,
                login_type: userTypeData?.login_type,
                ...userTypeData,
            };
            if (data) {
                dispatch(fetchCheckIDVerifyData(data));
            }

        }
    }, [props]);

    useEffect(() => {
        if (!AllCheckIDVerifyDataState.loading && AllCheckIDVerifyDataState.CheckIDVerifyData)
        {
            console.log(AllCheckIDVerifyDataState.CheckIDVerifyData)
            setallCheckIDVerifyData(AllCheckIDVerifyDataState.CheckIDVerifyData );
        }
        else
        {
            setallCheckIDVerifyData("");
        }
    }, [
        AllCheckIDVerifyDataState,
        AllCheckIDVerifyDataState.loading,
        AllCheckIDVerifyDataState.CheckIDVerifyData,
    ]);

    return (
        <>
        <div className="box">
            <div className="q-daily-report-bottom-report-header">
                <p className="report-sort">Date</p>
                <p className="report-sort">Time</p>
                <p className="report-sort">Employee</p>
                <p className="report-sort">Order ID</p>
                <p className="report-sort">Item Name</p>
            </div>
            </div>

            {allCheckIDVerifyData && allCheckIDVerifyData.length >= 1 && allCheckIDVerifyData.map((CheckData, index) => (
                <div className="box">
                <div key={index} className="q-category-bottom-categories-listing" style={{borderRadius:"unset"}}>
                    <div className="q-category-bottom-categories-single-category">
                        <p className="report-title">{CheckData.merchant_date}</p>
                        <p className="report-title">{CheckData.merchant_time}</p>
                        <p className="report-title">{CheckData.full_name}</p>
                        <p className="report-title">{CheckData.order_id}</p>
                        <p className="report-title">{CheckData.name}</p>
                    </div>
                </div>
                </div>
                
            ))}
        </>
    );
};

export default CheckIDVerifyList;