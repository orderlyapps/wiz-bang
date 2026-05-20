import Map from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { mapboxToken } from "@util/vendor/mapbox/mapboxToken";
import { useMapLocation } from "@util/vendor/mapbox/useMapLocation";
import { resolveMapStyle, type SelectableStyleId } from "@util/vendor/mapbox/mapboxStyles";
import { useTheme } from "@util/app/theme";
import type { ViewState } from "react-map-gl/mapbox";

type Props = {
  id?: string;
  initialViewState?: Partial<ViewState>;
  initialStyleId?: SelectableStyleId;
  styleId?: SelectableStyleId;
  height?: string | number;
  style?: React.CSSProperties;
};

export function MapView({
  id,
  initialViewState = { longitude: 0, latitude: 20, zoom: 1.5 },
  initialStyleId = "streets-v12",
  styleId: controlledStyleId,
  height = "100%",
  style,
}: Props) {
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
      mapboxAccessToken={mapboxToken}
      style={{ width: "100%", height, ...style }}
      mapStyle={mapStyle}
    />
  );
}
