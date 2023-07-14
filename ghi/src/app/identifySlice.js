import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  identifiedPlant: null,
  error: null,
};

export const plantIdentificationSlice = createSlice({
  name: "plantIdentification",
  initialState,
  reducers: {
    setIdentifiedPlant: (state, action) => {
      state.identifiedPlant = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setIdentifiedPlant, setError, clearError } =
  plantIdentificationSlice.actions;
