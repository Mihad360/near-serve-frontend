import type {
  Conversation,
  Earning,
  FeedJob,
  ProviderBid,
  ProviderProfile,
  StripeAccountStatus,
} from "@/types/job";

/**
 * Approval mock:
 * - Default: approved (`PROVIDER_PROFILE.isApproved === true`)
 * - Pending UI: visit `/provider?pending=1` or `/provider/onboarding?pending=1`
 * - Or flip `MOCK_FORCE_PENDING` below to `true` for a global pending state
 */
export const MOCK_FORCE_PENDING = false;

/**
 * Stripe Express mock:
 * - Default: connected & ready to receive payouts
 * - Incomplete: visit `/provider/payouts?stripe=setup` or `/provider/payouts?stripe=pending`
 * - Or flip `MOCK_STRIPE_STATUS` below
 */
export type MockStripePreset = "none" | "pending" | "ready";
export const MOCK_STRIPE_STATUS: MockStripePreset = "ready";

export const STRIPE_STATUS_PRESETS: Record<
  MockStripePreset,
  StripeAccountStatus
> = {
  none: {
    hasAccount: false,
    detailsSubmitted: false,
    chargesEnabled: false,
    payoutsEnabled: false,
  },
  pending: {
    hasAccount: true,
    detailsSubmitted: false,
    chargesEnabled: false,
    payoutsEnabled: false,
  },
  ready: {
    hasAccount: true,
    detailsSubmitted: true,
    chargesEnabled: true,
    payoutsEnabled: true,
    bankLast4: "8821",
  },
};

export function getStripeAccountStatus(
  query?: string | null,
): StripeAccountStatus {
  if (query === "setup" || query === "none") return STRIPE_STATUS_PRESETS.none;
  if (query === "pending") return STRIPE_STATUS_PRESETS.pending;
  return STRIPE_STATUS_PRESETS[MOCK_STRIPE_STATUS];
}

export const PROVIDER_PROFILE: ProviderProfile = {
  id: "prov-1",
  name: "Alex Rivera",
  email: "alex.rivera@email.com",
  phone: "+1 (415) 555-0198",
  bio: "Licensed handyman & mover. Fast, tidy, and honest about timelines. Serving Mission, SoMa, and Noe Valley.",
  categories: ["Handyman", "Moving", "Plumbing", "Painting"],
  serviceRadiusKm: 12,
  address: "520 Capp St, San Francisco, CA 94110",
  lat: 37.7601,
  lng: -122.4185,
  isApproved: true,
  rating: 4.9,
  jobsCompleted: 128,
  memberSince: "2024-03-18",
  payoutMethod: "Bank ···· 8821",
};

export const PROVIDER_PROFILE_PENDING: ProviderProfile = {
  ...PROVIDER_PROFILE,
  id: "prov-pending",
  name: "Alex Rivera",
  isApproved: false,
  jobsCompleted: 0,
  rating: 0,
  memberSince: "2026-07-10",
};

export const JOB_CATEGORIES = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Moving",
  "Handyman",
  "Painting",
  "Landscaping",
  "Appliance Repair",
] as const;

