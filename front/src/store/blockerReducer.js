import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blocker: null,
};

export const blockerSlice = createSlice({
    name: "blocker",
    initialState,
    reducers: {
        updateBlocker(state, action) {
            state.blocker = action.payload;
        },
    },
});

export const { updateBlocker } = blockerSlice.actions;

export default blockerSlice.reducer;
