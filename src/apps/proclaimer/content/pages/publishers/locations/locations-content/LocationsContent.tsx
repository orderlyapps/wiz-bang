import { Redirect } from "react-router-dom";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";

export function LocationsContent() {
  const permissions = usePermissions();
  const can_access =
    permissions.has_elder || permissions.has_congregation_admin || permissions.is_super_admin;

  if (permissions.is_loaded && !can_access) {
    return <Redirect to="/publishers" />;
  }

  return <></>;
}
