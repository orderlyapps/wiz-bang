import { IonItem, IonLabel } from "@ionic/react";
import { Body } from "@ui/components/display/text/body/Body";
import { Heading } from "@ui/components/display/text/heading/Heading";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Space } from "@ui/components/layout/space/Space";

interface ReceiveConfirmProps {
  received_count: number;
  on_done: () => void;
}

export function ReceiveConfirm({ received_count, on_done }: ReceiveConfirmProps) {
  return (
    <>
      <IonItem className="ion-padding ion-text-center" lines="none">
        <IonLabel>
          <Heading>Data Successfully Imported</Heading>
          <Space />
          <Body size="md">
            {received_count} publisher records have been imported and replaced your local data.
          </Body>
        </IonLabel>
      </IonItem>
      <TextButton label="Done" on_click={on_done} />
    </>
  );
}
