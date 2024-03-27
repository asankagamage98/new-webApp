import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Update this to match your actual user structure
  token: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = loginSlice.actions;

export default loginSlice.reducer;
