import { useEffect, useState } from "react";
import { useAuthSession } from "@util/app/auth/useAuthSession";
import { registerDevice } from "@util/app/device/device-id";
import { useTrustedDevices } from "../hooks/useTrustedDevices";
import { useShareSession } from "../hooks/useShareSession";
import { useSharePublisher } from "../hooks/useSharePublisher";
import { useReceivePublisher } from "../hooks/useReceivePublisher";
import { DataSharingMenu } from "./components/data-sharing-menu/DataSharingMenu";
import { ReceiveFlow } from "./components/receive-flow/ReceiveFlow";

type Flow = "menu" | "receive";

export function DataSharingContent() {
  const session = useAuthSession();
  const [flow, setFlow] = useState<Flow>("menu");

  useEffect(() => {
    if (session?.user) void registerDevice();
  }, [session]);

  const { peers, isLoading: peersLoading } = useTrustedDevices(session);
  const {
    session: shareSession,
    isLoading: sessionLoading,
    error: sessionError,
    createSession,
    joinSession,
    clearSession,
  } = useShareSession(session);
  const {
    status: sendStatus,
    error: sendError,
    send: sendPublisher,
    cancel: cancelSend,
  } = useSharePublisher();
  const {
    status: receiveStatus,
    receivedCount,
    error: receiveError,
    receive: receivePublisher,
    cancel: cancelReceive,
  } = useReceivePublisher();

  async function startSend() {
    const created = await createSession();
    if (!created?.session_id) return;
    await sendPublisher(created.session_id);
  }

  async function startReceive(share_code: string) {
    const session_id = await joinSession(share_code);
    if (!session_id) return;
    await receivePublisher(session_id);
  }

  function reset() {
    clearSession();
    cancelSend();
    cancelReceive();
    setFlow("menu");
  }

  if (flow === "receive") {
    return (
      <ReceiveFlow
        status={receiveStatus}
        received_count={receivedCount}
        error={receiveError}
        on_done={reset}
      />
    );
  }

  return (
    <DataSharingMenu
      peers={peers}
      peers_loading={peersLoading}
      session_loading={sessionLoading}
      is_authenticated={!!session?.user}
      errors={[sessionError, sendError, receiveError].filter(Boolean) as Error[]}
      receive_status={receiveStatus}
      received_count={receivedCount}
      on_share_to_peer={() => void startSend()}
      send_status={sendStatus}
      share_code={shareSession?.share_code ?? null}
      on_send_new={() => void startSend()}
      on_receive={() => setFlow("receive")}
      on_join={(share_code) => void startReceive(share_code)}
      on_receive_done={reset}
      on_send_done={reset}
    />
  );
}
