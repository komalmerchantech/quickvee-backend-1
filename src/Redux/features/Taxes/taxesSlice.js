import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, LIST_ALL_TAXES , DELETE_SINGLE_TAXE} from "../../../Constants/Config"

const initialState = {
    loading: false,
    taxesData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchtaxesData = createAsyncThunk('taxes/fetchtaxesData', async (data) => {
    try {
        const response = await axios.post(BASE_URL + LIST_ALL_TAXES, data, { headers: { "Content-Type": "multipart/form-data" } })

        if (response.data.status === "Success") {
           return response.data.result
        }
    } catch (error) {
        throw new Error(error.response.data.msg);
    }
})

export const deleteTax = createAsyncThunk('taxes/deleteTax', async (data) => {

    try {
        const response = await axios.post(BASE_URL + DELETE_SINGLE_TAXE, data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
      if(response){
        console.log(response)
        return {
            id:data.id
        }
      }
        
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});


const taxesSlice = createSlice({
    name: 'taxes',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchtaxesData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchtaxesData.fulfilled, (state, action) => {
            state.loading = false;
            state.taxesData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchtaxesData.rejected, (state, action) => {
            state.loading = false;
            state.taxesData = {};
            state.error = action.error.message;
        })


        
        builder.addCase(deleteTax.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteTax.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;
            state.taxesData = state.taxesData.filter((item) => item && item.id !== action.payload.id);
            state.error = ''; // Reset the error message
        });
        builder.addCase(deleteTax.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });



    }
})


export default taxesSlice.reducer