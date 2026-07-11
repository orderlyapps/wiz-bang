import { IonList, IonItem, IonNote, IonButton } from "@ionic/react";
import { PasswordInput } from "@ui/components/inputs/password/PasswordInput";
import { Space } from "@ui/components/layout/space/Space";

interface UpdatePasswordFormProps {
  password: string;
  confirm_password: string;
  loading: boolean;
  error: string | null;
  on_password_change: (value: string) => void;
  on_confirm_change: (value: string) => void;
  on_save: () => void;
}

export function UpdatePasswordForm({
  password,
  confirm_password,
  loading,
  error,
  on_password_change,
  on_confirm_change,
  on_save,
}: UpdatePasswordFormProps) {
  return (
    <>
      <IonList inset>
        <PasswordInput
          label="New password"
          value={password}
          placeholder="At least 6 characters"
          on_change={on_password_change}
          disabled={loading}
          autocomplete="new-password"
        />
        <PasswordInput
          label="Confirm password"
          value={confirm_password}
          placeholder="Re-enter password"
          on_change={on_confirm_change}
          disabled={loading}
          autocomplete="new-password"
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
        onClick={on_save}
        disabled={!password || !confirm_password || loading}
      >
        {loading ? "Saving…" : "Save Password"}
      </IonButton>
    </>
  );
}
