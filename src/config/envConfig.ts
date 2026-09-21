const isProd = process.env.NODE_ENV === "production";

export const envConfig = {
  baseApi: isProd
    ? "https://near-serve-backend.vercel.app/api/v1"
    : process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1",
  baseUrl: isProd
    ? "https://near-serve-backend.vercel.app"
    : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  socketUrl: isProd
    ? "https://near-serve-backend.vercel.app"
    : process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000",
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
  },
};
