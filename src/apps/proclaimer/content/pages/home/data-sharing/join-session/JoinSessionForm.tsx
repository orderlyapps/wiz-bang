import { useState } from "react";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { Body } from "@ui/components/display/text/body/Body";
import { Space } from "@ui/components/layout/space/Space";
import { IonInput, IonItem } from "@ionic/react";

interface JoinSessionFormProps {
  on_join: (share_code: string) => void;
  is_loading: boolean;
  error: Error | null;
}

export function JoinSessionForm({ on_join, is_loading, error }: JoinSessionFormProps) {
  const [share_code, setShareCode] = useState("");

  function submit() {
    if (!share_code.trim()) return;
    on_join(share_code.trim().toUpperCase());
  }

  return (
    <>
      <IonItem>
        <IonInput
          value={share_code}
          onIonInput={(e) => setShareCode(e.detail.value ?? "")}
          disabled={is_loading}
          placeholder="Share code"
        />
      </IonItem>
      {error && (
        <Body size="sm" color="danger" className="ion-margin-top">
          {error.message}
        </Body>
      )}
      <Space />
      <TextButton
        label="Join and receive"
        on_click={submit}
        disabled={is_loading || !share_code.trim()}
      />
    </>
  );
}
