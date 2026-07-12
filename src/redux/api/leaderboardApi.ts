import { baseApi } from "./baseApi";
import { buildQueryParams } from "./queryParams";

const leaderboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOverallLeaderboard: build.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/leaderboard/overall", method: "GET", params };
      },
      providesTags: ["leaderboard"],
    }),

    getLeaderboardCategories: build.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/leaderboard/categories", method: "GET", params };
      },
      providesTags: ["leaderboard"],
    }),

    getCategoryLeaderboard: build.query({
      query: ({
        category,
        ...args
      }: {
        category: string;
        [key: string]: unknown;
      }) => {
        const params = buildQueryParams(args);
        return {
          url: `/leaderboard/category/${category}`,
          method: "GET",
          params,
        };
      },
      providesTags: ["leaderboard"],
    }),

    generateLeaderboard: build.mutation({
      query: (data) => ({
        url: "/leaderboard/generate",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["leaderboard"],
    }),
  }),
});

export const {
  useGetOverallLeaderboardQuery,
  useGetLeaderboardCategoriesQuery,
  useGetCategoryLeaderboardQuery,
  useGenerateLeaderboardMutation,
} = leaderboardApi;
