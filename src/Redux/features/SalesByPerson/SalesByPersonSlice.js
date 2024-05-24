import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, REPORT_BY_SALES_PERSON } from '../../../Constants/Config';

const initialState = {
  loading: false,
  SalePersonData: [],
  successMessage: "",
  error: '',
}

// Generate pening , fulfilled and rejected action type
export const fetchSalePersonData = createAsyncThunk('SalesByPersonSlice/fetchSalePersonData.', async (data) => {
  const { token, ...dataNew } = data;
  try {
    const response = await axios.post(BASE_URL + REPORT_BY_SALES_PERSON, dataNew, { 
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Use data?.token directly
      },
    })
    if (response.data.status === true) {
      // console.log(response.data);
      return response.data.report_data
    }
  } catch (error) {
    throw new Error(error.response.data.message);
  }
})

const SalesByPersonSlice = createSlice({
  name: 'SalesByPersonSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSalePersonData.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchSalePersonData.fulfilled, (state, action) => {
      state.loading = false;
      state.SalePersonData = action.payload;
      state.error = '';
    })
    builder.addCase(fetchSalePersonData.rejected, (state, action) => {
      state.loading = false;
      state.SalePersonData = {};
      state.error = action.error.message;
    })
  }
})

export default SalesByPersonSlice.reducer
