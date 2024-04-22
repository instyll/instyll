import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
// import fs from 'fs'; 
import fs from 'fs/promises';
import path from 'path'; 

const initialState = {
    bookmarks: [
    ],
};

// document object: [DocumentID, DocumentTitle, DateCreated, DocumentPath, topics: []]

const bookmarkSlice = createSlice({
    name: 'bookmarks',
    initialState, 
    reducers: {
        addBookmark: (state, action) => {
            const documentObject = action.payload;
            console.log(documentObject)
            state.bookmarks.push(documentObject);

        },
        removeBookmark: (state, action) => {
            const documentObject = action.payload;
            const documentPath = documentObject[0];
            state.bookmarks = state.bookmarks.filter(item => item[3] !== documentPath);
            // also remove file from directory
            try {
                fs.unlink(documentPath);
                console.log(`File deleted: ${documentPath}`);
            } catch (error) {
                console.error(`Error deleting file ${documentPath}:`, error);
            }
        },
        removeFromBookmarkView: (state, action) => {
            const documentObject = action.payload;
            const documentPath = documentObject[3];
            state.bookmarks = state.bookmarks.filter(item => item[3] !== documentPath);
            console.log(documentObject)
        },
    },
});

export const { addBookmark, removeBookmark, removeFromBookmarkView } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;