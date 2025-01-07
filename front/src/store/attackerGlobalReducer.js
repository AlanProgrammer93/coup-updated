import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    attackerGlobal: null,
};

export const attackerGlobalSlice = createSlice({
    name: "attackerGlobal",
    initialState,
    reducers: {
        updateAttackerGlobal(state, action) {
            state.attackerGlobal = action.payload;
        },
    },
});

export const { updateAttackerGlobal } = attackerGlobalSlice.actions;

export default attackerGlobalSlice.reducer;
