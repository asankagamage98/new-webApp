"use client"

import { configureStore } from "@reduxjs/toolkit";
import registerslice from './features/Auth/registerSlice';
import loginSlice from './features/Auth/loginSlice';
import { combineReducers } from 'redux';

export const store = configureStore({
    reducer: combineReducers({
        auth:registerslice,
        login: loginSlice,
    }),
});
