import { useState } from "react";
import { supabase } from "@util/vendor/supabase/supabase-client";
import { getDeviceId, registerDevice } from "@util/app/device/device-id";
import type { Session } from "@supabase/supabase-js";

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (err && typeof err === "object" && "message" in err) {
    return String((err as { message: unknown }).message);
  }
  return String(err);
}

export interface ShareSession {
  session_id: string;
  share_code: string;
  is_sender: boolean;
}

function generateShareCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let index = 0; index < 6; index++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function useShareSession(session: Session | null): {
  session: ShareSession | null;
  isLoading: boolean;
  error: Error | null;
  createSession: () => Promise<ShareSession | null>;
  joinSession: (share_code: string) => Promise<string | null>;
  clearSession: () => void;
} {
  const [shareSession, setShareSession] = useState<ShareSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function createSession() {
    if (!session?.user) return null;
    setIsLoading(true);
    setError(null);

    try {
      await registerDevice();
    } catch (err) {
      const wrapped = new Error(`Failed to register device: ${errorMessage(err)}`);
      setError(wrapped);
      setIsLoading(false);
      return null;
    }

    const device_id = getDeviceId();
    const maxAttempts = 3;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const share_code = generateShareCode();
        const { data, error: insertError } = await supabase
          .from("data_share_session")
          .insert({
            share_code,
            created_by: session.user.id,
            created_by_device_id: device_id,
            status: "active",
            expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
          })
          .select("id, share_code")
          .single();

        if (insertError) throw insertError;
        if (!data) throw new Error("Failed to create share session");

        const created: ShareSession = {
          session_id: data.id,
          share_code: data.share_code,
          is_sender: true,
        };
        setShareSession(created);
        setIsLoading(false);
        return created;
      } catch (err) {
        const isUniqueViolation =
          err &&
          typeof err === "object" &&
          "code" in err &&
          err.code === "23505" &&
          attempt < maxAttempts - 1;
        if (!isUniqueViolation) {
          const wrapped = new Error(errorMessage(err));
          setError(wrapped);
          setIsLoading(false);
          return null;
        }
      }
    }

    setIsLoading(false);
    return null;
  }

  async function joinSession(share_code: string) {
    if (!session?.user) return null;
    setIsLoading(true);
    setError(null);

    try {
      const normalizedCode = share_code.toUpperCase().trim();
      const { data: session_id, error: lookupError } = await supabase.rpc("validate_share_code", {
        p_share_code: normalizedCode,
      });

      if (lookupError) throw lookupError;
      if (!session_id) throw new Error("Invalid or expired share code");

      const device_id = getDeviceId();
      const { error: insertError } = await supabase.from("data_share_session_participant").insert({
        session_id,
        user_id: session.user.id,
        device_id,
      });

      if (insertError) throw insertError;

      const joined: ShareSession = {
        session_id,
        share_code: normalizedCode,
        is_sender: false,
      };
      setShareSession(joined);
      return session_id;
    } catch (err) {
      const wrapped = new Error(errorMessage(err));
      setError(wrapped);
      return null;
    } finally {
      setIsLoading(false);
    }
  }

  function clearSession() {
    setShareSession(null);
    setError(null);
  }

  return { session: shareSession, isLoading, error, createSession, joinSession, clearSession };
}
