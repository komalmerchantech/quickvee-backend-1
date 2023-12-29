import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, GET_STORE_OPTIONS_DATA } from "../../../Constants/Config";

const initialState = {
    loading: false,
    storeoptionData: [],
    successMessage: "",
    error: '',
}

// Generate pening , fulfilled and rejected action type
export const fetchStoreSettingOptionData = createAsyncThunk('StoreSettingOptionSlice/fetchStoreSettingOptionData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + GET_STORE_OPTIONS_DATA, data, { headers: { "Content-Type": "multipart/form-data" } })
        if (response.status === 200) {
           return response.data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})

const StoreSettingOptionSlice = createSlice({
    name: 'StoreSettingOptionList',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchStoreSettingOptionData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchStoreSettingOptionData.fulfilled, (state, action) => {
            state.loading = false;
            state.storeoptionData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchStoreSettingOptionData.rejected, (state, action) => {
            state.loading = false;
            state.storeoptionData = {};
            state.error = action.error.message;
        })

    }
})


export default StoreSettingOptionSlice.reducer