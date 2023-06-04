import { configureStore } from "@reduxjs/toolkit";
import tagsReducer from './tagSlice';
import imageReducer from './imageSlice';

const store = configureStore({
    reducer: {
        tags: tagsReducer,
        image: imageReducer,
    },
});

export default store;
