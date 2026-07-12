import { baseApi } from "./baseApi";
import { buildQueryParams } from "./queryParams";

const aiApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRecommendations: build.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/ai/recommendations", method: "GET", params };
      },
      providesTags: ["ai"],
    }),

    getTrustScore: build.query({
      query: (providerId: string) => ({
        url: `/ai/trust-score/${providerId}`,
        method: "GET",
      }),
      providesTags: ["ai"],
    }),

    aiChat: build.mutation({
      query: (data) => ({
        url: "/ai/chat",
        method: "POST",
        contentType: "application/json",
        data,
      }),
    }),

    getAIDisputeRecommendation: build.query({
      query: (jobId: string) => ({
        url: `/ai/dispute-recommendation/${jobId}`,
        method: "GET",
      }),
      providesTags: ["ai"],
    }),

    recalculateAllScores: build.mutation({
      query: (data) => ({
        url: "/ai/recalculate-scores",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["ai", "provider"],
    }),
  }),
});

export const {
  useGetRecommendationsQuery,
  useGetTrustScoreQuery,
  useAiChatMutation,
  useGetAIDisputeRecommendationQuery,
  useRecalculateAllScoresMutation,
} = aiApi;
