import { configureStore } from "@reduxjs/toolkit";
import tagsReducer from './tagSlice';

const store = configureStore({
    reducer: {
        tags: tagsReducer,
    },
});

export default store;
