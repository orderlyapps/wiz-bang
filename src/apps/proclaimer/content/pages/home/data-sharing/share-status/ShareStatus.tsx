import { Body } from "@ui/components/display/text/body/Body";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import type { ShareStatus as Status } from "../hooks/useSharePublisher";
import type { ReceiveStatus } from "../hooks/useReceivePublisher";

interface ShareStatusProps {
  mode: "send" | "receive";
  status: Status | ReceiveStatus;
  share_code?: string;
  received_count?: number;
  on_cancel?: () => void;
}

const sendLabels: Record<Status, string> = {
  idle: "Ready to share",
  connecting: "Waiting for peer to connect...",
  connected: "Peer connected. Sending data...",
  sending: "Sending publisher data...",
  sent: "Data sent successfully.",
  error: "Sharing failed.",
};

const receiveLabels: Record<ReceiveStatus, string> = {
  idle: "Ready to receive",
  connecting: "Connecting to sender...",
  connected: "Connected. Waiting for data...",
  receiving: "Receiving publisher data...",
  received: "Data received.",
  imported: "Publisher data imported.",
  error: "Receiving failed.",
};

export function ShareStatus({
  mode,
  status,
  share_code,
  received_count,
  on_cancel,
}: ShareStatusProps) {
  const labels = mode === "send" ? sendLabels : receiveLabels;

  return (
    <div className="ion-padding">
      <Heading size="md" bold>
        {mode === "send" ? "Share Your Data" : "Receive Data"}
      </Heading>
      <Body size="md" className="ion-margin-top">
        {labels[status as keyof typeof labels]}
      </Body>
      {share_code && (
        <Body size="lg" bold className="ion-margin-top">
          Share code: {share_code}
        </Body>
      )}
      {received_count !== undefined && received_count > 0 && (
        <Body size="md" className="ion-margin-top">
          Received {received_count} publishers.
        </Body>
      )}
      {status !== "idle" && status !== "sent" && status !== "imported" && status !== "error" && (
        <TextButton label="Cancel" color="medium" on_click={on_cancel} />
      )}
    </div>
  );
}
