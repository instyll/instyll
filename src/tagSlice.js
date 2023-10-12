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
        },
        removeTag: (state, action) => {
            const id = action.payload;
            state.tags = state.tags.filter(item => item !== id);
        }
    }
});

export const { addTag, removeTag } = tagsSlice.actions;
export default tagsSlice.reducer;