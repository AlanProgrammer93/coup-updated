import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    descart: null,
};

export const descartSlice = createSlice({
    name: "descart",
    initialState,
    reducers: {
        updateDescart(state, action) {
            state.descart = action.payload;
        },
    },
});

export const { updateDescart } = descartSlice.actions;

export default descartSlice.reducer;
