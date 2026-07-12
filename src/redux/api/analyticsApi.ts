import { baseApi } from "./baseApi";
import { buildQueryParams } from "./queryParams";

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProviderAnalytics: build.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/analytics/provider", method: "GET", params };
      },
      providesTags: ["analytics"],
    }),

    getAdminAnalytics: build.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/analytics/admin", method: "GET", params };
      },
      providesTags: ["analytics"],
    }),
  }),
});

export const {
  useGetProviderAnalyticsQuery,
  useGetAdminAnalyticsQuery,
} = analyticsApi;
