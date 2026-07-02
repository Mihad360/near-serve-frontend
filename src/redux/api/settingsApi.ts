import { baseApi } from "./baseApi";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // About (read-only public)
    getAllAbout: builder.query({
      query: () => ({ url: "/about/", method: "GET" }),
      providesTags: ["about"],
    }),

    // Privacy (read-only public)
    getAllPrivacy: builder.query({
      query: () => ({ url: "/privacy/", method: "GET" }),
      providesTags: ["privacy"],
    }),

    // Terms (read-only public)
    getAllTerms: builder.query({
      query: () => ({ url: "/term/", method: "GET" }),
      providesTags: ["terms"],
    }),
  }),
});

export const {
  // About
  useGetAllAboutQuery,

  // Privacy
  useGetAllPrivacyQuery,

  // Terms
  useGetAllTermsQuery,
} = settingsApi;
