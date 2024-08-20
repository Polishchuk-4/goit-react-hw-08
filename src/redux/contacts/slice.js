import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  editingContact,
} from "./operations";
import { logoutThunk } from "../auth/operations";
import { act } from "react";

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: false,
  isOpenModal: false,
};

const handlePending = (state, action) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: contactsInitialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(logoutThunk.pending, (state, action) => {})
      .addCase(logoutThunk.fulfilled, () => {
        return contactsInitialState;
      })
      .addCase(editingContact.fulfilled, (state, action) => {
        state.error = null;
        console.log(action.payload);
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.items[index] = action.payload;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
