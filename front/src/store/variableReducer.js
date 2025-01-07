import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    variables: null,
};

export const variablesSlice = createSlice({
    name: "variables",
    initialState,
    reducers: {
        updateVariables(state, action) {
            state.variables = action.payload;
        },
    },
});

export const { updateVariables } = variablesSlice.actions;

export default variablesSlice.reducer;
