import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
// import fs from 'fs'; 
import fs from 'fs/promises';
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
            const documentPath = documentObject[0];
            state.documents = state.documents.filter(item => item[3] !== documentPath);
            // also remove file from directory
            try {
                fs.unlink(documentPath);
                console.log(`File deleted: ${documentPath}`);
            } catch (error) {
                console.error(`Error deleting file ${documentPath}:`, error);
            }
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