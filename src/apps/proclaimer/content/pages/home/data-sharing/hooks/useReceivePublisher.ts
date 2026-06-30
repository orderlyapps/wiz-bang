import { useRef, useState } from "react";
import { importPublisherLocalData } from "@shared/database/rxdb/helper/publisherLocalExportImport";
import { createPeerConnection } from "@util/vendor/webrtc/peer-connection";
import { onDataChannelMessage } from "@util/vendor/webrtc/data-channel";
import { getDeviceId } from "@util/app/device/device-id";
import type { PeerConnectionHandle } from "@util/vendor/webrtc/peer-connection";
import type { SharePayload } from "@util/vendor/webrtc/share-payload";

export type ReceiveStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "receiving"
  | "received"
  | "imported"
  | "error";

export function useReceivePublisher(): {
  status: ReceiveStatus;
  receivedCount: number;
  error: Error | null;
  receive: (session_id: string) => Promise<void>;
  cancel: () => void;
} {
  const [status, setStatus] = useState<ReceiveStatus>("idle");
  const [receivedCount, setReceivedCount] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const handleRef = useRef<PeerConnectionHandle | null>(null);

  function cancel() {
    handleRef.current?.close();
    handleRef.current = null;
    setStatus("idle");
    setReceivedCount(0);
  }

  async function receive(session_id: string) {
    const device_id = getDeviceId();
    setStatus("connecting");
    setError(null);
    setReceivedCount(0);

    try {
      const handle = createPeerConnection({
        session_id,
        device_id,
        onDataChannel: (channel) => {
          setStatus("receiving");
          onDataChannelMessage<SharePayload>(
            channel,
            (payload) => {
              if (payload.type === "publisher-local" && Array.isArray(payload.data)) {
                setReceivedCount(payload.data.length);
                setStatus("received");
                const file = new File([JSON.stringify(payload.data)], "received.json", {
                  type: "application/json",
                });
                void importPublisherLocalData(file).then(() => {
                  setStatus("imported");
                });
              }
            },
            (err) => {
              setError(err);
              setStatus("error");
            },
          );
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
      handle.signaling.send({ type: "ready", from_device_id: device_id });
    } catch (err) {
      const wrapped = err instanceof Error ? err : new Error(String(err));
      setError(wrapped);
      setStatus("error");
      handleRef.current?.close();
      handleRef.current = null;
    }
  }

  return { status, receivedCount, error, receive, cancel };
}
