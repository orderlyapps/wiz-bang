import { useLiveQuery } from "@tanstack/react-db";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";

export type AddressPoint = {
  publisher_id: string;
  address_id: string;
  coordinates: [number, number];
};

export function usePublisherAddressPoints(): AddressPoint[] | null {
  const { data } = useLiveQuery((q) => q.from({ p: publisherLocalCollection }));
  if (!data) return null;

  const points: AddressPoint[] = [];
  for (const publisher of data) {
    for (const address of publisher.address ?? []) {
      const coords = address.coordinates;
      if (Array.isArray(coords) && coords.length >= 2) {
        points.push({
          publisher_id: publisher.publisher_id,
          address_id: address.id,
          coordinates: [coords[0], coords[1]],
        });
      }
    }
  }
  return points;
}
