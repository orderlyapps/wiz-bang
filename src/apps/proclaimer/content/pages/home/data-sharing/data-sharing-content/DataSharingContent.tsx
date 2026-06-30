import { useState } from "react";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";
import { SendModal } from "./components/send-modal/SendModal";
import { ReceiveModal } from "./components/receive-modal/ReceiveModal";

export function DataSharingContent() {
  const [send_open, setSendOpen] = useState(false);
  const [receive_open, setReceiveOpen] = useState(false);

  return (
    <>
      <TextButton label="Send" on_click={() => setSendOpen(true)} />
      <Space />
      <TextButton label="Receive" on_click={() => setReceiveOpen(true)} />
      <SendModal is_open={send_open} onClose={() => setSendOpen(false)} />
      <ReceiveModal is_open={receive_open} onClose={() => setReceiveOpen(false)} />
    </>
  );
}
