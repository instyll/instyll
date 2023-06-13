/**
 * @author wou
 */
import { configureStore } from "@reduxjs/toolkit";
import tagsReducer from './tagSlice';
import imageReducer from './imageSlice';

const store = configureStore({
    reducer: {
        /* reducer for topic state */
        tags: tagsReducer,
        
        /* reducer for dashboard background image state */
        image: imageReducer,
    },
});

export default store;
