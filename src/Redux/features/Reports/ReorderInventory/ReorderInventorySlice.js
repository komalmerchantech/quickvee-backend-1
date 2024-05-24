import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, GET_REORDER_INVENTORY_LIST } from "../../../../Constants/Config";

const initialState = {
    loading: false,
    ReorderData: [],
    successMessage: "",
    error: '',
}

// Generate pening , fulfilled and rejected action type
export const fetchReorderInventoryData = createAsyncThunk('ReorderInventoryList/fetchReorderInventoryData.', async (data) => {
    const { token, ...dataNew } = data;
    try {
        const response = await axios.post(BASE_URL + GET_REORDER_INVENTORY_LIST, dataNew, { 
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`, // Use data?.token directly
            },
        })
        if (response.data.status === true) {
            // console.log(response);
            return response.data.reorder_array
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})

const ReorderInventorySlice = createSlice({
    name: 'ReorderInventoryList',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchReorderInventoryData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchReorderInventoryData.fulfilled, (state, action) => {
            state.loading = false;
            state.ReorderData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchReorderInventoryData.rejected, (state, action) => {
            state.loading = false;
            state.ReorderData = {};
            state.error = action.error.message;
        })

    }
})

export default ReorderInventorySlice.reducer