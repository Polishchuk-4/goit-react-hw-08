import { createSelector } from "@reduxjs/toolkit";
import { selectNameFilter } from "../filters/selectors";

export const selectContacts = (state) => state.contacts.items;

export const selectError = (state) => state.contacts.error;

export const selectIsLoading = (state) => state.contacts.isLoading;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, name) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(name.toLowerCase())
    );
  }
);

export const selectIsOpenModal = (state) => state.contacts.isOpenModal;

export const selectEditingStates = (state) => state.contacts.editingStates;

export const selectEditingStateById = (id) => (state) => {
  return state.contacts.editingStates.find((contact) => contact.id === id);
};
