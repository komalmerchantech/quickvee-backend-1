import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, LIST_ALL_ONLINE_STORE_ORDER} from "../../../Constants/Config"

const initialState = {
    loading: false,
    onlineStoreOrderData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchOnlieStoreOrderData = createAsyncThunk('onlineStoreOrder/fetchOnlieStoreOrderData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + LIST_ALL_ONLINE_STORE_ORDER, data, { headers: { "Content-Type": "multipart/form-data" } })
        // console.log(response)
        if (response.data.status === true) {
           return response.data.data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})

const onlineStoreOrderSlice = createSlice({
    name: 'onlineStoreOrder',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchOnlieStoreOrderData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchOnlieStoreOrderData.fulfilled, (state, action) => {
            state.loading = false;
            state.onlineStoreOrderData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchOnlieStoreOrderData.rejected, (state, action) => {
            state.loading = false;
            state.onlineStoreOrderData = {};
            state.error = action.error.message;
        })

    }
})


export default onlineStoreOrderSlice.reducer