import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  DETAIL_CATEGORY_SALE_REPORT,
} from "../../../Constants/Config";

const initialState = {
  loading: false,
  detailCategorySaleData: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type

export const fetchdetailCategorySaleData = createAsyncThunk("detailCategorySale/fetchdetailCategorySaleData", async (data) => {
    try {
      const response = await axios.post(
        BASE_URL + DETAIL_CATEGORY_SALE_REPORT,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.status === true) {
        const categoryList = Object.keys(response.data.report_data);
        const reportData = response.data.report_data;
        return { categoryList, reportData };
      } else if (
        response.data.status === false &&
        response.data.message === "No data found"
      ) {
        // If 'report_data' is null, return an empty array and object
        return { categoryList: [], reportData: {} };
      } else {
        // Handle other error scenarios here if needed
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Generate pening , fulfilled and rejected action type

const detailCategorySaleSlice = createSlice({
  name: "detailCategorySale",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchdetailCategorySaleData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchdetailCategorySaleData.fulfilled, (state, action) => {
      state.loading = false;
      state.detailCategorySaleData = action.payload.reportData;
      state.categoryList = action.payload.categoryList;
      state.error = "";
    });
    builder.addCase(fetchdetailCategorySaleData.rejected, (state, action) => {
      state.loading = false;
      state.detailCategorySaleData = {};
      state.error = action.error.message;
    });
  },
});

export default detailCategorySaleSlice.reducer;
