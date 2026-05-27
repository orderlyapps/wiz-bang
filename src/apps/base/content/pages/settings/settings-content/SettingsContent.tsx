import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function SettingsContent() {
  return (
    <>
      <NavItem label="Appearance" to="/settings/appearance" />
      <NavItem label="Info" to="/settings/info" />
    </>
  );
}
