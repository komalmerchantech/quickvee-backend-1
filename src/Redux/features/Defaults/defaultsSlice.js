
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, LIST_ALL_Defaults , DELETE_SINGLE_DEFAULTS, DELETE_MULTI_DEFAULTS} from "../../../Constants/Config"


const initialState = {
    loading: false,
    defaultsData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchdefaultsData = createAsyncThunk('defaults/fetchdefaultsData', async () => {
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


export const deleteDefaultsData = createAsyncThunk('defaults/deleteDefaultsData', async (data) => {

    try {
        const response = await axios.post(BASE_URL + DELETE_SINGLE_DEFAULTS, data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
      if(response){
        console.log(response)
        return {
            defaultsId:data.id
        }
      }
        
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});


// for multiple delete default menu start 
export const deleteDefaultsMultiData = createAsyncThunk('defaults/deleteDefaultsMultiData', async (data) => {

    try {
        const response = await axios.post(BASE_URL + DELETE_MULTI_DEFAULTS, data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
      if(response){
        console.log(response)
        return {
            defaultsId:data.id
        }
      }
        
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});




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


        builder.addCase(deleteDefaultsData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteDefaultsData.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;
            state.defaultsData = state.defaultsData.filter((item) => item && item.id !== action.payload.categoryId);

            state.error = ''; // Reset the error message
        });
        builder.addCase(deleteDefaultsData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        // for multiple delete 
        builder.addCase(deleteDefaultsMultiData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteDefaultsMultiData.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;
            state.defaultsData = state.defaultsData.filter((item) => item && item.id !== action.payload.categoryId);

            state.error = ''; // Reset the error message
        });
        builder.addCase(deleteDefaultsMultiData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

    }
})


export default defaultsSlice.reducer