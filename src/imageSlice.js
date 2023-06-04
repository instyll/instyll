import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'image',
  initialState: null,
  reducers: {
    setSelectedImage: (state, action) => {
      return action.payload;
    },
    clearSelectedImage: () => null,
  },
});

export const { setSelectedImage, clearSelectedImage } = imageSlice.actions;
export default imageSlice.reducer;