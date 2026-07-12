import { baseApi } from "./baseApi";
import { buildQueryParams } from "./queryParams";

const jobApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /** Admin — all jobs */
    getAllJobs: build.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/job", method: "GET", params };
      },
      providesTags: ["job"],
    }),

    /** Customer — my jobs */
    getMyJobs: build.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/job/my-jobs", method: "GET", params };
      },
      providesTags: ["job"],
    }),

    /** Provider — geo job feed */
    getJobFeed: build.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/job/feed", method: "GET", params };
      },
      providesTags: ["job"],
    }),

    /** Customer / Provider — single job */
    getJobById: build.query({
      query: (jobId: string) => ({
        url: `/job/${jobId}`,
        method: "GET",
      }),
      providesTags: ["job"],
    }),

    /** Customer — create job */
    createJob: build.mutation({
      query: (data) => ({
        url: "/job/create",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["job"],
    }),

    /** Customer — cancel job */
    cancelJob: build.mutation({
      query: (jobId: string) => ({
        url: `/job/${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["job"],
    }),

    /** Customer / Provider — update job status */
    updateJobStatus: build.mutation({
      query: ({ jobId, ...data }: { jobId: string; [key: string]: unknown }) => ({
        url: `/job/${jobId}/status`,
        method: "PATCH",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["job", "bid"],
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useGetMyJobsQuery,
  useGetJobFeedQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useCancelJobMutation,
  useUpdateJobStatusMutation,
} = jobApi;
