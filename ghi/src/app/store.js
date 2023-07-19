import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApiSlice } from "./authApi";
import { accountSlice } from "./accountSlice";
import { plantIdentificationSlice } from "./identifySlice";

const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
    [plantIdentificationSlice.name]: plantIdentificationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(plantIdentificationSlice.middleware),
});

setupListeners(store.dispatch);
export default store;
