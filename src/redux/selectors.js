import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.items;

export const selectError = (state) => state.contacts.error;

export const selectIsLoading = (state) => state.contacts.isLoading;

export const selectNameFilter = (state) => state.filters.name;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, name) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(name.toLowerCase())
    );
  }
);
