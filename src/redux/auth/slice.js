import { createSlice } from "@reduxjs/toolkit";
import {
  refreshUserThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
} from "./operations";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state, action) => {})
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(registerThunk.rejected, (state, action) => {})
      .addCase(loginThunk.pending, (state, action) => {})
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {})
      .addCase(logoutThunk.pending, (state, action) => {})
      .addCase(logoutThunk.fulfilled, (state, action) => {
        return initialState;
      })
      .addCase(logoutThunk.rejected, (state, action) => {})
      .addCase(refreshUserThunk.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
      })
      .addCase(refreshUserThunk.pending, (state, action) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUserThunk.rejected, (state, action) => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = slice.reducer;
