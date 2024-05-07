import React, { useState } from "react";
import { Grid, TextField } from "@mui/material";
import AutoPo from "./AutoPo";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectDropDown from "../../reuseableComponents/SelectDropDown";

const AddPo = () => {
  const [issueDate, setIssueDate] = useState(null);
  const [stockDate, setStockDate] = useState(null);
  const [inputType, setInputType] = useState('text');
  const temarray = [
    {
      title: "gfgk",
      name: "priya"
    },
  ];

  const handleInputChange = (event) => {
    const { value } = event.target;
    // If there's text entered, change the input type to text
    setInputType(value.trim() !== '' ? 'text' : 'text');
  };

  const handleVendorClick = () => {
    console.log("hello");
  };
  const handleIssueDateChange = (date) => {
    setIssueDate(date);
  };

  const handleStockDateChange = (date) => {
    setStockDate(date);
  };



  return (
    <>
      <div className="box">
        <div className="box_shadow_div" style={{ height: "300px" }}>
          <div className="q-add-categories-section-header">
            <span>
              <span>Create Purchase Order</span>
            </span>
          </div>

          <div className="mb-6"></div>
          <div className="px-6">
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <label>vendor</label>
                <SelectDropDown
                  heading={null}
                  listItem={temarray}
                  onClickHandler={handleVendorClick}
                />
              </Grid>
              <Grid item xs={4}>
                <label>Issued Date</label>

                <TextField fullWidth />
              </Grid>
              <Grid item xs={4}>
                <label>Stock Due</label>

                <TextField fullWidth />
              </Grid>
              <Grid item xs={6}>
                <label>Reference</label>
                <TextField fullWidth />
              </Grid>
              <Grid item xs={6}>
                <label>Reference</label>
                <TextField
                  fullWidth
                  type={inputType}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <div className="">
        <AutoPo />
      </div>
    </>
  );
};

export default AddPo;
