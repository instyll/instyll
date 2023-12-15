/**
 * @author wou
 */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import tagsReducer from './tagSlice';
import imageReducer from './imageSlice';
import userReducer from './userSlice';
import zapReducer from './zapSlice';

const persistConfig = {
  key: "root",
  storage,  
};

const rootReducer = combineReducers({
   tags: tagsReducer,
   image: imageReducer, 
   user: userReducer,
   zaps: zapReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    // reducer: {
    //     /* reducer for topic state */
    //     tags: tagsReducer,
        
    //     /* reducer for dashboard background image state */
    //     image: imageReducer,
    // },
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
