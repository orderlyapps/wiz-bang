import { Redirect } from "react-router-dom";
import { usePermissions } from "@proclaimer-shared/hooks/usePermissions";
import { MapView } from "@util/vendor/mapbox/MapView";
import { PublisherLocationsHeatmap } from "./components/publisher-locations-heatmap/PublisherLocationsHeatmap";

export function LocationsContent() {
  const permissions = usePermissions();
  const can_access =
    permissions.has_elder || permissions.has_congregation_admin || permissions.is_super_admin;

  if (permissions.is_loaded && !can_access) {
    return <Redirect to="/publishers" />;
  }

  return (
    <MapView id="publisher-locations" style={{ position: "absolute", inset: 0 }} height="100%">
      <PublisherLocationsHeatmap />
    </MapView>
  );
}
