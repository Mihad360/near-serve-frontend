import { baseApi } from "./baseApi";
import { buildQueryParams } from "./queryParams";

/**
 * Admin routes — /admin/* (auth: admin only)
 * UI pages come later; hooks are ready for the admin dashboard.
 */
const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Providers
    getAllProviders: build.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/admin/providers", method: "GET", params };
      },
      providesTags: ["admin"],
    }),
    getProviderDetails: build.query({
      query: (providerId: string) => ({
        url: `/admin/providers/${providerId}`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    toggleProviderApproval: build.mutation({
      query: ({
        providerId,
        ...data
      }: {
        providerId: string;
        [key: string]: unknown;
      }) => ({
        url: `/admin/providers/${providerId}/approve-reject`,
        method: "PATCH",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["admin", "provider"],
    }),

    // Users
    getUserDetails: build.query({
      query: (userId: string) => ({
        url: `/admin/users/${userId}`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    toggleUserBlockStatus: build.mutation({
      query: ({
        userId,
        ...data
      }: {
        userId: string;
        [key: string]: unknown;
      }) => ({
        url: `/admin/users/${userId}/block-unblock`,
        method: "PATCH",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["admin"],
    }),

    // Jobs
    adminGetAllJobs: build.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/admin/jobs", method: "GET", params };
      },
      providesTags: ["admin"],
    }),
    adminGetJobDetails: build.query({
      query: (jobId: string) => ({
        url: `/admin/jobs/${jobId}`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    adminCancelJob: build.mutation({
      query: (jobId: string) => ({
        url: `/admin/jobs/${jobId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["admin", "job"],
    }),

    // Payments
    adminGetAllPayments: build.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/admin/payments", method: "GET", params };
      },
      providesTags: ["admin"],
    }),
    adminGetPaymentDetails: build.query({
      query: (paymentId: string) => ({
        url: `/admin/payments/${paymentId}`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),

    // Disputes
    getAllDisputes: build.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/admin/disputes", method: "GET", params };
      },
      providesTags: ["admin"],
    }),
    getDisputeDetails: build.query({
      query: (jobId: string) => ({
        url: `/admin/disputes/${jobId}`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    resolveDispute: build.mutation({
      query: ({
        jobId,
        ...data
      }: {
        jobId: string;
        [key: string]: unknown;
      }) => ({
        url: `/admin/disputes/${jobId}/resolve`,
        method: "PATCH",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["admin", "payment", "job"],
    }),

    // Reviews
    adminGetAllReviews: build.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/admin/reviews", method: "GET", params };
      },
      providesTags: ["admin"],
    }),
    adminDeleteReview: build.mutation({
      query: (reviewId: string) => ({
        url: `/admin/reviews/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useGetAllProvidersQuery,
  useGetProviderDetailsQuery,
  useToggleProviderApprovalMutation,
  useGetUserDetailsQuery,
  useToggleUserBlockStatusMutation,
  useAdminGetAllJobsQuery,
  useAdminGetJobDetailsQuery,
  useAdminCancelJobMutation,
  useAdminGetAllPaymentsQuery,
  useAdminGetPaymentDetailsQuery,
  useGetAllDisputesQuery,
  useGetDisputeDetailsQuery,
  useResolveDisputeMutation,
  useAdminGetAllReviewsQuery,
  useAdminDeleteReviewMutation,
} = adminApi;
