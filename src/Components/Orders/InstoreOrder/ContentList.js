import { Grid } from "@mui/material";
import React from "react";
import { BsDot } from "react-icons/bs";

const ContentList = () => {
  return (
    <Grid container className="">
      <Grid item xs={12} className="q-category-top-detail-section ">
     
          <li>In order to use the Quickvee app one Category is required.</li>
          <li>
            If you make changes to the Category, the Category status will be
            pending until the admin approves it.
          </li>
          <li>
            After you've made changes to your menu, select the option "Click
            Here To Send For Approval To Admin" to get admin approval to update
            your website.
          </li>
      
      </Grid>
    </Grid>
  );
};

export default ContentList;
