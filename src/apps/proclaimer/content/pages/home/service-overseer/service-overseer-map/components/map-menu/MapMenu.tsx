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
import { Space } from "@ui/components/layout/space/Space";
import { AlertTextInput } from "@ui/components/inputs/alert-text/AlertTextInput";

type Props = {
  hasPendingChanges: boolean;
  onSave: () => void;
  selectedMap: SelectedMap | null;
  onDeselect: () => void;
  onEditBoundary: () => void;
  onUpdateMap: (name: string, details: string) => void;
  onDeleteMap: () => void;
  onEditBlock: (block: Block) => void;
  onDeleteBlock: (blockId: string) => void;
  onAddBlock: (type: "block" | "face", name: string) => void;
};

function MapMenu({
  hasPendingChanges,
  onSave,
  selectedMap,
  onDeselect,
  onEditBoundary,
  onUpdateMap,
  onDeleteMap,
  onEditBlock,
  onDeleteBlock,
  onAddBlock,
}: Props) {
  const menu_ref = useRef<HTMLIonMenuElement>(null);
  const [show_add_flow, set_show_add_flow] = useState(false);
  const blocks = selectedMap?.type === "map" ? selectedMap.blocks : null;
  const can_add = selectedMap?.type === "map";
  const is_map = selectedMap?.type === "map";

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
        {is_map && selectedMap?.type === "map" && (
          <>
            <AlertTextInput
              label="Name"
              value={selectedMap.name}
              on_change={(name) => onUpdateMap(name, selectedMap.details ?? "")}
            />
            <AlertTextInput
              label="Details"
              value={selectedMap.details ?? ""}
              placeholder="Add details..."
              on_change={(details) => onUpdateMap(selectedMap.name, details)}
            />
            <Space />
          </>
        )}
        <IonList>
          <TextButton label="Save Changes" disabled={!hasPendingChanges} on_click={onSave} />

          <Space />

          {is_map && (
            <IonItem>
              <IonLabel>
                <Body>Boundary</Body>
              </IonLabel>
              <IonButtons slot="end">
                {hasPendingChanges ? (
                  <AlertIconButton
                    alert_header="Unsaved Changes"
                    alert_message="You have unsaved changes. Are you sure you want to edit the boundary?"
                    confirm_text="Edit Boundary"
                    on_click={onEditBoundary}
                  >
                    <IonIcon icon={create} />
                  </AlertIconButton>
                ) : (
                  <EditIconButton on_click={onEditBoundary} />
                )}
                <DeleteIconButton
                  alert_header="Delete Map"
                  alert_message="Are you sure you want to permanently delete this map?"
                  confirm_text="Delete Map"
                  on_click={onDeleteMap}
                />
              </IonButtons>
            </IonItem>
          )}

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

        <Space />

        {hasPendingChanges ? (
          <SaveTextButton
            label="Finished"
            color="medium"
            alert_header="Unsaved Changes"
            alert_message="You have unsaved changes. Are you sure you want to change map?"
            confirm_text="Finish"
            on_click={() => {
              void menu_ref.current?.close();
              onDeselect();
            }}
          />
        ) : (
          <TextButton
            label="Finished"
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
