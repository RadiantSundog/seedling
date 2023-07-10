import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// import { apiSlice } from "./api";
import { authApiSlice } from "./authApi";
import { accountSlice } from "./accountSlice";

const store = configureStore({
  reducer: {
    // [apiSlice.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [accountSlice.name]: accountSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return (
      getDefaultMiddleware()
        // .concat(apiSlice.middleware)
        .concat(authApiSlice.middleware)
    );
  },
});

setupListeners(store.dispatch);
export default store;
