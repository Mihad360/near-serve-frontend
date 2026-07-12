import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./api/baseApi";

/** Ensure injected endpoints are registered */
import "./api/authApi";
import "./api/userApi";
import "./api/jobApi";
import "./api/bidApi";
import "./api/providerApi";
import "./api/conversationApi";
import "./api/messageApi";
import "./api/paymentApi";
import "./api/reviewApi";
import "./api/aiApi";
import "./api/analyticsApi";
import "./api/leaderboardApi";
import "./api/searchApi";
import "./api/settingsApi";
import "./api/notificationApi";
import "./api/adminApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(baseApi.middleware),
});

// Enable refetchOnFocus / refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
