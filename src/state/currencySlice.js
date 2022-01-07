import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'currency',
  initialState: {
    value: [],
  },
  reducers: {
    setCurrency: (state, action) => {
      state.value = action.payload
    },
  },
});

export const { setCurrency } = slice.actions;
export default slice.reducer;
