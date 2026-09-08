"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const FULFILLMENT_OPTIONS = ["unfulfilled", "in_production", "shipped", "delivered"] as const;

export function OrderStatusForm({
  orderId,
  fulfillmentStatus,
  trackingNumber,
  trackingUrl
}: {
  orderId: string;
  fulfillmentStatus: string;
  trackingNumber: string | null;
  trackingUrl: string | null;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(fulfillmentStatus);
  const [tracking, setTracking] = useState(trackingNumber ?? "");
  const [trackingLink, setTrackingLink] = useState(trackingUrl ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fulfillmentStatus: status,
          trackingNumber: tracking,
          trackingUrl: trackingLink
        })
      });
      if (!res.ok) throw new Error("Update failed");
      router.refresh();
    } catch {
      setError("Couldn't save. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-4">
      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-muted">Fulfillment status</p>
        <div className="flex flex-wrap gap-2">
          {FULFILLMENT_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setStatus(option)}
              className={`border px-3 py-2 text-xs uppercase tracking-[0.14em] ${
                status === option ? "border-amber text-cream" : "border-border text-muted"
              }`}
            >
              {option.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>
      <Input label="Tracking number" value={tracking} onChange={(event) => setTracking(event.target.value)} />
      <Input label="Tracking URL" value={trackingLink} onChange={(event) => setTrackingLink(event.target.value)} />
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <Button variant="solid" type="button" disabled={saving} onClick={handleSave}>
        {saving ? "Saving…" : "Save"}
      </Button>
    </div>
  );
}
