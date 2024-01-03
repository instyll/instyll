import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import fs from 'fs'; 
import path from 'path'; 

const initialState = {
    documents: [
    ],
};

// document object: [DocumentID, DocumentTitle, DateCreated, DocumentPath, topics: []]

const documentSlice = createSlice({
    name: 'documents',
    initialState, 
    reducers: {
        addDocument: (state, action) => {
            state.documents.push(action.payload);
            const documentObject = action.payload;
            state.documents.push(documentObject);

        },
        removeDocument: (state, action) => {
            const documentObject = action.payload;
            const documentId = documentObject[0];
            console.log(documentId)
            // state.documents = state.documents.filter(item => item !== id);
            state.documents = state.documents.filter(item => item[0] !== documentId);
        },
        updateDocument: (state, action) => {
            const { id, newValue } = action.payload;
            const docIndex = state.documents.findIndex(item => item[0] === id);
            console.log(docIndex)
            if (docIndex !== -1) {
                // If the tag exists, update its value
                state.documents[docIndex][1] = newValue;
            }
        }
    },
});

export const { addDocument, removeDocument, updateDocument, reset } = documentSlice.actions;
export default documentSlice.reducer;