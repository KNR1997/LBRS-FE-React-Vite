import { combineReducers } from 'redux';
import userReducer from "./subCategorySlice";
import userRecordSlice from "./userRecordSlice";

const rootReducer = combineReducers({
    subCategory: userReducer,
    userRecord: userRecordSlice
});

export default rootReducer;