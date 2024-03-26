import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Update this to match your actual user structure
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = loginSlice.actions;

export default loginSlice.reducer;
