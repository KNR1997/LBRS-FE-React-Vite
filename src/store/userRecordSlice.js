import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userRecord: {
        id: null,
        userID: null,
        likeSubCategories: [],
        tour: null,
        timeStamp: null
    }
}

const userRecordSlice = createSlice({
    name: "userRecord",
    initialState,
    reducers: {
        setUserRecord(state, action) {
            state.userRecord = action.payload;
        },
        setLikeSubCategories(state, action) {
            state.userRecord.likeSubCategories = action.payload;
        }
    }
});

export const getUserRecord = (state) => state.userRecord.userRecord;

export const {setUserRecord, setLikeSubCategories} = userRecordSlice.actions;

export default userRecordSlice.reducer;
