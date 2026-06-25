import { useEffect, useRef } from "react";
import { useMap } from "react-map-gl/mapbox";
import type { MapMouseEvent } from "mapbox-gl";

type NotAtHomeClickHandlerProps = {
  onSelect: (id: string) => void;
};

export function NotAtHomeClickHandler({ onSelect }: NotAtHomeClickHandlerProps) {
  const { current: map } = useMap();
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    const currentMap = map;
    if (!currentMap) return;
    function handleClick(event: MapMouseEvent) {
      const features = currentMap!.queryRenderedFeatures(event.point, {
        layers: ["unclustered-point"],
      });
      const feature = features[0];
      if (!feature) return;
      const id = feature.properties?.id;
      if (typeof id === "string") {
        onSelectRef.current(id);
      }
    }
    currentMap.on("click", handleClick);
    return () => {
      currentMap.off("click", handleClick);
    };
  }, [map]);

  return null;
}
