import { useRef, useState } from "react";
import { rxdb } from "@shared/database/rxdb/database";
import { createPeerConnection } from "@util/vendor/webrtc/peer-connection";
import { sendOverDataChannel, waitForDataChannelOpen } from "@util/vendor/webrtc/data-channel";
import { getDeviceId } from "@util/app/device/device-id";
import type { PeerConnectionHandle } from "@util/vendor/webrtc/peer-connection";

export type ShareStatus = "idle" | "connecting" | "connected" | "sending" | "sent" | "error";

export function useSharePublisher(): {
  status: ShareStatus;
  error: Error | null;
  send: (session_id: string) => Promise<void>;
  cancel: () => void;
} {
  const [status, setStatus] = useState<ShareStatus>("idle");
  const [error, setError] = useState<Error | null>(null);
  const handleRef = useRef<PeerConnectionHandle | null>(null);
  const channelRef = useRef<RTCDataChannel | null>(null);

  function cancel() {
    handleRef.current?.close();
    handleRef.current = null;
    channelRef.current = null;
    setStatus("idle");
  }

  async function send(session_id: string) {
    const device_id = getDeviceId();
    setStatus("connecting");
    setError(null);

    try {
      const handle = createPeerConnection({
        session_id,
        device_id,
        onDataChannel: (channel) => {
          channelRef.current = channel;
        },
        onConnected: () => {
          setStatus("connected");
        },
        onError: (err) => {
          setError(err);
          setStatus("error");
        },
        onDisconnected: () => {
          setStatus("idle");
        },
      });

      handleRef.current = handle;
      const channel = handle.createDataChannel("share");
      channelRef.current = channel;

      await handle.waitForPeerReady();
      await handle.startNegotiation();
      await waitForDataChannelOpen(channel);
      setStatus("sending");

      const docs = await rxdb.publisher.find().exec();
      const data = docs.map((doc) => doc.toJSON());
      sendOverDataChannel(channel, { type: "publisher-local", data });

      setStatus("sent");
    } catch (err) {
      const wrapped = err instanceof Error ? err : new Error(String(err));
      setError(wrapped);
      setStatus("error");
      handleRef.current?.close();
      handleRef.current = null;
      channelRef.current = null;
    }
  }

  return { status, error, send, cancel };
}
