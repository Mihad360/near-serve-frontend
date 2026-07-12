export type JobStatus =
  | "open"
  | "bidding"
  | "booked"
  | "in_progress"
  | "completed"
  | "disputed";

export type JobLocation = {
  address: string;
  lat: number;
  lng: number;
};

export type Job = {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  status: JobStatus;
  location: JobLocation;
  photos: string[];
  createdAt: string;
  updatedAt: string;
  providerName?: string;
  providerId?: string;
  acceptedBidId?: string;
  bidCount: number;
};

export type BidStatus = "pending" | "accepted" | "rejected" | "lost";

export type Bid = {
  id: string;
  jobId: string;
  providerId: string;
  providerName: string;
  providerRating: number;
  providerJobsCompleted: number;
  amount: number;
  message: string;
  eta: string;
  createdAt: string;
  status: BidStatus;
};

export type ChatMessage = {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: "customer" | "provider";
  text: string;
  createdAt: string;
};

export type Conversation = {
  id: string;
  jobId: string;
  jobTitle: string;
  participantId: string;
  participantName: string;
  participantRole: "customer" | "provider";
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  messages: ChatMessage[];
};

/** Nearby open job in the provider geo feed */
export type FeedJob = Job & {
  distanceKm: number;
  customerName: string;
};

/** Provider's own bid with job context for list views */
export type ProviderBid = Bid & {
  jobTitle: string;
  jobCategory: string;
  customerName: string;
  jobBudget: number;
  jobLocation: JobLocation;
};

export type ProviderProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  categories: string[];
  serviceRadiusKm: number;
  address: string;
  lat: number;
  lng: number;
  isApproved: boolean;
  rating: number;
  jobsCompleted: number;
  memberSince: string;
  payoutMethod: string;
};

/** Stripe Express Connect status — mirrors provider Stripe APIs */
export type StripeAccountStatus = {
  hasAccount: boolean;
  detailsSubmitted: boolean;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  /** Display-only bank last4 once connected */
  bankLast4?: string;
};

export type EarningStatus = "pending" | "paid" | "held";

export type Earning = {
  id: string;
  jobId: string;
  jobTitle: string;
  customerName: string;
  amount: number;
  status: EarningStatus;
  completedAt: string;
  paidAt?: string;
};

export type PaymentStatus =
  | "held"
  | "released"
  | "refunded"
  | "pending"
  | "disputed";

export type Payment = {
  id: string;
  jobId: string;
  jobTitle: string;
  amount: number;
  status: PaymentStatus;
  providerName: string;
  createdAt: string;
  releasedAt?: string;
  method: string;
};
