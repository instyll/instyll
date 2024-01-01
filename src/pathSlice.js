import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    path: null
};

const pathSlice = createSlice({
    name: 'path',
    initialState, 
    reducers: {
        addPath: (state, action) => {
            state.path.push(action.payload);
        },
        removePath: (state, action) => {
            const id = action.payload;
            state.path = state.path.filter(item => item !== id);
        },
        updatePath: (state, action) => {
            const { id, newValue } = action.payload;
            const pathIndex = state.path.findIndex(item => item === id);

            if (pathIndex !== -1) {
                // If the tag exists, update its value
                state.path[pathIndex] = newValue;
            }
        }
    }
});

export const { addPath, removePath, updatePath } = pathSlice.actions;
export default pathSlice.reducer;