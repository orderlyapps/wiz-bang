import { IonHeader, IonToolbar, IonTitle, IonButtons, IonIcon, IonButton } from "@ionic/react";
import { camera, cameraOutline } from "ionicons/icons";
import { AddIconButton } from "@ui/components/inputs/button/icon/add/AddIconButton";

type Props = {
  is_map: boolean;
  screenshotMode: boolean;
  can_add: boolean;
  onToggleScreenshot: () => void;
  onAddClick: () => void;
};

export function MapMenuHeader({
  is_map,
  screenshotMode,
  can_add,
  onToggleScreenshot,
  onAddClick,
}: Props) {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>Edit</IonTitle>
        <IonButtons slot="end">
          {is_map && (
            <IonButton
              fill="clear"
              color={screenshotMode ? "primary" : "medium"}
              onClick={onToggleScreenshot}
            >
              <IonIcon slot="icon-only" icon={screenshotMode ? camera : cameraOutline} />
            </IonButton>
          )}
          {can_add && !screenshotMode && <AddIconButton on_click={onAddClick} />}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}
