import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { billingApi } from "../api";
import type { AdminBillingPlanListParams } from "../types";
import { billingQueryKeys } from "./billing-query-keys";

export function useAdminBillingPlans(params: AdminBillingPlanListParams = {}) {
  return useQuery({
    queryKey: billingQueryKeys.plans(params),
    queryFn: () => billingApi.getPlans(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
