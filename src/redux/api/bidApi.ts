import { baseApi } from "./baseApi";
import { buildQueryParams } from "./queryParams";

const bidApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /** Provider — my bids */
    getMyBids: build.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/bid/my-bids", method: "GET", params };
      },
      providesTags: ["bid"],
    }),

    /** Customer — bids for a job */
    getBidsForJob: build.query({
      query: (jobId: string) => ({
        url: `/bid/${jobId}`,
        method: "GET",
      }),
      providesTags: ["bid"],
    }),

    /** Provider — submit bid on a job */
    submitBid: build.mutation({
      query: ({
        jobId,
        ...data
      }: {
        jobId: string;
        [key: string]: unknown;
      }) => ({
        url: `/bid/${jobId}/submit`,
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["bid", "job"],
    }),

    /** Customer — accept a bid */
    acceptBid: build.mutation({
      query: (bidId: string) => ({
        url: `/bid/${bidId}/accept`,
        method: "PATCH",
      }),
      invalidatesTags: ["bid", "job", "conversation"],
    }),

    /** Provider — withdraw a bid */
    withdrawBid: build.mutation({
      query: (bidId: string) => ({
        url: `/bid/${bidId}/withdraw`,
        method: "PATCH",
      }),
      invalidatesTags: ["bid", "job"],
    }),

    /** Customer — mark bid as read */
    markBidAsRead: build.mutation({
      query: (bidId: string) => ({
        url: `/bid/${bidId}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["bid"],
    }),
  }),
});

export const {
  useGetMyBidsQuery,
  useGetBidsForJobQuery,
  useSubmitBidMutation,
  useAcceptBidMutation,
  useWithdrawBidMutation,
  useMarkBidAsReadMutation,
} = bidApi;
