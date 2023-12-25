import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import { fetchDataFromApi } from "../utils/api";

const initialState = {
    subCategories: [],
    subCategoriesStatus: STATUS.IDLE
}

const subCategorySlice = createSlice({
    name: "subCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAsyncSubCategories.pending, (state, action) => {
            state.subCategoriesStatus = STATUS.LOADING;
        })

        .addCase(fetchAsyncSubCategories.fulfilled, (state, action) => {
            state.subCategories = action.payload;
            state.subCategoriesStatus = STATUS.SUCCEEDED;
        })
        
        .addCase(fetchAsyncSubCategories.rejected, (state, action) => {
            state.subCategoriesStatus = STATUS.FAILED
        })
    }
});

export const fetchAsyncSubCategories = createAsyncThunk('subCategories/fetch', async() => {
    const response = await fetchDataFromApi("/subCategories/getAllSubCategories");
    return response.data;
});

export const getAllSubCategories = (state) => state.subCategory.subCategories;

export default subCategorySlice.reducer;
