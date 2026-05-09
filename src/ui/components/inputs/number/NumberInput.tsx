import { IonInput } from "@ionic/react";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

interface NumberInputProps {
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

export function NumberInput({
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
}: NumberInputProps) {
  return (
    <InputWrapper label={label}>
      <IonInput
        value={value}
        type="number"
        placeholder={placeholder}
        color={color}
        disabled={disabled}
        readonly={readonly}
        clearInput={clear_input}
        maxlength={max_length}
        onIonInput={(event) => on_change(event.detail.value ?? "")}
        onIonBlur={on_blur}
        slot="end"
      />
    </InputWrapper>
  );
}
