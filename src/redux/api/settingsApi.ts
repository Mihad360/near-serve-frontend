import { baseApi } from "./baseApi";
import { buildQueryParams } from "./queryParams";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAbout: builder.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/about/", method: "GET", params };
      },
      providesTags: ["about"],
    }),

    getAllPrivacy: builder.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/privacy/", method: "GET", params };
      },
      providesTags: ["privacy"],
    }),

    getAllTerms: builder.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/term/", method: "GET", params };
      },
      providesTags: ["terms"],
    }),
  }),
});

export const {
  useGetAllAboutQuery,
  useGetAllPrivacyQuery,
  useGetAllTermsQuery,
} = settingsApi;
