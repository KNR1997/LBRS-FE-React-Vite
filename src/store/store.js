import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./subCategorySlice";

const store = configureStore({
    reducer: {
        subCategory: userReducer
    }
});

export default store;