export const mockFeedJobs: FeedJob[] = [
  {
    id: "job-p1",
    title: "Unclog bathroom drain — standing water",
    description:
      "Guest bath sink drains slowly and now stands overnight. Prefer someone with a snake or hydro jet. Building has street parking.",
    category: "Plumbing",
    budget: 140,
    status: "open",
    location: {
      address: "318 Dolores St, San Francisco, CA",
      lat: 37.7618,
      lng: -122.426,
    },
    photos: [],
    createdAt: "2026-07-11T06:40:00Z",
    updatedAt: "2026-07-11T06:40:00Z",
    bidCount: 2,
    distanceKm: 0.8,
    customerName: "Maya Chen",
  },
  {
    id: "job-p2",
    title: "Mount 65\" TV on brick wall",
    description:
      "Need a sturdy mount on exposed brick. TV and mount already purchased. Prefer afternoon window.",
    category: "Handyman",
    budget: 120,
    status: "open",
    location: {
      address: "44 Guerrero St, San Francisco, CA",
      lat: 37.7692,
      lng: -122.4241,
    },
    photos: [],
    createdAt: "2026-07-11T07:15:00Z",
    updatedAt: "2026-07-11T07:15:00Z",
    bidCount: 1,
    distanceKm: 1.2,
    customerName: "Riley Park",
  },
  {
    id: "job-p3",
    title: "Studio deep clean after Airbnb turnover",
    description:
      "Full clean: kitchen, bath, floors, linens change. Key in lockbox. Need same-day if possible.",
    category: "Cleaning",
    budget: 160,
    status: "bidding",
    location: {
      address: "990 Folsom St, San Francisco, CA",
      lat: 37.7794,
      lng: -122.4038,
    },
    photos: [],
    createdAt: "2026-07-10T18:00:00Z",
    updatedAt: "2026-07-11T08:00:00Z",
    bidCount: 5,
    distanceKm: 2.4,
    customerName: "Jordan Ellis",
  },
  {
    id: "job-p4",
    title: "Replace kitchen faucet + shutoff valves",
    description:
      "Old compression valves are seized. New faucet under the sink. Access from cabinet is tight.",
    category: "Plumbing",
    budget: 220,
    status: "open",
    location: {
      address: "2100 Market St, San Francisco, CA",
      lat: 37.7669,
      lng: -122.4294,
    },
    photos: [],
    createdAt: "2026-07-11T05:20:00Z",
    updatedAt: "2026-07-11T05:20:00Z",
    bidCount: 0,
    distanceKm: 1.6,
    customerName: "Sam Ortiz",
  },
  {
    id: "job-p5",
    title: "Haul away old mattress + box spring",
    description:
      "Curbside pickup OK. Stairs from 3rd floor. Prefer eco disposal if available.",
    category: "Moving",
    budget: 90,
    status: "open",
    location: {
      address: "780 Valencia St, San Francisco, CA",
      lat: 37.7598,
      lng: -122.4215,
    },
    photos: [],
    createdAt: "2026-07-11T08:10:00Z",
    updatedAt: "2026-07-11T08:10:00Z",
    bidCount: 3,
    distanceKm: 0.4,
    customerName: "Casey Nguyen",
  },
  {
    id: "job-p6",
    title: "Patch drywall + paint touch-up (hallway)",
    description:
      "Two fist-sized holes and scuffs along baseboard. Paint is Behr Swiss Coffee — leftover can available.",
    category: "Painting",
    budget: 180,
    status: "bidding",
    location: {
      address: "1450 Mission St, San Francisco, CA",
      lat: 37.7752,
      lng: -122.4178,
    },
    photos: [],
    createdAt: "2026-07-09T14:30:00Z",
    updatedAt: "2026-07-10T11:00:00Z",
    bidCount: 4,
    distanceKm: 3.1,
    customerName: "Taylor Brooks",
  },
];

/** Active / booked jobs for this provider */
export const mockActiveJobs: FeedJob[] = [
  {
    id: "job-a1",
    title: "Move couch + dresser across town",
    description:
      "Sofa and dresser from Mission to Noe Valley. Stairs at both ends (2nd floor). Truck preferred.",
    category: "Moving",
    budget: 160,
    status: "booked",
    location: {
      address: "1550 Church St, San Francisco, CA",
      lat: 37.7456,
      lng: -122.4271,
    },
    photos: [],
    createdAt: "2026-07-09T08:15:00Z",
    updatedAt: "2026-07-11T08:50:00Z",
    bidCount: 5,
    distanceKm: 2.1,
    customerName: "Maya Chen",
    providerName: "Alex Rivera",
    providerId: "prov-1",
    acceptedBidId: "bid-p1",
  },
  {
    id: "job-a2",
    title: "Install floating shelves in office",
    description:
      "Three oak shelves on studs. Hardware provided. Prefer morning start.",
    category: "Handyman",
    budget: 130,
    status: "in_progress",
    location: {
      address: "600 Townsend St, San Francisco, CA",
      lat: 37.7712,
      lng: -122.4028,
    },
    photos: [],
    createdAt: "2026-07-08T10:00:00Z",
    updatedAt: "2026-07-11T09:10:00Z",
    bidCount: 2,
    distanceKm: 2.8,
    customerName: "Priya Shah",
    providerName: "Alex Rivera",
    providerId: "prov-1",
    acceptedBidId: "bid-p2",
  },
];

