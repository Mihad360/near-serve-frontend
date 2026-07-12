import { baseApi } from "./baseApi";
import { buildQueryParams } from "./queryParams";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createPaymentIntent: build.mutation({
      query: (data) => ({
        url: "/payment/create-intent",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["payment", "job"],
    }),

    capturePayment: build.mutation({
      query: (data) => ({
        url: "/payment/capture",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["payment", "job"],
    }),

    getPaymentHistory: build.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/payment/history", method: "GET", params };
      },
      providesTags: ["payment"],
    }),

    cancelPayment: build.mutation({
      query: (data) => ({
        url: "/payment/cancel",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["payment", "job"],
    }),

    refundPayment: build.mutation({
      query: (data) => ({
        url: "/payment/refund",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["payment", "job"],
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useCapturePaymentMutation,
  useGetPaymentHistoryQuery,
  useCancelPaymentMutation,
  useRefundPaymentMutation,
} = paymentApi;
