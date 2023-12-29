import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, LIST_ALL_IN_STORE_ORDER} from "../../../Constants/Config"

const initialState = {
    loading: false,
    inStoreOrderData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchInStoreOrderData = createAsyncThunk('inStoreOrder/fetchInStoreOrderData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + LIST_ALL_IN_STORE_ORDER, data, { headers: { "Content-Type": "multipart/form-data" } })
        // console.log(response)
        if (response.data.status === true) {
           return response.data.data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})

const inStoreOrderSlice = createSlice({
    name: 'inStoreOrder',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchInStoreOrderData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchInStoreOrderData.fulfilled, (state, action) => {
            state.loading = false;
            state.inStoreOrderData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchInStoreOrderData.rejected, (state, action) => {
            state.loading = false;
            state.inStoreOrderData = {};
            state.error = action.error.message;
        })

    }
})


export default inStoreOrderSlice.reducer