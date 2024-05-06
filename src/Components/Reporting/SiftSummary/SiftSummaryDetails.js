import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchshiftsummaryData } from "../../../Redux/features/Reports/ShiftSummary/ShiftSummarySlice";

const SiftSummaryDetails = (props) => {
  const dispatch = useDispatch();
  const [allshiftsummary, setAllShiftSummary] = useState([]);
  const allshiftsummaryDataState = useSelector(
    (state) => state.ShiftSummarylist
  );

  useEffect(() => {
    if (props && props.selectedDateRange) {
      let data = {
        merchant_id: "MAL0100CA",
        start_date: props.selectedDateRange.start_date,
        end_date: props.selectedDateRange.end_date,
        shift_assign: props.SelectEmpListData,
      };
      if (data) {
        dispatch(fetchshiftsummaryData(data));
      }
    }
  }, [props]);

  useEffect(() => {
    if (
      !allshiftsummaryDataState?.loading &&
      allshiftsummaryDataState?.shiftsummaryData
    ) {
      setAllShiftSummary(allshiftsummaryDataState.shiftsummaryData);
    }
  }, [allshiftsummaryDataState]);
  console.log(allshiftsummary);

  return (
    <>
      <div className="box">
        <table className="table_custome">
            <thead className="table__header_div">
              <tr className="table__header">
                <th>Cashier/Station Name</th>
                <th>Open Time</th>
                <th>Close Time</th>
                <th>Open Drawer ($)</th>
                <th>Total Sale ($)</th>
                <th>Total Refund ($)</th>
                <th>Total Tip ($)</th>
                <th>Total Vendor Payout ($)</th>
                <th>Cash Drop ($)</th>
                <th>Total Cash Sale ($)</th>
                <th>Total Debit+Credit Sale ($)</th>
                <th>Expected Cash ($)</th>
                <th>Drawer Over/Short ($)</th>
                <th>Actual Cash Deposited ($)</th>
              </tr>
            </thead>
            <tbody>
                      {/* <tr className="table__body">
                        <td>John Smith</td>
                        <td>04-25-2024 11:34:46 AM</td>
                        <td>4-29-2024 12:21:32 PM</td>
                        <td>0.00</td>
                        <td>361.90</td>
                        <td>361.90</td>
                        <td>0.00</td>
                        <td>0.00</td>
                        <td>0.00</td>
                        <td>361.90</td>
                        <td>0.00</td>
                        <td>561.90</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>

                      <tr className="table__body">
                        <td>John Smith</td>
                        <td>04-25-2024 11:34:46 AM</td>
                        <td>4-29-2024 12:21:32 PM</td>
                        <td>0.00</td>
                        <td>361.90</td>
                        <td>361.90</td>
                        <td>0.00</td>
                        <td>0.00</td>
                        <td>0.00</td>
                        <td>361.90</td>
                        <td>0.00</td>
                        <td>561.90</td>
                        <td>-</td>
                        <td>-</td>
                      </tr> */}

                      {Object.keys(allshiftsummary).map((date) => (
                        <div key={date}>
                          {allshiftsummary[date] &&
                            allshiftsummary[date].length >= 1 &&
                            allshiftsummary[date].map((shift, index) => (
                              <div key={index} >
                                {shift.map((shiftDetail, shiftIndex) => (
                                  <tr key={shiftIndex} className="table__body">
                                    <td >{shiftDetail.device_name}</td>
                                    <td >{shiftDetail.in_time}</td>
                                    <td >{shiftDetail.out_time}</td>
                                    <td >{shiftDetail.drawer_cash}</td>
                                    <td >{shiftDetail.expected_amt}</td>
                                    <td >{shiftDetail.actual_amt}</td>
                                    <td >{shiftDetail.drop_cash}</td>
                                    <td >{shiftDetail.shift_type}</td>
                                    <td >{shiftDetail.total_refund}</td>
                                    <td >{shiftDetail.total_vendor_payout}</td>
                                    <td >{shiftDetail.total_sale}</td>
                                    <td >{shiftDetail.refunds}</td>
                                    <td >{shiftDetail.tip}</td>
                                    <td >{shiftDetail.card_collected_wr}</td>
                                    <td >{shiftDetail.cash_collected_wr}</td>
                                    <td >{shiftDetail.cash_drop}</td>
                                  </tr>
                                ))}
                              </div>
                            ))}
                        </div>
                      ))}
            </tbody>
        </table>
        {/* <div className="q-daily-report-bottom-report-header">
          <p className="report-sort">Cashier/Station Name</p>
          <p className="report-sort">Open Time</p>
          <p className="report-sort">Close Time</p>
          <p className="report-sort">Open Drawer ($)</p>
          <p className="report-sort">Total Sale ($)</p>
          <p className="report-sort">Total Refund ($)</p>
          <p className="report-sort">Total Tip ($)</p>
          <p className="report-sort">Total Vendor Payout ($)</p>
          <p className="report-sort">Cash Drop ($)</p>
          <p className="report-sort">Total Cash Sale ($)</p>
          <p className="report-sort">Total Debit+Credit Sale ($)</p>
          <p className="report-sort">Expected Cash ($)</p>
          <p className="report-sort">Drawer Over/Short ($)</p>
          <p className="report-sort">Actual Cash Deposited ($)</p>
        </div>
        <div>
          {Object.keys(allshiftsummary).map((date) => (
            <div key={date}>
              
              {allshiftsummary[date] &&
                allshiftsummary[date].length >= 1 &&
                allshiftsummary[date].map((shift, index) => (
                  <div key={index} className="q-category-bottom-categories-listing">
                    {shift.map((shiftDetail, shiftIndex) => (
                      <div key={shiftIndex} className="q-category-bottom-categories-single-category">
                         <p className="report-sort">{shiftDetail.device_name}</p>
                         <p className="report-sort">{shiftDetail.in_time}</p>
                         <p className="report-sort">{shiftDetail.out_time}</p>
                     <p className="report-sort">{shiftDetail.drawer_cash}</p>
                        <p className="report-sort">{shiftDetail.expected_amt}</p>
                        <p className="report-sort">{shiftDetail.actual_amt}</p>
                        <p className="report-sort">{shiftDetail.drop_cash}</p>
                       
                      
                        <p className="report-sort">{shiftDetail.shift_type}</p>
                      
                        <p className="report-sort">
                          {shiftDetail.total_refund}
                        </p>
                        
                        <p className="report-sort">
                          {shiftDetail.total_vendor_payout}
                        </p>
                        <p className="report-sort">{shiftDetail.total_sale}</p>
                        <p className="report-sort">
                          {shiftDetail.refunds}
                        </p>
                        <p className="report-sort">
                          {shiftDetail.tip}
                        </p>
                        <p className="report-sort">
                          {shiftDetail.card_collected_wr}
                        </p>
                        <p className="report-sort">
                          {shiftDetail.cash_collected_wr}
                        </p>
                        <p className="report-sort">
                          {shiftDetail.cash_drop}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default SiftSummaryDetails;


