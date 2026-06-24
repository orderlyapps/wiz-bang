import { lazy, Suspense } from "react";
import { Spinner } from "@ui/components/display/spinner/Spinner";
import type { SelectableStyleId } from "@util/vendor/mapbox/mapboxStyles";
import type { ViewState } from "react-map-gl/mapbox";

const LazyMapViewInner = lazy(() => import("@util/vendor/mapbox/map-view/MapViewInner"));

type Props = {
  id?: string;
  initialViewState?: Partial<ViewState>;
  initialStyleId?: SelectableStyleId;
  styleId?: SelectableStyleId;
  height?: string | number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  fallback?: React.ReactNode;
};

export function MapView({ fallback = <Spinner />, ...props }: Props) {
  return (
    <Suspense fallback={fallback}>
      <LazyMapViewInner {...props} />
    </Suspense>
  );
}
