import { baseApi } from "./baseApi";
import { buildQueryParams } from "./queryParams";

const messageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMessages: build.query({
      query: ({
        conversationId,
        ...args
      }: {
        conversationId: string;
        [key: string]: unknown;
      }) => {
        const params = buildQueryParams(args);
        return {
          url: `/message/${conversationId}`,
          method: "GET",
          params,
        };
      },
      providesTags: ["message"],
    }),

    sendTextMessage: build.mutation({
      query: ({
        conversationId,
        ...data
      }: {
        conversationId: string;
        [key: string]: unknown;
      }) => ({
        url: `/message/${conversationId}/send-text`,
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["message", "conversation"],
    }),

    /** Multipart: FormData with `data` (JSON string) + `files` */
    sendAttachment: build.mutation({
      query: ({
        conversationId,
        formData,
      }: {
        conversationId: string;
        formData: FormData;
      }) => ({
        url: `/message/${conversationId}/attachment`,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["message", "conversation"],
    }),

    deleteMessage: build.mutation({
      query: (messageId: string) => ({
        url: `/message/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["message"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendTextMessageMutation,
  useSendAttachmentMutation,
  useDeleteMessageMutation,
} = messageApi;
