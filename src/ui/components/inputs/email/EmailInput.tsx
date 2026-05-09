import { IonInput } from "@ionic/react";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

interface EmailInputProps {
  label: string;
  value: string;
  placeholder?: string;
  color?: IonicColor;
  disabled?: boolean;
  readonly?: boolean;
  clear_input?: boolean;
  on_change: (value: string) => void;
  on_blur?: () => void;
}

export function EmailInput({
  label,
  value,
  placeholder,
  color,
  disabled = false,
  readonly = false,
  clear_input = false,
  on_change,
  on_blur,
}: EmailInputProps) {
  return (
    <InputWrapper label={label}>
      <IonInput
        value={value}
        type="email"
        placeholder={placeholder}
        color={color}
        disabled={disabled}
        readonly={readonly}
        clearInput={clear_input}
        onIonInput={(event) => on_change(event.detail.value ?? "")}
        onIonBlur={on_blur}
        slot="end"
      />
    </InputWrapper>
  );
}
