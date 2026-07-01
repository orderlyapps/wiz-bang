import { Select } from "@ui/components/inputs/select/Select";
import type { Outline } from "@shared/database/schemas/outline";

interface OutlineSelectProps {
  label: string;
  value: string | null;
  placeholder: string;
  outlines: Outline[];
  disabled?: boolean;
  on_change: (outline_id: string | null) => void;
}

export function OutlineSelect({
  label,
  value,
  placeholder,
  outlines,
  disabled = false,
  on_change,
}: OutlineSelectProps) {
  return (
    <Select
      label={label}
      value={value ?? ""}
      placeholder={placeholder}
      disabled={disabled}
      options={outlines.map((outline) => ({
        value: outline.id,
        label: `${outline.id}: ${outline.theme}`,
      }))}
      on_change={(selected) => {
        on_change((selected as string) || null);
      }}
    />
  );
}
