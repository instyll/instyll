import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: 'light'
};

const themeSlice = createSlice({
    name: 'theme',
    initialState, 
    reducers: {
        setTheme: (state, action) => {
            return {
                ...state,
                theme: action.payload,
              }
        },
        updateTheme: (state, action) => {
            const newValue = action.payload;
            console.log(newValue)

                return {
                    ...state,
                    theme: newValue
                }
            
        }
    }
});

export const { setTheme, updateTheme } = themeSlice.actions;
export default themeSlice.reducer;