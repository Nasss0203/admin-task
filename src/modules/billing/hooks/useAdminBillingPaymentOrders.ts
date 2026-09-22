import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { billingApi } from "../api";
import type { AdminBillingPaymentOrderListParams } from "../types";
import { billingQueryKeys } from "./billing-query-keys";

export function useAdminBillingPaymentOrders(
  params: AdminBillingPaymentOrderListParams = {},
) {
  return useQuery({
    queryKey: billingQueryKeys.paymentOrders(params),
    queryFn: () => billingApi.getPaymentOrders(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
