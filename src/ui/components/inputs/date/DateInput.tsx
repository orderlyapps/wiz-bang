import { IonDatetime, IonDatetimeButton, IonModal } from "@ionic/react";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";

interface DateInputProps {
  label: string;
  value: string;
  disabled?: boolean;
  on_change: (value: string) => void;
}

export function DateInput({ label, value, disabled = false, on_change }: DateInputProps) {
  const iso_value = value ? `${value}T00:00:00` : undefined;

  function handleChange(detail_value: string | string[] | null | undefined) {
    if (!detail_value || Array.isArray(detail_value)) return;
    on_change(detail_value.substring(0, 10));
  }

  return (
    <InputWrapper label={label}>
      <IonDatetimeButton datetime="date-input" disabled={disabled} />
      <IonModal keepContentsMounted>
        <IonDatetime
          id="date-input"
          presentation="date"
          value={iso_value}
          showDefaultButtons
          onIonChange={(e) => handleChange(e.detail.value)}
        />
      </IonModal>
    </InputWrapper>
  );
}
