import type {
  PaginatedResult,
  PaginationParams,
} from "@/shared/types/pagination.types";

export type BillingProvider = "STRIPE" | "SEPAY";

export type BillingInterval = "MONTHLY" | "YEARLY";

export type BillingFeatureValueType = "BOOLEAN" | "NUMBER" | "STRING";

export type BillingFeatureValue = boolean | number | string;

export type SubscriptionStatus =
  "PENDING" | "ACTIVE" | "PAST_DUE" | "CANCELED" | "EXPIRED";

export type PaymentOrderStatus =
  "PENDING" | "PAID" | "FAILED" | "EXPIRED" | "CANCELED";

export type PaymentTransactionStatus = "PENDING" | "SUCCESS" | "FAILED";

export type BillingWebhookStatus =
  "PENDING" | "PROCESSED" | "FAILED" | "IGNORED";

export interface AdminBillingOverview {
  paidRevenueThisMonth: number;
  activeSubscriptions: number;
  pendingPayments: number;
  failedOrExpiredPayments: number;
  failedWebhookEvents: number;
  currency: string;
}

export interface BillingWorkspaceSummary {
  id: string;
  name: string;
  slug: string;
}

export interface BillingPlanSummary {
  id: string;
  code: string;
  name: string;
}

export interface BillingPlanPriceSummary {
  id: string;
  billingInterval: BillingInterval;
  amount: number;
  currency: string;
}

export interface AdminBillingLatestPayment {
  id: string;
  orderCode: string;
  provider: BillingProvider;
  status: PaymentOrderStatus;
  amount: number;
  currency: string;
  paidAt: string | null;
  createdAt: string;
}

export interface AdminBillingSubscription {
  id: string;
  workspace: BillingWorkspaceSummary;
  plan: BillingPlanSummary;
  planPrice: BillingPlanPriceSummary | null;
  provider: BillingProvider | null;
  status: SubscriptionStatus;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  canceledAt: string | null;
  latestPayment: AdminBillingLatestPayment | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminBillingSubscriptionListParams extends PaginationParams {
  status?: SubscriptionStatus;
  provider?: BillingProvider;
  planCode?: string;
}

export type AdminBillingSubscriptionList =
  PaginatedResult<AdminBillingSubscription>;

export interface AdminBillingPlanPrice {
  id: string;
  billingInterval: BillingInterval;
  currency: string;
  amount: number;
  provider: BillingProvider;
  providerPriceId: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminBillingPlan {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isActive: boolean;
  isPublic: boolean;
  prices: AdminBillingPlanPrice[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminBillingPlanFeature {
  id: string;
  planFeatureId: string | null;
  code: string;
  name: string;
  description: string | null;
  valueType: BillingFeatureValueType;
  value: BillingFeatureValue | null;
  isConfigured: boolean;
}

export interface AdminBillingPlanDetail extends AdminBillingPlan {
  features: AdminBillingPlanFeature[];
}

export interface UpdateAdminBillingPlanFeatureInput {
  featureId: string;
  value: BillingFeatureValue;
}

export interface UpdateAdminBillingPlanInput {
  name?: string;
  description?: string | null;
  isActive?: boolean;
  isPublic?: boolean;
  features?: UpdateAdminBillingPlanFeatureInput[];
}

export interface CreateAdminBillingPlanPriceVersionInput {
  amount: number;
}

export interface AdminBillingPlanListParams extends PaginationParams {
  isActive?: boolean;
  isPublic?: boolean;
  provider?: BillingProvider;
  billingInterval?: BillingInterval;
}

export type AdminBillingPlanList = PaginatedResult<AdminBillingPlan>;

export interface AdminBillingPaymentTransaction {
  id: string;
  provider: BillingProvider;
  providerTransactionId: string | null;
  amount: number;
  currency: string;
  status: PaymentTransactionStatus;
  paidAt: string | null;
  createdAt: string;
}

export interface AdminBillingPaymentOrder {
  id: string;
  subscriptionId: string | null;
  workspace: BillingWorkspaceSummary;
  plan: BillingPlanSummary;
  planPrice: BillingPlanPriceSummary;
  provider: BillingProvider;
  orderCode: string;
  amount: number;
  currency: string;
  status: PaymentOrderStatus;
  expiresAt: string | null;
  paidAt: string | null;
  createdBy: string;
  latestTransaction: AdminBillingPaymentTransaction | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminBillingPaymentOrderListParams extends PaginationParams {
  status?: PaymentOrderStatus;
  provider?: BillingProvider;
  planCode?: string;
}

export type AdminBillingPaymentOrderList =
  PaginatedResult<AdminBillingPaymentOrder>;

export interface AdminBillingWebhookPaymentOrder {
  id: string;
  orderCode: string;
  status: PaymentOrderStatus;
  workspace: BillingWorkspaceSummary;
  plan: BillingPlanSummary;
}

export interface AdminBillingWebhookEvent {
  id: string;
  provider: BillingProvider;
  providerEventId: string;
  eventType: string;
  status: BillingWebhookStatus;
  paymentOrder: AdminBillingWebhookPaymentOrder | null;
  processedAt: string | null;
  createdAt: string;
}

export interface AdminBillingWebhookEventListParams extends PaginationParams {
  provider?: BillingProvider;
  status?: BillingWebhookStatus;
  eventType?: string;
}

export type AdminBillingWebhookEventList =
  PaginatedResult<AdminBillingWebhookEvent>;
