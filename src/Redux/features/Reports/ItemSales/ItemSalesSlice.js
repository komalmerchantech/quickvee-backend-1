import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, GET_ITEMWISE_SALE_LIST } from "../../../../Constants/Config";

const initialState = {
    loading: false,
    ItemSalesData: [],
    successMessage: "",
    error: '',
}

// Generate pening , fulfilled and rejected action type
export const fetchItemSalesData = createAsyncThunk('ItemSalesSlice/fetchItemSalesData.', async (data) => {
    const { token, ...dataNew } = data;
    try {
        const response = await axios.post(BASE_URL + GET_ITEMWISE_SALE_LIST, dataNew, { 
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`, // Use data?.token directly
            },
        })
        if (response.data.status === true) {
            // console.log(response.data);
            // return response.data.item_sale_data
            return [response.data.item_sale_data, response.data.net_sale, response.data.total_sold];
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})

const ItemSalesSlice = createSlice({
    name: 'ItemSalesSlice',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchItemSalesData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchItemSalesData.fulfilled, (state, action) => {
            state.loading = false;
            state.ItemSalesData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchItemSalesData.rejected, (state, action) => {
            state.loading = false;
            state.ItemSalesData = {};
            state.error = action.error.message;
        })

    }
})

export default ItemSalesSlice.reducer