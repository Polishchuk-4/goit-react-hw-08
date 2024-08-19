import { createSlice } from "@reduxjs/toolkit";

const filtersInitialState = {
  name: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: filtersInitialState,
  reducers: {
    setNameFilter(state, action) {
      console.log(state);
      state.name = action.payload;
    },
  },
});

export const { setNameFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
