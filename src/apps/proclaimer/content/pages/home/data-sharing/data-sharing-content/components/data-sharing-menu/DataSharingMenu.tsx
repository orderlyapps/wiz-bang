import { useState } from "react";
import { TrustedPeersList } from "../../../trusted-peers/TrustedPeersList";
import { JoinSessionForm } from "../../../join-session/JoinSessionForm";
import { ReceiveConfirm } from "../../../receive-confirm/ReceiveConfirm";
import { ShareCodeDisplay } from "../../../share-code/ShareCodeDisplay";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Body } from "@ui/components/display/text/body/Body";
import type { TrustedPeer } from "../../../hooks/useTrustedDevices";
import type { ReceiveStatus } from "../../../hooks/useReceivePublisher";
import type { ShareStatus } from "../../../hooks/useSharePublisher";
import { Space } from "@ui/components/layout/space/Space";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";

interface DataSharingMenuProps {
  peers: TrustedPeer[];
  peers_loading: boolean;
  session_loading: boolean;
  is_authenticated: boolean;
  errors: Error[];
  receive_status: ReceiveStatus;
  received_count: number;
  send_status: ShareStatus;
  share_code: string | null;
  on_share_to_peer: (peer: TrustedPeer) => void;
  on_send_new: () => void;
  on_receive: () => void;
  on_join: (share_code: string) => void;
  on_receive_done: () => void;
  on_send_done: () => void;
}

export function DataSharingMenu({
  peers,
  peers_loading,
  session_loading,
  is_authenticated,
  errors,
  receive_status,
  received_count,
  send_status,
  share_code,
  on_share_to_peer,
  on_send_new,
  on_join,
  on_receive_done,
  on_send_done,
}: DataSharingMenuProps) {
  const [show_join_modal, setShowJoinModal] = useState(false);
  const [show_send_modal, setShowSendModal] = useState(false);

  function handleJoin(share_code: string) {
    on_join(share_code);
  }

  function handleDone() {
    setShowJoinModal(false);
    on_receive_done();
  }

  function handleSend() {
    setShowSendModal(true);
    on_send_new();
  }

  function handleSendDone() {
    setShowSendModal(false);
    on_send_done();
  }

  return (
    <>
      <TrustedPeersList peers={peers} is_loading={peers_loading} on_share={on_share_to_peer} />

      <Space />

      <TextButton
        label="Send to new device"
        on_click={handleSend}
        disabled={session_loading || !is_authenticated}
      />

      <ResponsiveModal isOpen={show_send_modal} onDidDismiss={handleSendDone} fullscreen={false}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Send Data</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={handleSendDone}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <Space />

          {send_status === "idle" || !share_code ? (
            <Spinner size="lg" />
          ) : send_status === "sent" || send_status === "error" ? (
            <>
              {share_code && <ShareCodeDisplay share_code={share_code} />}
              <TextButton label="Done" on_click={handleSendDone} />
            </>
          ) : (
            <ShareCodeDisplay share_code={share_code} />
          )}
        </IonContent>
      </ResponsiveModal>

      {errors.map((error, index) => {
        console.log(error);
        return (
          <Body key={index} size="sm" color="danger" className="ion-margin-top">
            {error.message}
          </Body>
        );
      })}

      <Space />

      <TextButton label="Receive data" on_click={() => setShowJoinModal(true)} />

      <ResponsiveModal isOpen={show_join_modal} onDidDismiss={handleDone} fullscreen={false}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Receive Data</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={handleDone}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="flex-center">
            <div>
              {receive_status === "imported" ? (
                <ReceiveConfirm received_count={received_count} on_done={handleDone} />
              ) : receive_status !== "idle" && receive_status !== "error" ? (
                <Spinner size="lg" />
              ) : (
                <JoinSessionForm on_join={handleJoin} is_loading={session_loading} error={null} />
              )}
            </div>
          </div>
        </IonContent>
      </ResponsiveModal>
    </>
  );
}
