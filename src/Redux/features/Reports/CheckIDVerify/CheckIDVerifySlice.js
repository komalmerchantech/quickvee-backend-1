import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, CHECKID_VARIFICATION_REPORT_LIST } from "../../../../Constants/Config";

const initialState = {
    loading: false,
    CheckIDVerifyData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchCheckIDVerifyData = createAsyncThunk('CheckIDVerifySlice/fetchCheckIDVerifyData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + CHECKID_VARIFICATION_REPORT_LIST, data, { headers: { "Content-Type": "multipart/form-data" } })
        if (response.data.status === true) {
            // console.log(response);
           return response.data.order_data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})

const CheckIDVerifySlice = createSlice({
    name: 'StoreSettingAlertsList',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCheckIDVerifyData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCheckIDVerifyData.fulfilled, (state, action) => {
            state.loading = false;
            state.CheckIDVerifyData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchCheckIDVerifyData.rejected, (state, action) => {
            state.loading = false;
            state.CheckIDVerifyData = {};
            state.error = action.error.message;
        })

    }
})

export default CheckIDVerifySlice.reducer