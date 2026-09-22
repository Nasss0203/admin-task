import { useQuery } from "@tanstack/react-query";

import { billingApi } from "../api";
import { billingQueryKeys } from "./billing-query-keys";

export function useAdminBillingOverview() {
  return useQuery({
    queryKey: billingQueryKeys.overview(),
    queryFn: billingApi.getOverview,
    staleTime: 30_000,
  });
}
