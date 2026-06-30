import { ShareStatus } from "../../../share-status/ShareStatus";
import { ReceiveConfirm } from "../../../receive-confirm/ReceiveConfirm";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import type { ReceiveStatus } from "../../../hooks/useReceivePublisher";

interface ReceiveFlowProps {
  status: ReceiveStatus;
  received_count: number;
  error: Error | null;
  on_done: () => void;
}

export function ReceiveFlow({ status, received_count, error, on_done }: ReceiveFlowProps) {
  return (
    <>
      <ShareStatus
        mode="receive"
        status={status}
        received_count={received_count}
        on_cancel={on_done}
      />
      {status === "imported" && (
        <ReceiveConfirm received_count={received_count} on_done={on_done} />
      )}
      {(status === "error" || error) && <TextButton label="Back" on_click={on_done} />}
    </>
  );
}
