import { Heading } from "@ui/components/display/text/heading/Heading";
import { Body } from "@ui/components/display/text/body/Body";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { IonItem, IonLabel, IonList } from "@ionic/react";
import { Space } from "@ui/components/layout/space/Space";

interface ShareCodeDisplayProps {
  share_code: string;
}

export function ShareCodeDisplay({ share_code }: ShareCodeDisplayProps) {
  function copyToClipboard() {
    void navigator.clipboard.writeText(share_code);
  }

  return (
    <IonList lines="none">
      <IonItem className="ion-text-center">
        <IonLabel>
          <Heading size="xl">Share Code</Heading>
        </IonLabel>
      </IonItem>

      <IonItem className="ion-text-center">
        <IonLabel>
          <Body size="2xl" bold className="ion-margin-top">
            {share_code}
          </Body>
        </IonLabel>
      </IonItem>

      <IonItem className="ion-text-center">
        <IonLabel>
          <Body size="sm" className="ion-margin-top">
            Give this code to the other device to start the transfer.
          </Body>
        </IonLabel>
      </IonItem>

      <Space />

      <TextButton label="Copy code" on_click={copyToClipboard} />
    </IonList>
  );
}
