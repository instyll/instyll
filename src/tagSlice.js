import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tags: [
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
        },
        updateTag: (state, action) => {
            const { id, newValue } = action.payload;
            const tagIndex = state.tags.findIndex(item => item === id);

            if (tagIndex !== -1) {
                // If the tag exists, update its value
                state.tags[tagIndex] = newValue;
            }
        }
    }
});

export const { addTag, removeTag, updateTag } = tagsSlice.actions;
export default tagsSlice.reducer;