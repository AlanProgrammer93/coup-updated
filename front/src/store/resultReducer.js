import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    result: null,
};

export const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers: {
        updateResult(state, action) {
            state.result = action.payload;
        },
    },
});

export const { updateResult } = resultSlice.actions;

export default resultSlice.reducer;