import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./subCategorySlice";
import userRecordSlice from "./userRecordSlice";

const store = configureStore({
    reducer: {
        subCategory: userReducer,
        userRecord: userRecordSlice
    }
});

export default store;