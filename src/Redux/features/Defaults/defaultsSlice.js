
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, LIST_ALL_Defaults} from "../../../Constants/Config"


const initialState = {
    loading: false,
    defaultsData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchdefaultsData = createAsyncThunk('defaults/fetchdefaultsData.', async () => {
    try {
        const response = await axios.post(BASE_URL + LIST_ALL_Defaults, { headers: { "Content-Type": "multipart/form-data" } })
        if (response.data.status === "Success") {

           return response.data.result
        }else if(response.data.status === "Failed" && response.data.msg === "No. Data found."){
            return response.data
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})
// Generate pening , fulfilled and rejected action type




const defaultsSlice = createSlice({
    name: 'defaults',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchdefaultsData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchdefaultsData.fulfilled, (state, action) => {
            state.loading = false;
            state.defaultsData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchdefaultsData.rejected, (state, action) => {
            state.loading = false;
            state.defaultsData = {};
            state.error = action.error.message;
        })

    }
})


export default defaultsSlice.reducer