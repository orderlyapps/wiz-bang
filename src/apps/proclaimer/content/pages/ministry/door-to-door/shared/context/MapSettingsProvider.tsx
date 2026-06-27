import { type ReactNode } from "react";
import { SelectedMapProvider } from "./SelectedMapContext";
import { MapDisplayModeProvider } from "./MapDisplayModeContext";
import { MapStyleProvider } from "./MapStyleContext";

export function MapSettingsProvider({ children }: { children: ReactNode }) {
  return (
    <SelectedMapProvider>
      <MapDisplayModeProvider>
        <MapStyleProvider>{children}</MapStyleProvider>
      </MapDisplayModeProvider>
    </SelectedMapProvider>
  );
}
