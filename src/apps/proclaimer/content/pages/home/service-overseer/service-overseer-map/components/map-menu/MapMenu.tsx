import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { EditIconButton } from "@ui/components/inputs/button/icon/edit/EditIconButton";
import type {
  Block,
  SelectedMap,
} from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/types";

type Props = {
  hasPendingChanges: boolean;
  onSave: () => void;
  selectedMap: SelectedMap | null;
  onEditBlock: (block: Block) => void;
};

function MapMenu({ hasPendingChanges, onSave, selectedMap, onEditBlock }: Props) {
  const blocks = selectedMap?.type === "map" ? selectedMap.blocks : null;

  return (
    <IonMenu side="end" contentId="map-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-wide">
        <IonList>
          <IonItem>
            <IonButton expand="block" disabled={!hasPendingChanges} onClick={onSave}>
              Save Changes
            </IonButton>
          </IonItem>
          {blocks?.map((block) => (
            <IonItem key={block.id}>
              <IonLabel>
                <h3>{block.name}</h3>
                <p>{block.type}</p>
              </IonLabel>
              <EditIconButton slot="end" on_click={() => onEditBlock(block)} />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

export default MapMenu;
