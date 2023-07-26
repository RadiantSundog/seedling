import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApiSlice } from "./authApi";
import { accountSlice } from "./accountSlice";
import { plantIdentificationSlice } from "./identifySlice";

const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [plantIdentificationSlice.reducerPath]: plantIdentificationSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(plantIdentificationSlice.middleware);
  },
});

setupListeners(store.dispatch);
export default store;
