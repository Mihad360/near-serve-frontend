import { createApi } from "@reduxjs/toolkit/query/react";
import { envConfig } from "../../config/envConfig";
import { axiosBaseQuery } from "@/lib/axios/axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "api",
  tagTypes: [
    "auth",
    "user",
    "admin",
    "notification",
    "terms",
    "privacy",
    "about",
    "job",
    "bid",
    "provider",
    "conversation",
    "message",
    "payment",
    "review",
    "analytics",
    "ai",
    "leaderboard",
    "search",
  ],
  baseQuery: axiosBaseQuery({
    baseUrl: envConfig.baseApi as string,
  }),
  endpoints: () => ({}),
});
