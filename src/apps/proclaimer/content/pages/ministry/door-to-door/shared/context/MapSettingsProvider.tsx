import { type ReactNode } from "react";
import { SelectedMapProvider } from "./SelectedMapContext";
import { MapDisplayModeProvider } from "./MapDisplayModeContext";

export function MapSettingsProvider({ children }: { children: ReactNode }) {
  return (
    <SelectedMapProvider>
      <MapDisplayModeProvider>{children}</MapDisplayModeProvider>
    </SelectedMapProvider>
  );
}
