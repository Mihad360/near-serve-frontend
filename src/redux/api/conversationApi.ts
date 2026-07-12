import { baseApi } from "./baseApi";
import { buildQueryParams } from "./queryParams";

const conversationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyConversations: build.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return { url: "/conversation", method: "GET", params };
      },
      providesTags: ["conversation"],
    }),

    getConversationById: build.query({
      query: (id: string) => ({
        url: `/conversation/${id}`,
        method: "GET",
      }),
      providesTags: ["conversation"],
    }),

    deleteConversation: build.mutation({
      query: (id: string) => ({
        url: `/conversation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["conversation", "message"],
    }),
  }),
});

export const {
  useGetMyConversationsQuery,
  useGetConversationByIdQuery,
  useDeleteConversationMutation,
} = conversationApi;
