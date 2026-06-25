import { useEffect, useRef, useState } from "react";
import Map from "react-map-gl/mapbox";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { mapboxToken } from "@util/vendor/mapbox/mapboxToken";
import { useMapLocation } from "@util/vendor/mapbox/useMapLocation";
import { resolveMapStyle, type SelectableStyleId } from "@util/vendor/mapbox/mapboxStyles";
import { useTheme } from "@util/app/theme";
import type { ViewState } from "react-map-gl/mapbox";
import type { CustomLocalStyleSettings } from "@util/vendor/mapbox/customLocalStyleSettings";
import { applyCustomLocalStyleOverrides } from "@util/vendor/mapbox/customLocalStyleSettings";
import type { StyleSpecification } from "mapbox-gl";

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
  customLocalStyleSettings?: CustomLocalStyleSettings;
};

export function MapViewInner({
  id,
  initialViewState = { longitude: 0, latitude: 20, zoom: 1.5 },
  initialStyleId = "custom",
  styleId: controlledStyleId,
  height = "100%",
  style,
  children,
  customLocalStyleSettings,
}: Props) {
  const [map_loaded, set_map_loaded] = useState(false);
  const { resolved_theme } = useTheme();
  const {
    viewState,
    styleId: internalStyleId,
    onMove,
  } = useMapLocation(initialViewState, initialStyleId, id);
  const styleId = controlledStyleId ?? internalStyleId;
  const baseMapStyle = resolveMapStyle(styleId, resolved_theme);
  const [resolvedStyle, setResolvedStyle] = useState<string | StyleSpecification>(baseMapStyle);
  const originalStyleRef = useRef<StyleSpecification | null>(null);

  useEffect(() => {
    if (styleId !== "custom-local" || !customLocalStyleSettings) {
      originalStyleRef.current = null;
      setResolvedStyle(baseMapStyle);
      return;
    }

    if (originalStyleRef.current) {
      setResolvedStyle(
        applyCustomLocalStyleOverrides(originalStyleRef.current, customLocalStyleSettings),
      );
      return;
    }

    let cancelled = false;
    const url = `${import.meta.env.BASE_URL}mapbox/custom-local-light.json`;
    fetch(url)
      .then((res) => res.json())
      .then((style: StyleSpecification) => {
        if (cancelled) return;
        originalStyleRef.current = style;
        setResolvedStyle(applyCustomLocalStyleOverrides(style, customLocalStyleSettings));
      })
      .catch(() => {
        if (cancelled) return;
        setResolvedStyle(baseMapStyle);
      });

    return () => {
      cancelled = true;
    };
  }, [baseMapStyle, customLocalStyleSettings, styleId]);

  return (
    <Map
      {...viewState}
      onMove={onMove}
      onLoad={() => set_map_loaded(true)}
      mapboxAccessToken={mapboxToken}
      style={{ width: "100%", height, ...style }}
      mapStyle={resolvedStyle}
      reuseMaps
      fadeDuration={0}
    >
      {map_loaded ? children : null}
    </Map>
  );
}

export default MapViewInner;
