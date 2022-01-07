import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'wallet',
  initialState: {
    value: [],
  },
  reducers: {
    setWallet: (state, action) => {
      state.value = action.payload
    },
  },
});

export const { setWallet } = slice.actions;
export default slice.reducer;
