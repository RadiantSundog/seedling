import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearForm } from "./accountSlice";

export const authApiSlice = createApi({
  reducerPath: "auth",
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
    "Identified",
  ],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/queries/accounts",
        method: "post",
        body: data,
        credentials: "include",
      }),
      providesTags: ["Account"],
      invalidatesTags: (result) => {
        return (result && ["Token"]) || [];
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearForm());
        } catch (err) {}
      },
    }),
    logIn: builder.mutation({
      query: (info) => {
        let formData = null;
        if (info instanceof HTMLElement) {
          formData = new FormData(info);
        } else {
          formData = new FormData();
          formData.append("username", info.username);
          formData.append("password", info.password);
          formData.append("email", info.email);
        }
        return {
          url: "/token",
          method: "post",
          body: formData,
          credentials: "include",
        };
      },
      providesTags: ["Account"],
      invalidatesTags: (result) => {
        return (result && ["Token"]) || [];
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearForm());
        } catch (err) {}
      },
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/token",
        method: "delete",
        credentials: "include",
      }),
      invalidatesTags: ["Account", "Token"],
    }),
    getToken: builder.query({
      query: () => ({
        url: "/token",
        credentials: "include",
      }),
      providesTags: ["Token"],
    }),
    getJournals: builder.query({
      query: () => "/journals",
      providesTags: ["Journals"],
    }),
    createJournals: builder.mutation({
      query: (data) => ({
        url: "/journals",
        body: data,
        method: "post",
      }),
      invalidatesTags: ["Journals"],
    }),
    deleteJournal: builder.mutation({
      query: (journalId) => ({
        url: `/journals/${journalId}`,
        method: "delete",
      }),
      invalidatesTags: ["Journals"],
    }),
    getGardens: builder.query({
      query: () => "/gardens",
      providesTags: ["Garden"],
    }),
    createGardens: builder.mutation({
      query: (data) => ({
        url: "/gardens",
        body: data,
        method: "post",
      }),
      invalidatesTags: ["Garden"],
    }),
    deleteGarden: builder.mutation({
      query: (gardenId) => ({
        url: `/gardens/${gardenId}`,
        method: "delete",
      }),
      invalidatesTags: ["Garden"],
    }),
    getPlants: builder.query({
      query: () => ({
        url: "/plants",
        credentials: "include",
      }),
      providesTags: ["Plant"],
    }),
    createPlants: builder.mutation({
      query: (data) => ({
        url: "/plants",
        body: { ...data },
        method: "post",
      }),
      invalidatesTags: ["Plant"],
    }),
    deletePlant: builder.mutation({
      query: (plantId) => ({
        url: `/plants/${plantId}`,
        method: "delete",
      }),
      invalidatesTags: ["Plant"],
    }),
    getTasks: builder.query({
      query: () => "/tasks",
      providesTags: ["Task"],
    }),
    createTasks: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        body: data,
        method: "post",
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: "delete",
      }),
      invalidatesTags: ["Task"],
    }),
    GetIdentified: builder.query({
      query: () => "/identify-plant",
      providesTags: ["Identified"],
    }),
  }),
});

export const {
  useGetTokenQuery,
  useLogInMutation,
  useLogOutMutation,
  useSignUpMutation,
  useGetJournalsQuery,
  useCreateJournalsMutation,
  useDeleteJournalMutation,
  useGetGardensQuery,
  useCreateGardensMutation,
  useDeleteGardenMutation,
  useGetPlantsQuery,
  useCreatePlantsMutation,
  useDeletePlantMutation,
  useGetTasksQuery,
  useCreateTasksMutation,
  useDeleteTaskMutation,
  useGetIdentifiedQuery,
} = authApiSlice;
