import { useState } from "react";
import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { mapOutline } from "ionicons/icons";
import { useLiveQuery } from "@tanstack/react-db";
import type { Address } from "@shared/database/rxdb/collections/publisher";
import { publisherLocalCollection } from "@shared/database/collections/publisher-local";
import { suburbCollection } from "@shared/database/collections/suburb";
import { streetCollection } from "@shared/database/collections/street";
import { AddressInput } from "@ui/components/inputs/address/AddressInput";
import { LabelValueItem } from "@ui/components/display/data/label-value/LabelValueItem";
import type { AddressValue } from "@ui/components/inputs/address/types";
import { MapShareActionSheet } from "@proclaimer-content/pages/ministry/door-to-door/door-to-door-content/components/map-share-action-sheet/MapShareActionSheet";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

interface Props {
  publisher_id: string;
  address: NonNullable<Address>;
  read_only?: boolean;
}

export function AddressList({ publisher_id, address, read_only = false }: Props) {
  const { data: suburbs } = useLiveQuery((q) => q.from({ s: suburbCollection }));
  const { data: streets } = useLiveQuery((q) => q.from({ st: streetCollection }));
  const [share_coords, set_share_coords] = useState<{ lat: number; lng: number } | null>(null);

  function resolveName(
    value: string | undefined,
    lookup: { id?: string; name: string }[],
  ): { id: string; name: string } | undefined {
    if (!value) return undefined;
    if (UUID_RE.test(value)) {
      const found = lookup.find((s) => s.id === value);
      return found ? { id: found.id!, name: found.name } : { id: value, name: value };
    }
    return { id: value, name: value };
  }

  function toAddressValue(entry: (typeof address)[number]): AddressValue | undefined {
    const suburb = resolveName(entry.suburb, suburbs ?? []);
    if (!suburb) return undefined;
    const suburbRecord = suburbs?.find((s) => s.id === suburb.id);
    const street = resolveName(entry.street, streets ?? []);
    return {
      suburb: { id: suburb.id, name: suburb.name, bbox: suburbRecord?.bbox },
      street,
      house_number: entry.house_number,
      unit_number: entry.unit_number,
      coordinates: entry.coordinates,
    };
  }

  function formatDisplayValue(entry: (typeof address)[number]): string {
    const street = resolveName(entry.street, streets ?? []);
    const suburb = resolveName(entry.suburb, suburbs ?? []);
    const numberPart =
      entry.unit_number && entry.house_number
        ? `${entry.unit_number}/${entry.house_number}`
        : entry.unit_number || entry.house_number;
    const parts = [numberPart, street?.name, suburb?.name].filter(Boolean);
    return parts.join(" ") || "-";
  }

  return (
    <>
      {address.map((entry) =>
        read_only ? (
          <LabelValueItem
            key={entry.id}
            label={entry.label}
            value={formatDisplayValue(entry)}
            end_detail={
              entry.coordinates && entry.coordinates.length >= 2 ? (
                <IonButton
                  fill="clear"
                  size="small"
                  aria-label={`Share ${entry.label}`}
                  onClick={() =>
                    set_share_coords({
                      lat: entry.coordinates![1],
                      lng: entry.coordinates![0],
                    })
                  }
                >
                  <IonIcon slot="icon-only" icon={mapOutline} />
                </IonButton>
              ) : undefined
            }
          />
        ) : (
          <AddressInput
            key={entry.id}
            label={entry.label}
            value={toAddressValue(entry)}
            on_change={(value: AddressValue) =>
              publisherLocalCollection.update(publisher_id, (draft) => {
                const item = draft.address?.find((a) => a.id === entry.id);
                if (item) {
                  item.suburb = value.suburb.id;
                  item.street = value.street?.id ?? "";
                  item.house_number = value.house_number ?? "";
                  item.unit_number = value.unit_number ?? "";
                  item.coordinates = value.coordinates;
                }
              })
            }
          />
        ),
      )}
      {address.length === 0 && (
        <IonItem>
          <IonLabel color="medium">No addresses</IonLabel>
        </IonItem>
      )}
      <MapShareActionSheet
        lat={share_coords?.lat ?? 0}
        lng={share_coords?.lng ?? 0}
        is_open={share_coords !== null}
        on_dismiss={() => set_share_coords(null)}
      />
    </>
  );
}
