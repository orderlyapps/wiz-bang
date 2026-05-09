import { IonSelect, IonSelectOption } from "@ionic/react";
import { InputWrapper } from "@ui/components/display/input/InputWrapper";
import type { IonicColor } from "@util/vendor/ionic/types/IonicColor";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  value: string | string[] | null;
  options: SelectOption[];
  placeholder?: string;
  color?: IonicColor;
  disabled?: boolean;
  multiple?: boolean;
  interface_type?: "alert" | "popover" | "action-sheet";
  on_change: (value: string | string[] | null) => void;
}

export function Select({
  label,
  value,
  options,
  placeholder,
  color,
  disabled = false,
  multiple = false,
  interface_type = "alert",
  on_change,
}: SelectProps) {
  return (
    <InputWrapper label={label}>
      <IonSelect
        value={value}
        placeholder={placeholder}
        color={color}
        disabled={disabled}
        multiple={multiple}
        interface={interface_type}
        onIonChange={(event) => on_change(event.detail.value)}
        slot="end"
      >
        {options.map((option) => (
          <IonSelectOption key={option.value} value={option.value}>
            {option.label}
          </IonSelectOption>
        ))}
      </IonSelect>
    </InputWrapper>
  );
}