export const mockProviderBids: ProviderBid[] = [
  {
    id: "bid-1",
    jobId: "job-p1",
    providerId: "prov-1",
    providerName: "Alex Rivera",
    providerRating: 4.9,
    providerJobsCompleted: 128,
    amount: 125,
    message: "I can snake it this afternoon and check the P-trap while I'm there.",
    eta: "Today, 2–4pm",
    createdAt: "2026-07-11T07:05:00Z",
    status: "pending",
    jobTitle: "Unclog bathroom drain — standing water",
    jobCategory: "Plumbing",
    customerName: "Maya Chen",
    jobBudget: 140,
    jobLocation: {
      address: "318 Dolores St, San Francisco, CA",
      lat: 37.7618,
      lng: -122.426,
    },
  },
  {
    id: "bid-p1",
    jobId: "job-a1",
    providerId: "prov-1",
    providerName: "Alex Rivera",
    providerRating: 4.9,
    providerJobsCompleted: 128,
    amount: 150,
    message: "Two-person crew + van. Blankets and straps included.",
    eta: "Today",
    createdAt: "2026-07-09T09:30:00Z",
    status: "accepted",
    jobTitle: "Move couch + dresser across town",
    jobCategory: "Moving",
    customerName: "Maya Chen",
    jobBudget: 160,
    jobLocation: {
      address: "1550 Church St, San Francisco, CA",
      lat: 37.7456,
      lng: -122.4271,
    },
  },
  {
    id: "bid-p2",
    jobId: "job-a2",
    providerId: "prov-1",
    providerName: "Alex Rivera",
    providerRating: 4.9,
    providerJobsCompleted: 128,
    amount: 115,
    message: "Stud finder + level included. Should wrap before lunch.",
    eta: "This morning",
    createdAt: "2026-07-08T12:00:00Z",
    status: "accepted",
    jobTitle: "Install floating shelves in office",
    jobCategory: "Handyman",
    customerName: "Priya Shah",
    jobBudget: 130,
    jobLocation: {
      address: "600 Townsend St, San Francisco, CA",
      lat: 37.7712,
      lng: -122.4028,
    },
  },
  {
    id: "bid-3",
    jobId: "job-p3",
    providerId: "prov-1",
    providerName: "Alex Rivera",
    providerRating: 4.9,
    providerJobsCompleted: 128,
    amount: 145,
    message: "Same-day turnover cleans are my specialty. Eco products available.",
    eta: "Today, 4–6pm",
    createdAt: "2026-07-10T19:10:00Z",
    status: "lost",
    jobTitle: "Studio deep clean after Airbnb turnover",
    jobCategory: "Cleaning",
    customerName: "Jordan Ellis",
    jobBudget: 160,
    jobLocation: {
      address: "990 Folsom St, San Francisco, CA",
      lat: 37.7794,
      lng: -122.4038,
    },
  },
  {
    id: "bid-4",
    jobId: "job-p6",
    providerId: "prov-1",
    providerName: "Alex Rivera",
    providerRating: 4.9,
    providerJobsCompleted: 128,
    amount: 165,
    message: "Patch, sand, prime, and match the Behr. Clean edges guaranteed.",
    eta: "Tomorrow morning",
    createdAt: "2026-07-09T16:00:00Z",
    status: "pending",
    jobTitle: "Patch drywall + paint touch-up (hallway)",
    jobCategory: "Painting",
    customerName: "Taylor Brooks",
    jobBudget: 180,
    jobLocation: {
      address: "1450 Mission St, San Francisco, CA",
      lat: 37.7752,
      lng: -122.4178,
    },
  },
];

