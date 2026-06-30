import { useEffect, useState } from "react";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { getDeviceId } from "@util/app/device/device-id";
import type { Session } from "@supabase/supabase-js";

export interface TrustedPeer {
  id: string;
  user_id: string;
  device_name: string;
  is_own_device: boolean;
  trusted_at: string | null;
}

export function useTrustedDevices(session: Session | null): {
  peers: TrustedPeer[];
  isLoading: boolean;
  error: Error | null;
} {
  const [peers, setPeers] = useState<TrustedPeer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!session?.user) {
      setIsLoading(false);
      return;
    }

    const user_id = session.user.id;
    const own_device_id = getDeviceId();

    async function load() {
      try {
        const [devicesResult, trustResult] = await Promise.all([
          supabase
            .from("device")
            .select("id, user_id, device_name, created_at")
            .eq("user_id", user_id),
          supabase
            .from("device_trust")
            .select("id, owner_id, trusted_user_id, trusted_device_id, device_name, created_at")
            .eq("owner_id", user_id),
        ]);

        if (devicesResult.error) throw devicesResult.error;
        if (trustResult.error) throw trustResult.error;

        const ownDevices = (devicesResult.data ?? []).map((device) => ({
          id: device.id,
          user_id: device.user_id,
          device_name: device.device_name,
          is_own_device: device.id === own_device_id,
          trusted_at: device.created_at,
        }));

        const ownDeviceIds = new Set(ownDevices.map((d) => d.id));
        const seenIds = new Set<string>();
        const merged: TrustedPeer[] = [];

        for (const device of ownDevices) {
          if (seenIds.has(device.id)) continue;
          seenIds.add(device.id);
          merged.push(device);
        }

        for (const trust of trustResult.data ?? []) {
          if (!trust.trusted_device_id) continue;
          if (seenIds.has(trust.trusted_device_id)) continue;
          if (ownDeviceIds.has(trust.trusted_device_id)) continue;

          seenIds.add(trust.trusted_device_id);
          merged.push({
            id: trust.trusted_device_id,
            user_id: trust.trusted_user_id ?? user_id,
            device_name: trust.device_name ?? "Trusted device",
            is_own_device: false,
            trusted_at: trust.created_at,
          });
        }

        setPeers(merged);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    }

    void load();
  }, [session]);

  return { peers, isLoading, error };
}
