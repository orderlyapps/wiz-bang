import { IonInput } from "@ionic/react";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

export interface BaseInputProps {
  type: "text" | "password" | "email" | "number";
  label: string;
  value: string;
  placeholder?: string;
  color?: IonicColor;
  disabled?: boolean;
  readonly?: boolean;
  clear_input?: boolean;
  max_length?: number;
  on_change: (value: string) => void;
  on_blur?: () => void;
}

export function BaseInput({
  type,
  label,
  value,
  placeholder,
  color,
  disabled = false,
  readonly = false,
  clear_input = false,
  max_length,
  on_change,
  on_blur,
}: BaseInputProps) {
  return (
    <InputWrapper label={label} disabled={disabled}>
      <IonInput
        value={value}
        type={type}
        placeholder={placeholder}
        color={color}
        disabled={disabled}
        readonly={readonly}
        clearInput={value ? clear_input : false}
        maxlength={max_length}
        onIonInput={(event) => on_change(event.detail.value ?? "")}
        onIonBlur={on_blur}
        slot="end"
      />
    </InputWrapper>
  );
}
