import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearToken, goitApi, setToken } from "../../config/goitApi";

export const registerThunk = createAsyncThunk(
  "register",
  async (credentials, thunkApi) => {
    try {
      const { data } = await goitApi.post("users/signup", credentials);
      setToken(data.token);
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await goitApi.post("users/login", credentials);
      setToken(data.token);
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "logout",
  async (credentials, thunkApi) => {
    try {
      const { data } = await goitApi.post("users/logout");
      clearToken();
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const getMeThunk = createAsyncThunk("getMe", async (_, thunkApi) => {
  const savedToken = thunkApi.getState().auth.token;
  if (savedToken === null) {
    return thunkApi.rejectWithValue("token is not exist!");
  }
  console.log(savedToken);
  try {
    setToken(savedToken);
    const { data } = await goitApi.get("users/current");
    return data;
  } catch (e) {
    return thunkApi.rejectWithValue(e.message);
  }
});
