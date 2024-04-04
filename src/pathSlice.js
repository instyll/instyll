import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    path: ''
};

const pathSlice = createSlice({
    name: 'path',
    initialState, 
    reducers: {
        addPath: (state, action) => {
            return {
                ...state,
                path: action.payload,
              }
        },
        removePath: (state, action) => {
            const id = action.payload;
            state.path = state.path.filter(item => item !== id);
        },
        updatePath: (state, action) => {
            const newValue = action.payload;
            console.log(newValue)

                return {
                    ...state,
                    path: newValue
                }
            
        }
    }
});

export const { addPath, removePath, updatePath } = pathSlice.actions;
export default pathSlice.reducer;