// src/lib/navigation.ts

export const PUBLIC_NAV = [
  {
    name: "How it works",
    path: "/how-it-works",
    description: "See how the bid system works",
  },
  {
    name: "Browse services",
    path: "/services",
    description: "Explore service categories",
  },
  {
    name: "Leaderboard",
    path: "/leaderboard",
    description: "Top rated providers this week",
  },
  {
    name: "For providers",
    path: "/for-providers",
    description: "Join as a service provider",
  },
] as const;

export const CUSTOMER_NAV = [
  {
    name: "My jobs",
    path: "/customer",
    icon: "briefcase",
  },
  {
    name: "Post a job",
    path: "/customer/post-job",
    icon: "plus",
  },
  {
    name: "Messages",
    path: "/customer/messages",
    icon: "message",
  },
  {
    name: "Payments",
    path: "/customer/payments",
    icon: "credit-card",
  },
] as const;

export const PROVIDER_NAV = [
  {
    name: "Job feed",
    path: "/provider",
    icon: "layout-grid",
  },
  {
    name: "My bids",
    path: "/provider/my-bids",
    icon: "gavel",
  },
  {
    name: "Messages",
    path: "/provider/messages",
    icon: "message",
  },
  {
    name: "Earnings",
    path: "/provider/earnings",
    icon: "wallet",
  },
] as const;

export const ROUTES = {
  // public
  HOME: "/",
  SERVICES: "/services",
  LEADERBOARD: "/leaderboard",
  FOR_PROVIDERS: "/for-providers",
  HOW_IT_WORKS: "/how-it-works",

  // auth
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  OTP: "/verify-otp",
  RESET_PASSWORD: "/reset-password",

  // customer
  CUSTOMER_HOME: "/customer",
  CUSTOMER_POST_JOB: "/customer/post-job",
  CUSTOMER_MY_JOBS: "/customer",
  CUSTOMER_JOB: (jobId: string) => `/customer/jobs/${jobId}`,
  CUSTOMER_MESSAGES: "/customer/messages",
  CUSTOMER_CONVERSATION: (id: string) => `/customer/messages/${id}`,
  CUSTOMER_PAYMENTS: "/customer/payments",
  CUSTOMER_PROFILE: "/customer/profile",

  // provider
  PROVIDER_HOME: "/provider",
  PROVIDER_FEED: "/provider",
  PROVIDER_JOB: (jobId: string) => `/provider/feed/${jobId}`,
  PROVIDER_MY_BIDS: "/provider/my-bids",
  PROVIDER_ACTIVE: (jobId: string) => `/provider/active/${jobId}`,
  PROVIDER_EARNINGS: "/provider/earnings",
  PROVIDER_MESSAGES: "/provider/messages",
  PROVIDER_CONVERSATION: (id: string) => `/provider/messages/${id}`,
  PROVIDER_ONBOARDING: "/provider/onboarding",
  PROVIDER_PROFILE: "/provider/profile",

  // admin
  ADMIN_HOME: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_PROVIDERS: "/admin/providers",
  ADMIN_JOBS: "/admin/jobs",
  ADMIN_PAYMENTS: "/admin/payments",
  ADMIN_DISPUTES: "/admin/disputes",
  ADMIN_REVIEWS: "/admin/reviews",
  ADMIN_LEADERBOARD: "/admin/leaderboard",
  ADMIN_ANALYTICS: "/admin/analytics",
} as const;

export const NAVBAR_CONFIG = {
  LOGO_TEXT: "Near",
  LOGO_HIGHLIGHT: "Serve",
  CTA_TEXT: "Get started",
  CTA_PATH: ROUTES.REGISTER,
} as const;

// role based redirect after login
export const ROLE_REDIRECT = {
  customer: ROUTES.CUSTOMER_HOME,
  provider: ROUTES.PROVIDER_HOME,
  admin: ROUTES.ADMIN_HOME,
} as const;
