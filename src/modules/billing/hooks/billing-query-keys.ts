import type {
  AdminBillingPaymentOrderListParams,
  AdminBillingPlanListParams,
  AdminBillingSubscriptionListParams,
  AdminBillingWebhookEventListParams,
} from "../types";

export const billingQueryKeys = {
  all: ["admin", "billing"] as const,

  overview: () => [...billingQueryKeys.all, "overview"] as const,

  subscriptions: (params: AdminBillingSubscriptionListParams) =>
    [...billingQueryKeys.all, "subscriptions", params] as const,

  plansRoot: () => [...billingQueryKeys.all, "plans"] as const,

  planLists: () => [...billingQueryKeys.plansRoot(), "list"] as const,

  plans: (params: AdminBillingPlanListParams) =>
    [...billingQueryKeys.planLists(), params] as const,

  plan: (planId: string) =>
    [...billingQueryKeys.plansRoot(), "detail", planId] as const,

  paymentOrders: (params: AdminBillingPaymentOrderListParams) =>
    [...billingQueryKeys.all, "payment-orders", params] as const,

  webhookEvents: (params: AdminBillingWebhookEventListParams) =>
    [...billingQueryKeys.all, "webhook-events", params] as const,
};
