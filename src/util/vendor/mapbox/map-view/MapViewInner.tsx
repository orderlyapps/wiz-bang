import { useState } from "react";
import Map from "react-map-gl/mapbox";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { mapboxToken } from "@util/vendor/mapbox/mapboxToken";
import { useMapLocation } from "@util/vendor/mapbox/useMapLocation";
import { resolveMapStyle, type SelectableStyleId } from "@util/vendor/mapbox/mapboxStyles";
import { useTheme } from "@util/app/theme";
import type { ViewState } from "react-map-gl/mapbox";

mapboxgl.workerCount = 1;
mapboxgl.maxParallelImageRequests = 6;
mapboxgl.prewarm();

type Props = {
  id?: string;
  initialViewState?: Partial<ViewState>;
  initialStyleId?: SelectableStyleId;
  styleId?: SelectableStyleId;
  height?: string | number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

export function MapViewInner({
  id,
  initialViewState = { longitude: 0, latitude: 20, zoom: 1.5 },
  initialStyleId = "custom",
  styleId: controlledStyleId,
  height = "100%",
  style,
  children,
}: Props) {
  const [map_loaded, set_map_loaded] = useState(false);
  const { resolved_theme } = useTheme();
  const {
    viewState,
    styleId: internalStyleId,
    onMove,
  } = useMapLocation(initialViewState, initialStyleId, id);
  const styleId = controlledStyleId ?? internalStyleId;
  const mapStyle = resolveMapStyle(styleId, resolved_theme);

  return (
    <Map
      {...viewState}
      onMove={onMove}
      onLoad={() => set_map_loaded(true)}
      mapboxAccessToken={mapboxToken}
      style={{ width: "100%", height, ...style }}
      mapStyle={mapStyle}
      reuseMaps
      fadeDuration={0}
    >
      {map_loaded ? children : null}
    </Map>
  );
}

export default MapViewInner;
