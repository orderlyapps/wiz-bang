import type { LngLatBoundsLike } from "mapbox-gl";

export type SelectedMap =
  | { type: "map"; id: string; boundary: unknown; bounds: LngLatBoundsLike }
  | { type: "master"; congregation_id: string; boundary: unknown; bounds: LngLatBoundsLike };
