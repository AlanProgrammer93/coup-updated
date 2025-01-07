import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    attacker: null,
};

export const attackerSlice = createSlice({
    name: "attacker",
    initialState,
    reducers: {
        updateAttacker(state, action) {
            state.attacker = action.payload;
        },
    },
});

export const { updateAttacker } = attackerSlice.actions;

export default attackerSlice.reducer;
