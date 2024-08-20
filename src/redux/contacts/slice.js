import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";
import { logoutThunk } from "../auth/operations";

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: false,
  isOpenModal: false,
  editingStates: [],
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
  reducers: {
    startEditing: (state, action) => {
      const contact = state.editingStates.find(
        (contact) => contact.id === action.payload
      );
      contact.editing = true;
    },
    stopEditing: (state, action) => {
      const contact = state.editingStates.find(
        (contact) => contact.id === action.payload
      );
      contact.editing = false;
    },
    openModal: (state) => {
      state.isOpenModal = true;
    },
    closeModal: (state) => {
      state.isOpenModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
        state.editingStates = action.payload.map((contact) => ({
          id: contact.id,
          editing: false,
        }));
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);

        state.editingStates[action.payload.id] = false;
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
        state.editingStates.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(logoutThunk.pending, (state, action) => {})
      .addCase(logoutThunk.fulfilled, () => {
        return contactsInitialState;
      });
  },
});

export const { openModal, closeModal, startEditing, stopEditing } =
  contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
