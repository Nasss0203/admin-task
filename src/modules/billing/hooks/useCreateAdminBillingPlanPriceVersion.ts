import { useMutation, useQueryClient } from "@tanstack/react-query";

import { billingApi } from "../api";
import type { CreateAdminBillingPlanPriceVersionInput } from "../types";
import { billingQueryKeys } from "./billing-query-keys";

export interface CreateAdminBillingPlanPriceVersionVariables {
  planId: string;
  priceId: string;
  input: CreateAdminBillingPlanPriceVersionInput;
}

export function useCreateAdminBillingPlanPriceVersion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      planId,
      priceId,
      input,
    }: CreateAdminBillingPlanPriceVersionVariables) =>
      billingApi.createPlanPriceVersion(planId, priceId, input),

    onSuccess: (updatedPlan) => {
      queryClient.setQueryData(
        billingQueryKeys.plan(updatedPlan.id),
        updatedPlan,
      );

      void queryClient.invalidateQueries({
        queryKey: billingQueryKeys.planLists(),
      });
    },
  });
}
