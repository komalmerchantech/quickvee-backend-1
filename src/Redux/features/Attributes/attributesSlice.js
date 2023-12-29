import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, LIST_ALL_ATTRIBUTES } from "../../../Constants/Config";

const initialState = {
    loading: false,
    attributesData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchAttributesData = createAsyncThunk('attributes/fetchAttributesData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + LIST_ALL_ATTRIBUTES, data, { headers: { "Content-Type": "multipart/form-data" } })
        if (response.status === 200) {
           return response.data.result
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})




const attributesSlice = createSlice({
    name: 'attributes',
    initialState,
    reducers: {
        editAttribute: (state, action) => {
            state.attributesData = state.attributesData.map(attribute => {
                if (attribute.id === action.payload.id) {

                    return {
                        ...attribute, // Spread syntax to copy existing properties
                        title: action.payload.title, // Update the title
                        old_title: action.payload.title
                    };
                } else {
                    // This isn't the one we're looking for - leave it as is
                    return attribute;
                }
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAttributesData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchAttributesData.fulfilled, (state, action) => {
            state.loading = false;
            state.attributesData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchAttributesData.rejected, (state, action) => {
            state.loading = false;
            state.attributesData = {};
            state.error = action.error.message;
        })

       /* builder.addCase(addToWishlist.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addToWishlist.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload;
            state.error = ''; // Reset the error message
        });
        builder.addCase(addToWishlist.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
*/


    }
})

export const {  editAttribute} = attributesSlice.actions;
export default attributesSlice.reducer