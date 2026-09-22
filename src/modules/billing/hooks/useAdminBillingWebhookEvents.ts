import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { billingApi } from "../api";
import type { AdminBillingWebhookEventListParams } from "../types";
import { billingQueryKeys } from "./billing-query-keys";

export function useAdminBillingWebhookEvents(
  params: AdminBillingWebhookEventListParams = {},
) {
  return useQuery({
    queryKey: billingQueryKeys.webhookEvents(params),
    queryFn: () => billingApi.getWebhookEvents(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
