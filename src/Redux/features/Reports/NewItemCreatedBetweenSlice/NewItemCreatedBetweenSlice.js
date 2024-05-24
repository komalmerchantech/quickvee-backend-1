import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BASE_URL,
  NEW_ITEM_CREATED_BETWEEN_LIST,
} from "../../../../Constants/Config";

const initialState = {
  loading: false,
  NewItemData: [],
  successMessage: "",
  error: "",
};

// Generate pening , fulfilled and rejected action type
export const fetchNewItemCreatedBetweenData = createAsyncThunk(
  "NewItemCreatedBetweenList/fetchNewItemCreatedBetweenData.",
  async (data) => {
    const { token, ...dataNew } = data;
    try {
      const response = await axios.post(
        BASE_URL + NEW_ITEM_CREATED_BETWEEN_LIST,
        dataNew,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Use data?.token directly
          },
        }
      );
      if (response.data.status === true) {
        // console.log(response);
        return response.data.report_data;
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const NewItemCreatedBetweenSlice = createSlice({
  name: "NewItemCreatedBetweenList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchNewItemCreatedBetweenData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchNewItemCreatedBetweenData.fulfilled,
      (state, action) => {
        state.loading = false;
        state.NewItemData = action.payload;
        state.error = "";
      }
    );
    builder.addCase(
      fetchNewItemCreatedBetweenData.rejected,
      (state, action) => {
        state.loading = false;
        state.NewItemData = {};
        state.error = action.error.message;
      }
    );
  },
});

export default NewItemCreatedBetweenSlice.reducer;
