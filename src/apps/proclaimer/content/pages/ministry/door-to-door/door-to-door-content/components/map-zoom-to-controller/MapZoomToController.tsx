import { useEffect } from "react";
import { useMap } from "react-map-gl/mapbox";

export type ZoomToFn = (coordinates: [number, number]) => void;

type MapZoomToControllerProps = {
  zoomToRef: React.MutableRefObject<ZoomToFn | null>;
};

export function MapZoomToController({ zoomToRef }: MapZoomToControllerProps) {
  const { current: map } = useMap();

  useEffect(() => {
    if (!map) return;
    zoomToRef.current = (coordinates) => {
      map.flyTo({ center: coordinates, zoom: 17 });
    };
    return () => {
      zoomToRef.current = null;
    };
  }, [map, zoomToRef]);

  return null;
}
