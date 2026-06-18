import { useState } from "react";
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { SuburbSelect } from "./suburb-select/SuburbSelect";
import type { Suburb } from "@shared/database/schemas/suburb";

type DoorToDoorModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
};

export function DoorToDoorModal({ isOpen, onDidDismiss }: DoorToDoorModalProps) {
  const [selectedSuburb, setSelectedSuburb] = useState<Suburb | undefined>();

  const handleSuburbSelect = (suburb: Suburb) => {
    setSelectedSuburb(suburb);
  };

  return (
    <ResponsiveModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Door to Door</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDidDismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <SuburbSelect
          label="Select Suburb"
          value={selectedSuburb}
          placeholder="Choose a suburb..."
          onSelect={handleSuburbSelect}
        />
      </IonContent>
    </ResponsiveModal>
  );
}
