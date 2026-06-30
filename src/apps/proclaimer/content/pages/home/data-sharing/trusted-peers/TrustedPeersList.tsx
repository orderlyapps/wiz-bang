import { Heading } from "@ui/components/display/text/heading/Heading";
import { Body } from "@ui/components/display/text/body/Body";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { AlertTextInput } from "@ui/components/inputs/alert-text/AlertTextInput";
import { useState } from "react";
import { getDeviceName, setDeviceName } from "@util/app/device/device-id";
import type { TrustedPeer } from "../hooks/useTrustedDevices";
import { IonItem, IonList } from "@ionic/react";
import { Space } from "@ui/components/layout/space/Space";

interface TrustedPeersListProps {
  peers: TrustedPeer[];
  is_loading: boolean;
  on_share: (peer: TrustedPeer) => void;
}

export function TrustedPeersList({ peers, is_loading, on_share }: TrustedPeersListProps) {
  const [device_name, setDeviceNameState] = useState(getDeviceName());

  function updateName(value: string) {
    setDeviceNameState(value);
    setDeviceName(value);
  }

  if (is_loading) {
    return <Body size="md">Loading trusted devices...</Body>;
  }

  return (
    <>
      <AlertTextInput
        label="Device Name"
        value={device_name}
        on_change={updateName}
        placeholder="My phone"
      />

      <Space />

      <IonItem>
        <Heading size="md">Trusted Devices & Users</Heading>
      </IonItem>
      {peers.length === 0 ? (
        <Body size="md" className="ion-margin-top">
          No trusted devices yet. Share your data using a share code below, and the device you
          connect to will appear here.
        </Body>
      ) : (
        <IonList>
          {peers.map((peer) => (
            <IonItem
              key={peer.id}
              className="ion-margin-top"
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              <Body size="md">
                {peer.device_name}
                {peer.is_own_device ? " (this device)" : ""}
              </Body>
              <TextButton
                label="Share"
                size="small"
                fill="outline"
                on_click={() => on_share(peer)}
                slot="end"
              />
            </IonItem>
          ))}
        </IonList>
      )}
    </>
  );
}
