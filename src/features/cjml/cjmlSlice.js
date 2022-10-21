import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    party: null,
    asset: {
        name: "name",
        description: "description",
        value: 0
    },
    offCanvasVisible: false

}

export const cjmlSlice = createSlice({
    name:  "cjml",
    initialState,
    reducers: {
        setParty: (state,action) => {
            state.party = action.payload;
        },
        setAsset: (state,action) => {
            state.asset = action.payload;
        },
        toggleOffCanvas: (state, action) => {
            state.offCanvasVisible = !(state.offCanvasVisible)
        }
    }
});

export const { setAsset, setParty, toggleOffCanvas } = cjmlSlice.actions;
export default cjmlSlice.reducer;