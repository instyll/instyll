/**
 * @author wou
 */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import tagsReducer from './tagSlice';
import zapReducer from './zapSlice';
import documentReducer from './documentSlice'
import bookmarkReducer from "./bookmarkSlice";
import pathReducer from './pathSlice';
import themeReducer from './themeSlice';

const persistConfig = {
  key: "root",
  storage,  
};

const rootReducer = combineReducers({
   tags: tagsReducer,
   zaps: zapReducer,
   documents: documentReducer,
   bookmarks: bookmarkReducer,
   path: pathReducer,
   theme: themeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// document object: [DocumentID, DocumentTitle, DateCreated, DocumentPath, topics: []]

export const store = configureStore({
    // reducer: {
    //     /* reducer for topic state */
    //     tags: tagsReducer,
        
    //     /* reducer for dashboard background image state */
    //     image: imageReducer,
    // },
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export { persistor };
