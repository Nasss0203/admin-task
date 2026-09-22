import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { billingApi } from "../api";
import type { AdminBillingSubscriptionListParams } from "../types";
import { billingQueryKeys } from "./billing-query-keys";

export function useAdminBillingSubscriptions(
  params: AdminBillingSubscriptionListParams = {},
) {
  return useQuery({
    queryKey: billingQueryKeys.subscriptions(params),
    queryFn: () => billingApi.getSubscriptions(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