export const mockProviderConversations: Conversation[] = [
  {
    id: "pconv-1",
    jobId: "job-a1",
    jobTitle: "Move couch + dresser across town",
    participantId: "cust-1",
    participantName: "Maya Chen",
    participantRole: "customer",
    lastMessage: "We're about 12 minutes away — see you soon!",
    lastMessageAt: "2026-07-11T08:48:00Z",
    unreadCount: 0,
    messages: [
      {
        id: "pmsg-1",
        conversationId: "pconv-1",
        senderId: "cust-1",
        senderRole: "customer",
        text: "Hi Alex — the building code is #4821 if you need it.",
        createdAt: "2026-07-11T07:30:00Z",
      },
      {
        id: "pmsg-2",
        conversationId: "pconv-1",
        senderId: "prov-1",
        senderRole: "provider",
        text: "Got it, thanks! Loading the van now.",
        createdAt: "2026-07-11T07:42:00Z",
      },
      {
        id: "pmsg-3",
        conversationId: "pconv-1",
        senderId: "cust-1",
        senderRole: "customer",
        text: "Great. I'll be downstairs with the dresser ready.",
        createdAt: "2026-07-11T08:10:00Z",
      },
      {
        id: "pmsg-4",
        conversationId: "pconv-1",
        senderId: "prov-1",
        senderRole: "provider",
        text: "We're about 12 minutes away — see you soon!",
        createdAt: "2026-07-11T08:48:00Z",
      },
    ],
  },
  {
    id: "pconv-2",
    jobId: "job-a2",
    jobTitle: "Install floating shelves in office",
    participantId: "cust-2",
    participantName: "Priya Shah",
    participantRole: "customer",
    lastMessage: "Door code is 4410 — office is suite 3B.",
    lastMessageAt: "2026-07-11T09:05:00Z",
    unreadCount: 1,
    messages: [
      {
        id: "pmsg-5",
        conversationId: "pconv-2",
        senderId: "prov-1",
        senderRole: "provider",
        text: "On my way — ETA about 20 minutes.",
        createdAt: "2026-07-11T08:55:00Z",
      },
      {
        id: "pmsg-6",
        conversationId: "pconv-2",
        senderId: "cust-2",
        senderRole: "customer",
        text: "Door code is 4410 — office is suite 3B.",
        createdAt: "2026-07-11T09:05:00Z",
      },
    ],
  },
  {
    id: "pconv-3",
    jobId: "job-p1",
    jobTitle: "Unclog bathroom drain — standing water",
    participantId: "cust-1",
    participantName: "Maya Chen",
    participantRole: "customer",
    lastMessage: "Thanks for the bid — reviewing a few options.",
    lastMessageAt: "2026-07-11T07:30:00Z",
    unreadCount: 1,
    messages: [
      {
        id: "pmsg-7",
        conversationId: "pconv-3",
        senderId: "cust-1",
        senderRole: "customer",
        text: "Thanks for the bid — reviewing a few options.",
        createdAt: "2026-07-11T07:30:00Z",
      },
    ],
  },
];

export const mockEarnings: Earning[] = [
  {
    id: "earn-1",
    jobId: "job-a2",
    jobTitle: "Install floating shelves in office",
    customerName: "Priya Shah",
    amount: 115,
    status: "held",
    completedAt: "2026-07-11T09:00:00Z",
  },
  {
    id: "earn-2",
    jobId: "job-past-1",
    jobTitle: "Assemble IKEA wardrobe",
    customerName: "Chris Patel",
    amount: 95,
    status: "paid",
    completedAt: "2026-07-05T16:00:00Z",
    paidAt: "2026-07-06T10:00:00Z",
  },
  {
    id: "earn-3",
    jobId: "job-past-2",
    jobTitle: "Fix squeaky hallway door",
    customerName: "Nina Brooks",
    amount: 65,
    status: "paid",
    completedAt: "2026-06-28T14:20:00Z",
    paidAt: "2026-06-29T09:15:00Z",
  },
  {
    id: "earn-4",
    jobId: "job-past-3",
    jobTitle: "Hang curtain rods (3 windows)",
    customerName: "Omar Hassan",
    amount: 110,
    status: "paid",
    completedAt: "2026-06-20T12:00:00Z",
    paidAt: "2026-06-21T11:00:00Z",
  },
  {
    id: "earn-5",
    jobId: "job-a1",
    jobTitle: "Move couch + dresser across town",
    customerName: "Maya Chen",
    amount: 150,
    status: "pending",
    completedAt: "2026-07-11T08:00:00Z",
  },
];

/**
 * Resolve whether the current provider is approved for bidding/feed.
 * Pass `searchParams.get("pending") === "1"` from the page, or rely on MOCK_FORCE_PENDING.
 */
export function isProviderApproved(pendingQuery?: string | null): boolean {
  if (MOCK_FORCE_PENDING) return false;
  if (pendingQuery === "1" || pendingQuery === "true") return false;
  return PROVIDER_PROFILE.isApproved;
}

export function getProviderProfile(pendingQuery?: string | null): ProviderProfile {
  return isProviderApproved(pendingQuery)
    ? PROVIDER_PROFILE
    : PROVIDER_PROFILE_PENDING;
}

export function getFeedJobById(id: string): FeedJob | undefined {
  return (
    mockFeedJobs.find((j) => j.id === id) ??
    mockActiveJobs.find((j) => j.id === id)
  );
}

export function getProviderBidById(id: string): ProviderBid | undefined {
  return mockProviderBids.find((b) => b.id === id);
}

export function getProviderConversationById(
  id: string,
): Conversation | undefined {
  return mockProviderConversations.find((c) => c.id === id);
}

export function getProviderConversationForJob(
  jobId: string,
): Conversation | undefined {
  return mockProviderConversations.find((c) => c.jobId === jobId);
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}
