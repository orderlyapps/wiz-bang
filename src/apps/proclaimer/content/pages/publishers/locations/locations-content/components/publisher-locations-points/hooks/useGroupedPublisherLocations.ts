import { useLiveQuery } from "@tanstack/react-db";
import { publisherCollection } from "@shared/database/collections/publisher";
import { usePublisherAddressPoints } from "@proclaimer-content/pages/publishers/locations/locations-content/components/publisher-locations-heatmap/hooks/usePublisherAddressPoints";
import type { Publisher } from "@shared/database/schemas/publisher";

export type PublisherAtAddress = {
  publisher_id: string;
  display_name: string;
};

export type AddressPublisherGroup = {
  group_key: string;
  coordinates: [number, number];
  publishers: PublisherAtAddress[];
};

function getPublisherDisplayName(publisher?: Publisher): string {
  if (!publisher) return "Unknown";
  if (publisher.display_name) return publisher.display_name;
  const name = `${publisher.first_name ?? ""} ${publisher.last_name ?? ""}`.trim();
  return name || "Unknown";
}

export function useGroupedPublisherLocations(): AddressPublisherGroup[] | null {
  const points = usePublisherAddressPoints();
  const { data } = useLiveQuery((q) => q.from({ p: publisherCollection }));
  if (!points || !data) return null;

  const publisherMap = new Map<string, Publisher>();
  for (const publisher of data) {
    if (publisher.id) publisherMap.set(publisher.id, publisher);
  }

  const groups = new Map<string, AddressPublisherGroup>();
  for (const point of points) {
    const key = `${point.coordinates[0]},${point.coordinates[1]}`;
    const publisher = publisherMap.get(point.publisher_id);

    if (!groups.has(key)) {
      groups.set(key, {
        group_key: key,
        coordinates: point.coordinates,
        publishers: [],
      });
    }

    groups.get(key)!.publishers.push({
      publisher_id: point.publisher_id,
      display_name: getPublisherDisplayName(publisher),
    });
  }

  return Array.from(groups.values());
}
