import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authApiSlice } from "./authApi";

export const plantIdentificationSlice = createApi({
  reducerPath: "identify_plants",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_AUTH_API_HOST,
    prepareHeaders: (headers, { getState }) => {
      const selector = authApiSlice.endpoints.getToken.select();
      const { data: tokenData } = selector(getState());
      if (tokenData && tokenData.access_token) {
        headers.set("Authorization", `Bearer ${tokenData.access_token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Account",
    "Garden",
    "Plant",
    "Token",
    "Journals",
    "Task",
    "Identify",
  ],
  endpoints: (builder) => ({
    addIdentify: builder.mutation({
      query: (image) => {
        const formData = new FormData();
        formData.append("file", image, image.name);
        return {
          method: "POST",
          url: "/identify-plant",
          body: formData,
        };
      },
    }),
  }),
});

export const { useAddIdentifyMutation } = plantIdentificationSlice;
