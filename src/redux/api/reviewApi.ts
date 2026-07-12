import { baseApi } from "./baseApi";
import { buildQueryParams } from "./queryParams";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyReviews: build.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/review/my-reviews", method: "GET", params };
      },
      providesTags: ["review"],
    }),

    getProviderReviews: build.query({
      query: ({
        providerId,
        ...args
      }: {
        providerId: string;
        [key: string]: unknown;
      }) => {
        const params = buildQueryParams(args);
        return {
          url: `/review/provider/${providerId}`,
          method: "GET",
          params,
        };
      },
      providesTags: ["review"],
    }),

    createReview: build.mutation({
      query: (data) => ({
        url: "/review/create",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["review", "job", "provider"],
    }),

    replyToReview: build.mutation({
      query: ({
        reviewId,
        ...data
      }: {
        reviewId: string;
        [key: string]: unknown;
      }) => ({
        url: `/review/${reviewId}/reply`,
        method: "PATCH",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["review"],
    }),

    deleteReview: build.mutation({
      query: (reviewId: string) => ({
        url: `/review/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useGetMyReviewsQuery,
  useGetProviderReviewsQuery,
  useCreateReviewMutation,
  useReplyToReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
