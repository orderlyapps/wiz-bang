import { useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import type { LngLatBoundsLike } from "mapbox-gl";
import { mapOutline as mapIcon } from "ionicons/icons";
import { MapListModal } from "../components/map-list-modal/MapListModal";

type Props = {
  onSelectBounds: (bounds: LngLatBoundsLike) => void;
};

export function ServiceOverseerMapHeader({ onSelectBounds }: Props) {
  const [show_maps, set_show_maps] = useState(false);

  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/home/service-overseer" />
        </IonButtons>
        <IonTitle>Map</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={() => set_show_maps(true)}>
            <IonIcon slot="icon-only" icon={mapIcon} />
          </IonButton>
          <IonMenuButton />
        </IonButtons>
      </IonToolbar>
      <MapListModal
        isOpen={show_maps}
        onDidDismiss={() => set_show_maps(false)}
        onSelectBounds={onSelectBounds}
      />
    </>
  );
}
