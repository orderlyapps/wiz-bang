import { useState } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonNote,
  IonButton,
} from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { PasswordInput } from "@ui/components/inputs/password/PasswordInput";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { CloseIconButton } from "@ui/components/inputs/button/icon/close/CloseIconButton";
import { Space } from "@ui/components/layout/space/Space";
import { supabase } from "@util/vendor/supabase/supabase-client";

interface PasswordSignInModalProps {
  publisher_id: string;
  onSignIn: () => void;
}

export function PasswordSignInModal({ publisher_id, onSignIn }: PasswordSignInModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const email = `${publisher_id}@proclaimer.app`;

  const resetState = () => {
    setPassword("");
    setError(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    resetState();
  };

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError(signInError.message);
    } else {
      handleClose();
      onSignIn();
    }
  };

  return (
    <>
      <TextButton on_click={() => setIsOpen(true)} label="Sign In with Password" />
      <ResponsiveModal isOpen={isOpen} onIonModalDidDismiss={handleClose}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Sign In with Password</IonTitle>
            <IonButtons slot="end">
              <CloseIconButton skip_confirmation on_click={handleClose} />
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonList inset>
            <PasswordInput
              label="Password"
              value={password}
              placeholder="Enter your password"
              on_change={setPassword}
              disabled={loading}
            />
            {error && (
              <IonItem lines="none">
                <IonNote color="danger" slot="start">
                  {error}
                </IonNote>
              </IonItem>
            )}
          </IonList>
          <Space />
          <IonButton
            expand="block"
            className="ion-margin-horizontal"
            style={{ maxWidth: 360, marginInline: "auto" }}
            onClick={() => void handleSignIn()}
            disabled={!password || loading}
          >
            {loading ? "Signing in…" : "Sign In"}
          </IonButton>
        </IonContent>
      </ResponsiveModal>
    </>
  );
}
