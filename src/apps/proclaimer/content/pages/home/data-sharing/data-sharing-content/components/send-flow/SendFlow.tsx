import { ShareStatus } from "../../../share-status/ShareStatus";
import { ShareCodeDisplay } from "../../../share-code/ShareCodeDisplay";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import type { ShareStatus as Status } from "../../../hooks/useSharePublisher";

interface SendFlowProps {
  share_code: string;
  status: Status;
  error: Error | null;
  on_cancel: () => void;
}

export function SendFlow({ share_code, status, error, on_cancel }: SendFlowProps) {
  return (
    <>
      <ShareStatus mode="send" status={status} share_code={share_code} on_cancel={on_cancel} />
      {share_code && <ShareCodeDisplay share_code={share_code} />}
      {(status === "sent" || status === "error" || error) && (
        <TextButton label="Back" on_click={on_cancel} />
      )}
    </>
  );
}
