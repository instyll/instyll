import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    zaps: [
    ],
};

const zapSlice = createSlice({
    name: 'zaps',
    initialState, 
    reducers: {
        addZap: (state, action) => {
            state.zaps.push(action.payload);
        },
        removeZap: (state, action) => {
            const id = action.payload;
            state.zaps = state.zaps.filter(item => item !== id);
        },
        updateZap: (state, action) => {
            const { id, newValue } = action.payload;
            const zapIndex = state.zaps.findIndex(item => item === id);

            if (zapIndex !== -1) {
                // If the tag exists, update its value
                state.zaps[zapIndex] = newValue;
            }
        }
    }
});

export const { addZap, removeZap, updateZap } = zapSlice.actions;
export default zapSlice.reducer;