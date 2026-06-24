import { useState, useRef } from "react";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonIcon,
} from "@ionic/react";
import { SaveTextButton } from "@ui/components/inputs/button/text/save/SaveTextButton";
import { TextButton } from "@ui/components/inputs/button/text/TextButton";
import { EditIconButton } from "@ui/components/inputs/button/icon/edit/EditIconButton";
import { AlertIconButton } from "@ui/components/inputs/button/icon/alert/AlertIconButton";
import { create } from "ionicons/icons";
import { DeleteIconButton } from "@ui/components/inputs/button/icon/delete/DeleteIconButton";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";
import { AddBlockFlow } from "./components/add-block-flow/AddBlockFlow";
import type {
  Block,
  SelectedMap,
} from "@proclaimer-content/pages/home/service-overseer/service-overseer-map/utils/types";
import { Body } from "@ui/components/display/text/body/Body";

type Props = {
  hasPendingChanges: boolean;
  onSave: () => void;
  selectedMap: SelectedMap | null;
  onDeselect: () => void;
  onEditBlock: (block: Block) => void;
  onDeleteBlock: (blockId: string) => void;
  onAddBlock: (type: "block" | "face", name: string) => void;
};

function MapMenu({
  hasPendingChanges,
  onSave,
  selectedMap,
  onDeselect,
  onEditBlock,
  onDeleteBlock,
  onAddBlock,
}: Props) {
  const menu_ref = useRef<HTMLIonMenuElement>(null);
  const [show_add_flow, set_show_add_flow] = useState(false);
  const blocks = selectedMap?.type === "map" ? selectedMap.blocks : null;
  const can_add = selectedMap?.type === "map";

  return (
    <IonMenu ref={menu_ref} side="end" contentId="map-content">
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
          <TextButton label="Save Changes" disabled={!hasPendingChanges} on_click={onSave} />

          {blocks
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .map((block) => (
              <IonItem key={block.id}>
                <IonLabel>
                  <Body>{block.name}</Body>
                  <Body color="medium" size="xs">
                    {" "}
                    {block.type}
                  </Body>
                </IonLabel>

                <IonButtons slot="end">
                  {hasPendingChanges ? (
                    <AlertIconButton
                      alert_header="Unsaved Changes"
                      alert_message="You have unsaved changes. Are you sure you want to edit this block?"
                      confirm_text="Edit Block"
                      on_click={() => onEditBlock(block)}
                    >
                      <IonIcon icon={create} />
                    </AlertIconButton>
                  ) : (
                    <EditIconButton on_click={() => onEditBlock(block)} />
                  )}
                  <DeleteIconButton on_click={() => onDeleteBlock(block.id)} />
                </IonButtons>
              </IonItem>
            ))}
        </IonList>

        {hasPendingChanges ? (
          <SaveTextButton
            label="Change Map"
            color="medium"
            alert_header="Unsaved Changes"
            alert_message="You have unsaved changes. Are you sure you want to change map?"
            confirm_text="Change Map"
            on_click={() => {
              void menu_ref.current?.close();
              onDeselect();
            }}
          />
        ) : (
          <TextButton
            label="Change Map"
            color="medium"
            on_click={() => {
              void menu_ref.current?.close();
              onDeselect();
            }}
          />
        )}
      </IonContent>
    </IonMenu>
  );
}

export default MapMenu;
