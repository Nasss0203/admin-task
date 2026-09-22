import { useState } from "react";
import { LoaderCircle, RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { useCreateAdminBillingPlanPriceVersion } from "../hooks";
import type { AdminBillingPlanPrice } from "../types";
import { formatCurrency } from "../utils/billing-formatters";

interface BillingPlanPricesEditorProps {
  planId: string;
  prices: AdminBillingPlanPrice[];
}

interface BillingPlanPriceRowProps {
  planId: string;
  price: AdminBillingPlanPrice;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to update billing plan price";
}

function BillingPlanPriceRow({ planId, price }: BillingPlanPriceRowProps) {
  const createPriceVersionMutation = useCreateAdminBillingPlanPriceVersion();

  const [amount, setAmount] = useState(String(price.amount));
  const [formError, setFormError] = useState<string | null>(null);

  async function handleUpdatePrice() {
    setFormError(null);

    const normalizedAmount = amount.trim();
    const numericAmount = Number(normalizedAmount);

    if (
      normalizedAmount.length === 0 ||
      !Number.isSafeInteger(numericAmount) ||
      numericAmount <= 0
    ) {
      setFormError("Price must be a positive whole number.");
      return;
    }

    if (numericAmount === price.amount) {
      setFormError("Enter an amount different from the current price.");
      return;
    }

    try {
      await createPriceVersionMutation.mutateAsync({
        planId,
        priceId: price.id,
        input: {
          amount: numericAmount,
        },
      });
    } catch (error) {
      setFormError(getErrorMessage(error));
    }
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className={cn(
                "rounded-md",
                price.provider === "STRIPE"
                  ? "border-violet-200 bg-violet-50 text-violet-700"
                  : "border-blue-200 bg-blue-50 text-blue-700",
              )}
            >
              {price.provider}
            </Badge>

            <Badge variant="secondary" className="rounded-md">
              {price.billingInterval}
            </Badge>

            <Badge variant="outline" className="rounded-md">
              {price.currency}
            </Badge>
          </div>

          <p className="mt-2 text-sm">
            Current price:{" "}
            <span className="font-semibold">
              {formatCurrency(price.amount, price.currency)}
            </span>
          </p>

          <p className="mt-1 font-mono text-[11px] text-muted-foreground">
            {price.id}
          </p>
        </div>

        <div className="w-full space-y-2 lg:w-72">
          <div className="flex gap-2">
            <Input
              type="number"
              min={1}
              step={1}
              value={amount}
              disabled={createPriceVersionMutation.isPending}
              aria-label={`New ${price.provider} ${price.billingInterval} price`}
              onChange={(event) => {
                setAmount(event.target.value);
                setFormError(null);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  void handleUpdatePrice();
                }
              }}
            />

            <Button
              type="button"
              variant="outline"
              disabled={createPriceVersionMutation.isPending}
              onClick={() => void handleUpdatePrice()}
            >
              {createPriceVersionMutation.isPending ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <RefreshCw className="size-4" />
              )}
              Update
            </Button>
          </div>

          {formError ? (
            <p className="text-xs text-rose-600">{formError}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function BillingPlanPricesEditor({
  planId,
  prices,
}: BillingPlanPricesEditorProps) {
  const activePrices = prices
    .filter((price) => price.isActive)
    .sort((left, right) => {
      const intervalOrder = {
        MONTHLY: 1,
        YEARLY: 2,
      };

      const providerOrder = {
        STRIPE: 1,
        SEPAY: 2,
      };

      const intervalDifference =
        intervalOrder[left.billingInterval] -
        intervalOrder[right.billingInterval];

      if (intervalDifference !== 0) {
        return intervalDifference;
      }

      return providerOrder[left.provider] - providerOrder[right.provider];
    });

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-sm font-semibold">Current prices</h3>

        <p className="mt-1 text-xs text-muted-foreground">
          Updating a price creates a new active version. The previous price is
          retained for billing history.
        </p>
      </div>

      {activePrices.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          This plan has no active prices.
        </div>
      ) : (
        <div className="space-y-3">
          {activePrices.map((price) => (
            <BillingPlanPriceRow key={price.id} planId={planId} price={price} />
          ))}
        </div>
      )}
    </div>
  );
}
