import { useMutation, useQueryClient } from "@tanstack/react-query";

import { billingApi } from "../api";
import type { UpdateAdminBillingPlanInput } from "../types";
import { billingQueryKeys } from "./billing-query-keys";

export interface UpdateAdminBillingPlanVariables {
  planId: string;
  input: UpdateAdminBillingPlanInput;
}

export function useUpdateAdminBillingPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ planId, input }: UpdateAdminBillingPlanVariables) =>
      billingApi.updatePlan(planId, input),

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
