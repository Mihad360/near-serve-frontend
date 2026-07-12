import { baseApi } from "./baseApi";
import { buildQueryParams } from "./queryParams";

const providerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /** Public / customer — search nearby providers */
    searchNearbyProviders: build.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/provider/search", method: "GET", params };
      },
      providesTags: ["provider"],
    }),

    /** Get provider by id */
    getProviderById: build.query({
      query: (providerId: string) => ({
        url: `/provider/${providerId}`,
        method: "GET",
      }),
      providesTags: ["provider"],
    }),

    // ─── Provider Stripe Connect ───────────────────────────────────────────

    getStripeOnboardingLink: build.query({
      query: () => ({
        url: "/provider/stripe/onboarding-link",
        method: "GET",
      }),
      providesTags: ["provider"],
    }),

    getStripeAccountStatus: build.query({
      query: () => ({
        url: "/provider/stripe/account-status",
        method: "GET",
      }),
      providesTags: ["provider"],
    }),

    getStripeDashboardLink: build.query({
      query: () => ({
        url: "/provider/stripe/dashboard-link",
        method: "GET",
      }),
      providesTags: ["provider"],
    }),

    createStripeAccount: build.mutation({
      query: (data) => ({
        url: "/provider/stripe/create-account",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["provider"],
    }),
  }),
});

export const {
  useSearchNearbyProvidersQuery,
  useGetProviderByIdQuery,
  useGetStripeOnboardingLinkQuery,
  useGetStripeAccountStatusQuery,
  useGetStripeDashboardLinkQuery,
  useCreateStripeAccountMutation,
} = providerApi;
