import { apiClient } from "@/shared/api";

import type {
  AdminBillingOverview,
  AdminBillingPaymentOrderList,
  AdminBillingPaymentOrderListParams,
  AdminBillingPlanDetail,
  AdminBillingPlanList,
  AdminBillingPlanListParams,
  AdminBillingSubscriptionList,
  AdminBillingSubscriptionListParams,
  AdminBillingWebhookEventList,
  AdminBillingWebhookEventListParams,
  CreateAdminBillingPlanPriceVersionInput,
  UpdateAdminBillingPlanInput,
} from "../types";

export const billingApi = {
  getOverview(): Promise<AdminBillingOverview> {
    return apiClient.get<AdminBillingOverview>("/admin/billing/overview");
  },

  getSubscriptions(
    params: AdminBillingSubscriptionListParams = {},
  ): Promise<AdminBillingSubscriptionList> {
    return apiClient.get<AdminBillingSubscriptionList>(
      "/admin/billing/subscriptions",
      { params },
    );
  },

  getPlans(
    params: AdminBillingPlanListParams = {},
  ): Promise<AdminBillingPlanList> {
    return apiClient.get<AdminBillingPlanList>("/admin/billing/plans", {
      params,
    });
  },

  getPlan(planId: string): Promise<AdminBillingPlanDetail> {
    return apiClient.get<AdminBillingPlanDetail>(
      `/admin/billing/plans/${encodeURIComponent(planId)}`,
    );
  },

  updatePlan(
    planId: string,
    input: UpdateAdminBillingPlanInput,
  ): Promise<AdminBillingPlanDetail> {
    return apiClient.patch<AdminBillingPlanDetail>(
      `/admin/billing/plans/${encodeURIComponent(planId)}`,
      input,
    );
  },

  createPlanPriceVersion(
    planId: string,
    priceId: string,
    input: CreateAdminBillingPlanPriceVersionInput,
  ): Promise<AdminBillingPlanDetail> {
    return apiClient.post<AdminBillingPlanDetail>(
      `/admin/billing/plans/${encodeURIComponent(
        planId,
      )}/prices/${encodeURIComponent(priceId)}/versions`,
      input,
    );
  },

  getPaymentOrders(
    params: AdminBillingPaymentOrderListParams = {},
  ): Promise<AdminBillingPaymentOrderList> {
    return apiClient.get<AdminBillingPaymentOrderList>(
      "/admin/billing/payment-orders",
      { params },
    );
  },

  getWebhookEvents(
    params: AdminBillingWebhookEventListParams = {},
  ): Promise<AdminBillingWebhookEventList> {
    return apiClient.get<AdminBillingWebhookEventList>(
      "/admin/billing/webhook-events",
      { params },
    );
  },
};
