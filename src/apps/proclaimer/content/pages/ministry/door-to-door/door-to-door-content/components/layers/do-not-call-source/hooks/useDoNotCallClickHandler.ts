import { useEffect, useRef } from "react";
import { useMap } from "react-map-gl/mapbox";
import type { MapMouseEvent } from "mapbox-gl";
import type { DoNotCall } from "../types";

const CLICKABLE_LAYERS = ["do-not-call-house-points", "do-not-call-unit-points"];

type UseDoNotCallClickHandlerProps = {
  onSelect: (doNotCall: DoNotCall) => void;
};

export function useDoNotCallClickHandler({ onSelect }: UseDoNotCallClickHandlerProps) {
  const { current: map } = useMap();
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    const currentMap = map;
    if (!currentMap) return;

    function handleClick(event: MapMouseEvent) {
      if (!currentMap) return;
      const features = currentMap.queryRenderedFeatures(event.point, {
        layers: CLICKABLE_LAYERS,
      });
      const feature = features[0];
      if (!feature?.properties) return;

      onSelectRef.current(feature.properties as unknown as DoNotCall);
    }

    currentMap.on("click", handleClick);
    return () => {
      currentMap.off("click", handleClick);
    };
  }, [map]);
}
