import { useState, type FormEvent } from "react";
import { LoaderCircle, Save } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { BillingPlanPricesEditor } from "./BillingPlanPricesEditor";

import { useAdminBillingPlan, useUpdateAdminBillingPlan } from "../hooks";
import type {
  AdminBillingPlanDetail,
  AdminBillingPlanFeature,
  UpdateAdminBillingPlanFeatureInput,
} from "../types";

interface BillingPlanManageDialogProps {
  planId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface BillingPlanEditorProps {
  plan: AdminBillingPlanDetail;
  onClose: () => void;
}

type FeatureDraftValue = string | boolean;
type FeatureDrafts = Record<string, FeatureDraftValue>;

function getInitialFeatureValue(
  feature: AdminBillingPlanFeature,
): FeatureDraftValue {
  if (feature.valueType === "BOOLEAN") {
    return feature.value === true;
  }

  if (feature.value === null) {
    return "";
  }

  return String(feature.value);
}

function createFeatureDrafts(plan: AdminBillingPlanDetail): FeatureDrafts {
  return Object.fromEntries(
    plan.features.map((feature) => [
      feature.id,
      getInitialFeatureValue(feature),
    ]),
  );
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to update billing plan";
}

function BillingPlanEditor({ plan, onClose }: BillingPlanEditorProps) {
  const updatePlanMutation = useUpdateAdminBillingPlan();

  const [name, setName] = useState(plan.name);
  const [description, setDescription] = useState(plan.description ?? "");
  const [isActive, setIsActive] = useState(plan.isActive);
  const [isPublic, setIsPublic] = useState(plan.isPublic);
  const [featureValues, setFeatureValues] = useState<FeatureDrafts>(() =>
    createFeatureDrafts(plan),
  );
  const [formError, setFormError] = useState<string | null>(null);

  function updateFeatureValue(featureId: string, value: FeatureDraftValue) {
    setFeatureValues((current) => ({
      ...current,
      [featureId]: value,
    }));
  }

  function buildFeaturePayload(): UpdateAdminBillingPlanFeatureInput[] | null {
    const features: UpdateAdminBillingPlanFeatureInput[] = [];

    for (const feature of plan.features) {
      const draftValue = featureValues[feature.id];

      if (feature.valueType === "BOOLEAN") {
        features.push({
          featureId: feature.id,
          value: draftValue === true,
        });

        continue;
      }

      const textValue = typeof draftValue === "string" ? draftValue.trim() : "";

      if (feature.valueType === "NUMBER") {
        const numberValue = Number(textValue);

        if (
          textValue.length === 0 ||
          !Number.isSafeInteger(numberValue) ||
          numberValue < 0
        ) {
          setFormError(`${feature.name} must be a non-negative whole number.`);

          return null;
        }

        features.push({
          featureId: feature.id,
          value: numberValue,
        });

        continue;
      }

      if (textValue.length === 0) {
        setFormError(`${feature.name} cannot be empty.`);

        return null;
      }

      if (textValue.length > 1000) {
        setFormError(`${feature.name} cannot exceed 1000 characters.`);

        return null;
      }

      features.push({
        featureId: feature.id,
        value: textValue,
      });
    }

    return features;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const normalizedName = name.trim();

    if (!normalizedName) {
      setFormError("Plan name is required.");
      return;
    }

    if (normalizedName.length > 150) {
      setFormError("Plan name cannot exceed 150 characters.");
      return;
    }

    const normalizedDescription = description.trim();

    if (normalizedDescription.length > 2000) {
      setFormError("Plan description cannot exceed 2000 characters.");
      return;
    }

    const features = buildFeaturePayload();

    if (!features) {
      return;
    }

    try {
      await updatePlanMutation.mutateAsync({
        planId: plan.id,
        input: {
          name: normalizedName,
          description: normalizedDescription || null,
          isActive,
          isPublic,
          features,
        },
      });

      onClose();
    } catch (error) {
      setFormError(getErrorMessage(error));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="billing-plan-code">Plan code</Label>

          <Input id="billing-plan-code" value={plan.code} disabled />

          <p className="text-xs text-muted-foreground">
            Plan code cannot be changed.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="billing-plan-name">Plan name</Label>

          <Input
            id="billing-plan-name"
            value={name}
            maxLength={150}
            disabled={updatePlanMutation.isPending}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="billing-plan-description">Description</Label>

          <textarea
            id="billing-plan-description"
            value={description}
            maxLength={2000}
            disabled={updatePlanMutation.isPending}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe this billing plan..."
            className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 min-h-24 w-full resize-y rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
          <div>
            <p className="text-sm font-medium">Active plan</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Allows this plan to be used by the billing system.
            </p>
          </div>

          <Switch
            checked={isActive}
            disabled={updatePlanMutation.isPending}
            onCheckedChange={setIsActive}
          />
        </div>

        <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
          <div>
            <p className="text-sm font-medium">Public plan</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Displays this plan to workspace users.
            </p>
          </div>

          <Switch
            checked={isPublic}
            disabled={updatePlanMutation.isPending}
            onCheckedChange={setIsPublic}
          />
        </div>
      </div>

      <Separator />

      <BillingPlanPricesEditor planId={plan.id} prices={plan.prices} />

      <Separator />

      <div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold">Plan features</h3>

          <p className="mt-1 text-xs text-muted-foreground">
            Configure the limits and capabilities included in this plan.
          </p>
        </div>

        <div className="space-y-3">
          {plan.features.map((feature) => {
            const draftValue = featureValues[feature.id];

            return (
              <div key={feature.id} className="rounded-lg border p-4">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium">{feature.name}</p>

                      <Badge
                        variant="outline"
                        className="rounded-md font-mono text-[10px]"
                      >
                        {feature.code}
                      </Badge>

                      <Badge
                        variant="secondary"
                        className="rounded-md text-[10px]"
                      >
                        {feature.valueType}
                      </Badge>

                      {!feature.isConfigured ? (
                        <Badge
                          variant="outline"
                          className="rounded-md border-amber-200 bg-amber-50 text-[10px] text-amber-700"
                        >
                          Not configured
                        </Badge>
                      ) : null}
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {feature.description ?? "No feature description"}
                    </p>
                  </div>

                  <div className="w-full sm:w-52">
                    {feature.valueType === "BOOLEAN" ? (
                      <div className="flex h-9 items-center justify-between rounded-md border px-3">
                        <span className="text-sm">
                          {draftValue === true ? "Enabled" : "Disabled"}
                        </span>

                        <Switch
                          checked={draftValue === true}
                          disabled={updatePlanMutation.isPending}
                          onCheckedChange={(checked) =>
                            updateFeatureValue(feature.id, checked)
                          }
                        />
                      </div>
                    ) : (
                      <Input
                        type={
                          feature.valueType === "NUMBER" ? "number" : "text"
                        }
                        min={feature.valueType === "NUMBER" ? 0 : undefined}
                        step={feature.valueType === "NUMBER" ? 1 : undefined}
                        value={typeof draftValue === "string" ? draftValue : ""}
                        disabled={updatePlanMutation.isPending}
                        onChange={(event) =>
                          updateFeatureValue(feature.id, event.target.value)
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {formError ? (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {formError}
        </div>
      ) : null}

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          disabled={updatePlanMutation.isPending}
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={updatePlanMutation.isPending}>
          {updatePlanMutation.isPending ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}

          {updatePlanMutation.isPending ? "Saving..." : "Save changes"}
        </Button>
      </DialogFooter>
    </form>
  );
}

export function BillingPlanManageDialog({
  planId,
  open,
  onOpenChange,
}: BillingPlanManageDialogProps) {
  const planQuery = useAdminBillingPlan(open ? planId : null);

  function closeDialog() {
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Manage billing plan</DialogTitle>

          <DialogDescription>
            Review and update plan information, availability and feature limits.
          </DialogDescription>
        </DialogHeader>

        {planQuery.isPending ? (
          <div className="flex min-h-56 items-center justify-center gap-2 text-sm text-muted-foreground">
            <LoaderCircle className="size-4 animate-spin" />
            Loading plan details…
          </div>
        ) : planQuery.isError ? (
          <div className="space-y-4 py-8 text-center">
            <p className="text-sm text-rose-600">
              {planQuery.error instanceof Error
                ? planQuery.error.message
                : "Unable to load billing plan"}
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={() => void planQuery.refetch()}
            >
              Try again
            </Button>
          </div>
        ) : planQuery.data ? (
          <BillingPlanEditor
            key={planQuery.data.id}
            plan={planQuery.data}
            onClose={closeDialog}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
