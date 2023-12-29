import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { BASE_URL, LIST_ALL_CATEGORIES , DELETE_SINGLE_CATEGORIE} from "../../../Constants/Config"

const initialState = {
    loading: false,
    categoriesData: [],
    successMessage: "",
    error: '',
}


// Generate pening , fulfilled and rejected action type
export const fetchCategoriesData = createAsyncThunk('categories/fetchCategoriesData.', async (data) => {
    try {
        const response = await axios.post(BASE_URL + LIST_ALL_CATEGORIES, data, { headers: { "Content-Type": "multipart/form-data" } })
        if (response.status === 200) {
           return response.data.result
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
})
/* export const addToWishlist = createAsyncThunk('wishlist/addToWishlist', async (data) => {
    try {
        const response = await axios.post(BASE_URL + ADD_TO_WISHLIST, data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        if(response.data.status === 200) {
            return response.data.message;
        }
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});


*/
export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (data) => {

    try {
        const response = await axios.post(BASE_URL + DELETE_SINGLE_CATEGORIE, data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
      if(response){
        console.log(response)
        return {
            categoryId:data.id
        }
      }
        
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});


const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchCategoriesData.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCategoriesData.fulfilled, (state, action) => {
            state.loading = false;
            state.categoriesData = action.payload;
            state.error = '';
        })
        builder.addCase(fetchCategoriesData.rejected, (state, action) => {
            state.loading = false;
            state.categoriesData = {};
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


        builder.addCase(deleteCategory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.successMessage = action.payload.message;
            state.categoriesData = state.categoriesData.filter((item) => item && item.id !== action.payload.categoryId);

            state.error = ''; // Reset the error message
        });
        builder.addCase(deleteCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });


    }
})


export default categoriesSlice.reducer