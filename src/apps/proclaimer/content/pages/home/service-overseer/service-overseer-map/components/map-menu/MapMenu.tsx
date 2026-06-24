import { useState } from "react";
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
  IonButtons,
} from "@ionic/react";
import { EditIconButton } from "@ui/components/inputs/button/icon/edit/EditIconButton";
import { DeleteIconButton } from "@ui/components/inputs/button/icon/delete/DeleteIconButton";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";
import { AddBlockFlow } from "./components/add-block-flow/AddBlockFlow";
import type {
  Block,
  SelectedMap,
} from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/types";

type Props = {
  hasPendingChanges: boolean;
  onSave: () => void;
  selectedMap: SelectedMap | null;
  onEditBlock: (block: Block) => void;
  onDeleteBlock: (blockId: string) => void;
  onAddBlock: (type: "block" | "face", name: string) => void;
};

function MapMenu({
  hasPendingChanges,
  onSave,
  selectedMap,
  onEditBlock,
  onDeleteBlock,
  onAddBlock,
}: Props) {
  const [show_add_flow, set_show_add_flow] = useState(false);
  const blocks = selectedMap?.type === "map" ? selectedMap.blocks : null;
  const can_add = selectedMap?.type === "map";

  return (
    <IonMenu side="end" contentId="map-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Edit</IonTitle>
          {can_add && (
            <IonButtons slot="end">
              <AddIconButton on_click={() => set_show_add_flow(true)} />
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <AddBlockFlow
        is_open={show_add_flow}
        on_dismiss={() => set_show_add_flow(false)}
        on_add={(type, name) => {
          onAddBlock(type, name);
          set_show_add_flow(false);
        }}
      />
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
              <DeleteIconButton slot="end" on_click={() => onDeleteBlock(block.id)} />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

export default MapMenu;
