import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tags: [
        'math',
        'physics',
        'marketing',
        'english',
        'daily notes',
        'projects',
    ],
};

const tagsSlice = createSlice({
    name: 'tags',
    initialState, 
    reducers: {
        addTag: (state, action) => {
            state.tags.push(action.payload);
        }
    }
});

export const { addTag } = tagsSlice.actions;
export default tagsSlice.reducer;