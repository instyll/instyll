import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
// import fs from 'fs'; 
import fs from 'fs/promises';
import path from 'path'; 
import { stat } from 'fs';

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
            const documentObject = action.payload;
            const documentPath = documentObject[0]
            console.log(documentPath)
            const newValue = documentObject[2]
            const originPath = documentObject[1]
            const docIndex = state.documents.findIndex(item => item[3] === documentPath);
            console.log(docIndex)
            if (docIndex !== -1) {
                // If the doc exists, update its filename
                state.documents[docIndex] = [
                    ...state.documents[docIndex].slice(0, 1), 
                    newValue,
                    state.documents[docIndex][2],
                    path.join(originPath, `${newValue}.md`)
                ];
                try {
                    fs.rename(documentPath, path.join(originPath, `${newValue}.md`))
                } catch (error) {
                    console.error(`Error updating document file ${documentPath}:`, error)
                }
            }
        }
    },
});

export const { addDocument, removeDocument, updateDocument, reset } = documentSlice.actions;
export default documentSlice.reducer;