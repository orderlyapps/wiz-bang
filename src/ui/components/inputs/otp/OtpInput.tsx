import { IonInputOtp } from "@ionic/react";

interface OtpInputProps {
  value: string;
  on_change: (value: string) => void;
  length?: number;
  disabled?: boolean;
}

export function OtpInput({ value, on_change, length = 6, disabled = false }: OtpInputProps) {
  return (
    <IonInputOtp
      value={value}
      onIonChange={(e) => on_change(e.detail.value || "")}
      length={length}
      disabled={disabled}
    />
  );
}
