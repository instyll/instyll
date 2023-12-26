import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    documents: [
    ],
};

const documentSlice = createSlice({
    name: 'documents',
    initialState, 
    reducers: {
        addDocument: (state, action) => {
            state.documents.push(action.payload);
        },
        removeDocument: (state, action) => {
            const id = action.payload;
            console.log(id)
            // state.documents = state.documents.filter(item => item !== id);
            return {
            ...state,
            documents: [],
            }
        },
        updateDocument: (state, action) => {
            const { id, newValue } = action.payload;
            const docIndex = state.documents.findIndex(item => item === id);

            if (docIndex !== -1) {
                // If the tag exists, update its value
                state.tags[docIndex] = newValue;
            }
        }
    }
});

export const { addDocument, removeDocument, updateDocument, reset } = documentSlice.actions;
export default documentSlice.reducer;