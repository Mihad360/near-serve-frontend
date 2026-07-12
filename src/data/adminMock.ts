import type { JobStatus, PaymentStatus } from "@/types/job";

export type AdminProviderRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  categories: string[];
  isApproved: boolean;
  rating: number;
  jobsCompleted: number;
  memberSince: string;
  city: string;
};

export type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "provider" | "admin";
  isBlocked: boolean;
  jobsCount: number;
  createdAt: string;
};

export type AdminJobRow = {
  id: string;
  title: string;
  category: string;
  customerName: string;
  providerName?: string;
  budget: number;
  status: JobStatus | "cancelled";
  createdAt: string;
  city: string;
};

export type AdminPaymentRow = {
  id: string;
  jobId: string;
  jobTitle: string;
  customerName: string;
  providerName: string;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
  method: string;
};

export type AdminDisputeRow = {
  id: string;
  jobId: string;
  jobTitle: string;
  customerName: string;
  providerName: string;
  amount: number;
  reason: string;
  status: "open" | "resolved_customer" | "resolved_provider" | "resolved_split";
  openedAt: string;
};

export type AdminReviewRow = {
  id: string;
  jobId: string;
  jobTitle: string;
  reviewerName: string;
  revieweeName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export const ADMIN_STATS = {
  users: 1284,
  providersPending: 7,
  activeJobs: 86,
  openDisputes: 4,
  heldPayments: 12450,
  gmvMonth: 89400,
};

export const mockAdminProviders: AdminProviderRow[] = [
  {
    id: "prov-1",
    name: "Alex Rivera",
    email: "alex.rivera@email.com",
    phone: "+1 (415) 555-0198",
    categories: ["Handyman", "Moving"],
    isApproved: true,
    rating: 4.9,
    jobsCompleted: 128,
    memberSince: "2024-03-18",
    city: "San Francisco",
  },
  {
    id: "prov-2",
    name: "Jordan Lee",
    email: "jordan.lee@email.com",
    phone: "+1 (415) 555-0112",
    categories: ["Electrical"],
    isApproved: true,
    rating: 4.9,
    jobsCompleted: 94,
    memberSince: "2024-06-02",
    city: "Oakland",
  },
  {
    id: "prov-3",
    name: "Sam Okonkwo",
    email: "sam.o@email.com",
    phone: "+1 (510) 555-0144",
    categories: ["Painting"],
    isApproved: true,
    rating: 4.8,
    jobsCompleted: 67,
    memberSince: "2024-08-11",
    city: "Berkeley",
  },
  {
    id: "prov-4",
    name: "Chris Patel",
    email: "chris.p@email.com",
    phone: "+1 (415) 555-0177",
    categories: ["Plumbing"],
    isApproved: false,
    rating: 0,
    jobsCompleted: 0,
    memberSince: "2026-07-08",
    city: "San Francisco",
  },
  {
    id: "prov-5",
    name: "Riley Nguyen",
    email: "riley.n@email.com",
    phone: "+1 (650) 555-0101",
    categories: ["Cleaning", "Handyman"],
    isApproved: false,
    rating: 0,
    jobsCompleted: 0,
    memberSince: "2026-07-09",
    city: "Daly City",
  },
  {
    id: "prov-6",
    name: "Morgan Blake",
    email: "morgan.b@email.com",
    phone: "+1 (408) 555-0190",
    categories: ["Landscaping"],
    isApproved: true,
    rating: 4.5,
    jobsCompleted: 41,
    memberSince: "2025-01-20",
    city: "San Jose",
  },
  {
    id: "prov-7",
    name: "Casey Brooks",
    email: "casey.b@email.com",
    phone: "+1 (415) 555-0129",
    categories: ["Appliance Repair"],
    isApproved: false,
    rating: 0,
    jobsCompleted: 0,
    memberSince: "2026-07-10",
    city: "SF",
  },
  {
    id: "prov-8",
    name: "Taylor Kim",
    email: "taylor.k@email.com",
    phone: "+1 (415) 555-0155",
    categories: ["Electrical", "Handyman"],
    isApproved: true,
    rating: 4.6,
    jobsCompleted: 41,
    memberSince: "2025-04-03",
    city: "SF",
  },
  {
    id: "prov-9",
    name: "Jamie Cruz",
    email: "jamie.c@email.com",
    phone: "+1 (510) 555-0188",
    categories: ["Moving"],
    isApproved: true,
    rating: 4.7,
    jobsCompleted: 55,
    memberSince: "2025-02-14",
    city: "Oakland",
  },
  {
    id: "prov-10",
    name: "Avery Shah",
    email: "avery.s@email.com",
    phone: "+1 (415) 555-0166",
    categories: ["Plumbing"],
    isApproved: false,
    rating: 0,
    jobsCompleted: 0,
    memberSince: "2026-07-11",
    city: "SF",
  },
];

export const mockAdminUsers: AdminUserRow[] = [
  {
    id: "cust-1",
    name: "Maya Chen",
    email: "maya.chen@email.com",
    role: "customer",
    isBlocked: false,
    jobsCount: 6,
    createdAt: "2024-11-02",
  },
  {
    id: "cust-2",
    name: "Noah Park",
    email: "noah.park@email.com",
    role: "customer",
    isBlocked: false,
    jobsCount: 3,
    createdAt: "2025-02-18",
  },
  {
    id: "cust-3",
    name: "Elena Vargas",
    email: "elena.v@email.com",
    role: "customer",
    isBlocked: true,
    jobsCount: 1,
    createdAt: "2025-06-01",
  },
  {
    id: "cust-4",
    name: "Ben Ortiz",
    email: "ben.o@email.com",
    role: "customer",
    isBlocked: false,
    jobsCount: 8,
    createdAt: "2024-08-22",
  },
  {
    id: "prov-1",
    name: "Alex Rivera",
    email: "alex.rivera@email.com",
    role: "provider",
    isBlocked: false,
    jobsCount: 128,
    createdAt: "2024-03-18",
  },
  {
    id: "prov-4",
    name: "Chris Patel",
    email: "chris.p@email.com",
    role: "provider",
    isBlocked: false,
    jobsCount: 0,
    createdAt: "2026-07-08",
  },
  {
    id: "cust-5",
    name: "Priya Das",
    email: "priya.d@email.com",
    role: "customer",
    isBlocked: false,
    jobsCount: 2,
    createdAt: "2026-01-09",
  },
  {
    id: "cust-6",
    name: "Omar Hassan",
    email: "omar.h@email.com",
    role: "customer",
    isBlocked: false,
    jobsCount: 4,
    createdAt: "2025-09-14",
  },
  {
    id: "cust-7",
    name: "Lily Tran",
    email: "lily.t@email.com",
    role: "customer",
    isBlocked: false,
    jobsCount: 5,
    createdAt: "2025-04-30",
  },
  {
    id: "admin-1",
    name: "NearServe Admin",
    email: "admin@nearserve.com",
    role: "admin",
    isBlocked: false,
    jobsCount: 0,
    createdAt: "2024-01-01",
  },
];

export const mockAdminJobs: AdminJobRow[] = [
  {
    id: "job-1",
    title: "Fix leaking kitchen sink",
    category: "Plumbing",
    customerName: "Maya Chen",
    budget: 160,
    status: "bidding",
    createdAt: "2026-07-10T10:00:00Z",
    city: "SF",
  },
  {
    id: "job-2",
    title: "Deep clean 2BR apartment",
    category: "Cleaning",
    customerName: "Noah Park",
    budget: 220,
    status: "open",
    createdAt: "2026-07-11T08:00:00Z",
    city: "Oakland",
  },
  {
    id: "job-3",
    title: "Install ceiling fan",
    category: "Electrical",
    customerName: "Maya Chen",
    providerName: "Jordan Lee",
    budget: 195,
    status: "booked",
    createdAt: "2026-07-08T12:00:00Z",
    city: "SF",
  },
  {
    id: "job-4",
    title: "Move couch + dresser",
    category: "Moving",
    customerName: "Maya Chen",
    providerName: "Alex Rivera",
    budget: 150,
    status: "in_progress",
    createdAt: "2026-07-09T09:00:00Z",
    city: "SF",
  },
  {
    id: "job-5",
    title: "Paint living room",
    category: "Painting",
    customerName: "Ben Ortiz",
    providerName: "Sam Okonkwo",
    budget: 280,
    status: "completed",
    createdAt: "2026-06-20T10:00:00Z",
    city: "Berkeley",
  },
  {
    id: "job-6",
    title: "Replace faucet washer",
    category: "Plumbing",
    customerName: "Elena Vargas",
    providerName: "Chris Patel",
    budget: 110,
    status: "disputed",
    createdAt: "2026-07-01T15:00:00Z",
    city: "SF",
  },
  {
    id: "job-7",
    title: "Yard cleanup",
    category: "Landscaping",
    customerName: "Priya Das",
    budget: 180,
    status: "open",
    createdAt: "2026-07-11T14:00:00Z",
    city: "Daly City",
  },
  {
    id: "job-8",
    title: "Mount shelves",
    category: "Handyman",
    customerName: "Omar Hassan",
    providerName: "Alex Rivera",
    budget: 90,
    status: "completed",
    createdAt: "2026-06-15T11:00:00Z",
    city: "SF",
  },
  {
    id: "job-9",
    title: "AC not cooling",
    category: "Appliance Repair",
    customerName: "Lily Tran",
    budget: 250,
    status: "bidding",
    createdAt: "2026-07-11T16:00:00Z",
    city: "SF",
  },
  {
    id: "job-10",
    title: "Cancelled patio stain",
    category: "Painting",
    customerName: "Ben Ortiz",
    budget: 400,
    status: "cancelled",
    createdAt: "2026-06-01T09:00:00Z",
    city: "Oakland",
  },
];

export const mockAdminPayments: AdminPaymentRow[] = [
  {
    id: "pay-1",
    jobId: "job-4",
    jobTitle: "Move couch + dresser",
    customerName: "Maya Chen",
    providerName: "Alex Rivera",
    amount: 150,
    status: "held",
    createdAt: "2026-07-09T10:00:00Z",
    method: "Visa ···· 4242",
  },
  {
    id: "pay-2",
    jobId: "job-3",
    jobTitle: "Install ceiling fan",
    customerName: "Maya Chen",
    providerName: "Jordan Lee",
    amount: 195,
    status: "held",
    createdAt: "2026-07-08T16:00:00Z",
    method: "Visa ···· 4242",
  },
  {
    id: "pay-3",
    jobId: "job-5",
    jobTitle: "Paint living room",
    customerName: "Ben Ortiz",
    providerName: "Sam Okonkwo",
    amount: 280,
    status: "released",
    createdAt: "2026-06-22T12:00:00Z",
    method: "Mastercard ···· 4444",
  },
  {
    id: "pay-4",
    jobId: "job-6",
    jobTitle: "Replace faucet washer",
    customerName: "Elena Vargas",
    providerName: "Chris Patel",
    amount: 110,
    status: "disputed",
    createdAt: "2026-07-01T16:00:00Z",
    method: "Visa ···· 4242",
  },
  {
    id: "pay-5",
    jobId: "job-8",
    jobTitle: "Mount shelves",
    customerName: "Omar Hassan",
    providerName: "Alex Rivera",
    amount: 90,
    status: "released",
    createdAt: "2026-06-16T10:00:00Z",
    method: "Visa ···· 1881",
  },
  {
    id: "pay-6",
    jobId: "job-11",
    jobTitle: "Tile bathroom floor",
    customerName: "Noah Park",
    providerName: "Riley Nguyen",
    amount: 520,
    status: "pending",
    createdAt: "2026-07-11T11:00:00Z",
    method: "—",
  },
  {
    id: "pay-7",
    jobId: "job-12",
    jobTitle: "Fence repair",
    customerName: "Priya Das",
    providerName: "Morgan Blake",
    amount: 340,
    status: "refunded",
    createdAt: "2026-05-20T09:00:00Z",
    method: "Visa ···· 4242",
  },
  {
    id: "pay-8",
    jobId: "job-13",
    jobTitle: "Gutter clean",
    customerName: "Lily Tran",
    providerName: "Jamie Cruz",
    amount: 120,
    status: "held",
    createdAt: "2026-07-10T14:00:00Z",
    method: "Amex ···· 0005",
  },
  {
    id: "pay-9",
    jobId: "job-14",
    jobTitle: "Outlet install",
    customerName: "Ben Ortiz",
    providerName: "Jordan Lee",
    amount: 175,
    status: "released",
    createdAt: "2026-06-28T08:00:00Z",
    method: "Visa ···· 4242",
  },
];

export const mockAdminDisputes: AdminDisputeRow[] = [
  {
    id: "disp-1",
    jobId: "job-6",
    jobTitle: "Replace faucet washer",
    customerName: "Elena Vargas",
    providerName: "Chris Patel",
    amount: 110,
    reason: "Still leaking after visit. Customer wants refund.",
    status: "open",
    openedAt: "2026-07-02T10:00:00Z",
  },
  {
    id: "disp-2",
    jobId: "job-15",
    jobTitle: "Sofa delivery damage",
    customerName: "Noah Park",
    providerName: "Jamie Cruz",
    amount: 200,
    reason: "Scratched hallway wall during move.",
    status: "open",
    openedAt: "2026-07-09T18:00:00Z",
  },
  {
    id: "disp-3",
    jobId: "job-16",
    jobTitle: "Incomplete paint job",
    customerName: "Priya Das",
    providerName: "Sam Okonkwo",
    amount: 310,
    reason: "Missed closet walls.",
    status: "resolved_split",
    openedAt: "2026-06-10T12:00:00Z",
  },
  {
    id: "disp-4",
    jobId: "job-17",
    jobTitle: "No-show electrician",
    customerName: "Lily Tran",
    providerName: "Taylor Kim",
    amount: 160,
    reason: "Provider never arrived.",
    status: "resolved_customer",
    openedAt: "2026-05-22T09:00:00Z",
  },
  {
    id: "disp-5",
    jobId: "job-18",
    jobTitle: "Extra charges claimed",
    customerName: "Omar Hassan",
    providerName: "Alex Rivera",
    amount: 140,
    reason: "Provider says customer changed scope mid-job.",
    status: "resolved_provider",
    openedAt: "2026-06-01T15:00:00Z",
  },
];

export const mockAdminReviews: AdminReviewRow[] = [
  {
    id: "rev-1",
    jobId: "job-5",
    jobTitle: "Paint living room",
    reviewerName: "Ben Ortiz",
    revieweeName: "Sam Okonkwo",
    rating: 5,
    comment: "Clean lines, on time, great communication.",
    createdAt: "2026-06-25T10:00:00Z",
  },
  {
    id: "rev-2",
    jobId: "job-8",
    jobTitle: "Mount shelves",
    reviewerName: "Omar Hassan",
    revieweeName: "Alex Rivera",
    rating: 5,
    comment: "Level and solid. Would hire again.",
    createdAt: "2026-06-17T11:00:00Z",
  },
  {
    id: "rev-3",
    jobId: "job-14",
    jobTitle: "Outlet install",
    reviewerName: "Ben Ortiz",
    revieweeName: "Jordan Lee",
    rating: 4,
    comment: "Good work, ran a bit late.",
    createdAt: "2026-06-29T09:00:00Z",
  },
  {
    id: "rev-4",
    jobId: "job-19",
    jobTitle: "Garden trim",
    reviewerName: "Priya Das",
    revieweeName: "Morgan Blake",
    rating: 2,
    comment: "Left clippings everywhere. Inappropriate language in chat.",
    createdAt: "2026-07-01T16:00:00Z",
  },
  {
    id: "rev-5",
    jobId: "job-20",
    jobTitle: "AC tune-up",
    reviewerName: "Lily Tran",
    revieweeName: "Casey Brooks",
    rating: 1,
    comment: "Spammy review copy — please remove.",
    createdAt: "2026-07-05T12:00:00Z",
  },
  {
    id: "rev-6",
    jobId: "job-21",
    jobTitle: "Window wash",
    reviewerName: "Maya Chen",
    revieweeName: "Riley Nguyen",
    rating: 5,
    comment: "Sparkling windows.",
    createdAt: "2026-07-08T08:00:00Z",
  },
  {
    id: "rev-7",
    jobId: "job-22",
    jobTitle: "Drywall patch",
    reviewerName: "Noah Park",
    revieweeName: "Alex Rivera",
    rating: 4,
    comment: "Seamless patch.",
    createdAt: "2026-07-03T14:00:00Z",
  },
  {
    id: "rev-8",
    jobId: "job-23",
    jobTitle: "Lock change",
    reviewerName: "Elena Vargas",
    revieweeName: "Chris Patel",
    rating: 3,
    comment: "Worked but pricey.",
    createdAt: "2026-06-12T10:00:00Z",
  },
  {
    id: "rev-9",
    jobId: "job-24",
    jobTitle: "Junk haul",
    reviewerName: "Omar Hassan",
    revieweeName: "Jamie Cruz",
    rating: 5,
    comment: "Fast crew.",
    createdAt: "2026-07-09T17:00:00Z",
  },
];

export function getAdminProvider(id: string) {
  return mockAdminProviders.find((p) => p.id === id);
}

export function getAdminUser(id: string) {
  return mockAdminUsers.find((u) => u.id === id);
}

export function getAdminJob(id: string) {
  return mockAdminJobs.find((j) => j.id === id);
}

export function getAdminPayment(id: string) {
  return mockAdminPayments.find((p) => p.id === id);
}

export function getAdminDisputeByJob(jobId: string) {
  return mockAdminDisputes.find((d) => d.jobId === jobId);
}

export function getAdminDispute(id: string) {
  return mockAdminDisputes.find((d) => d.id === id);
}
