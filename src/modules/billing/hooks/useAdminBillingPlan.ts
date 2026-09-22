import { useQuery } from "@tanstack/react-query";

import { billingApi } from "../api";
import { billingQueryKeys } from "./billing-query-keys";

export function useAdminBillingPlan(planId: string | null) {
  return useQuery({
    queryKey: billingQueryKeys.plan(planId ?? ""),
    queryFn: () => {
      if (!planId) {
        throw new Error("Plan ID is required");
      }

      return billingApi.getPlan(planId);
    },
    enabled: Boolean(planId),
    staleTime: 30_000,
  });
}
