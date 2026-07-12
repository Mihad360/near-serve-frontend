import { baseApi } from "./baseApi";
import { buildQueryParams } from "./queryParams";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/users", method: "GET", params };
      },
      providesTags: ["user"],
    }),

    getMe: build.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["user", "auth"],
    }),

    /** Multipart: FormData with `data` (JSON string) + optional `image` / `portfolio` files */
    editProfile: build.mutation({
      query: (formData: FormData) => ({
        url: "/users/edit-profile",
        method: "PATCH",
        data: formData,
      }),
      invalidatesTags: ["user", "auth", "provider"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetMeQuery,
  useEditProfileMutation,
} = userApi;
