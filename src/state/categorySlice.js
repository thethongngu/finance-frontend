import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'category',
  initialState: {
    value: [],
  },
  reducers: {
    setCategory: (state, action) => {
      state.value = action.payload
    },
  },
});

export const { setCategory } = slice.actions;
export default slice.reducer;
