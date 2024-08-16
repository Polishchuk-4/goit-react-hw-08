import { createAsyncThunk } from "@reduxjs/toolkit";
import { goitApi } from "../../config/goitApi";

export const registerThunk = createAsyncThunk(
  "registe",
  async (credentials, thunkApi) => {
    try {
      const { data } = await goitApi.post("users/signup", credentials);
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);
