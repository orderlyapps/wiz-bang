import { useDoNotCallClickHandler } from "../../hooks/useDoNotCallClickHandler";
import type { DoNotCall } from "../../types";

type DoNotCallClickHandlerProps = {
  onSelect: (doNotCall: DoNotCall) => void;
};

export function DoNotCallClickHandler({ onSelect }: DoNotCallClickHandlerProps) {
  useDoNotCallClickHandler({ onSelect });
  return null;
}
