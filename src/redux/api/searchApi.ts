import { baseApi } from "./baseApi";
import { buildQueryParams } from "./queryParams";

const searchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    searchProviders: build.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/search/providers", method: "GET", params };
      },
      providesTags: ["search", "provider"],
    }),
  }),
});

export const { useSearchProvidersQuery } = searchApi;
