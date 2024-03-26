"use client"

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
  };
  
  export const registerSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      userRegister: (state, action) => {
      },
    }
});
export const { userRegister} =
registerSlice.actions;

export default registerSlice.reducer;