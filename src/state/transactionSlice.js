import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'transaction',
  initialState: {
    value: [],
  },
  reducers: {
    addNewTransaction: (state, action) => {
      state.value = [
        ...state.value,
        action.payload
      ];
    },
    setTransaction: (state, action) => {
      state.value = action.payload
    }
  },
});

export const { addNewTransaction, setTransaction } = slice.actions;
export default slice.reducer;
