import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { TextInput } from "@ui/components/inputs/text/TextInput";
import { SaveTextButton } from "@ui/components/inputs/button/text/save/SaveTextButton";
import { Space } from "@ui/components/layout/space/Space";
import { SuburbSelect } from "./suburb-select/SuburbSelect";
import { StreetSelect } from "./street-select/StreetSelect";
import { VisitTypeSelect } from "./components/visit-type-select/VisitTypeSelect";
import { useDoorToDoorForm } from "./use-door-to-door-form";

type DoorToDoorModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
};

export function DoorToDoorModal({ isOpen, onDidDismiss }: DoorToDoorModalProps) {
  const {
    selectedSuburb,
    selectedStreet,
    houseNumber,
    unitNumber,
    visitType,
    handleSuburbSelect,
    handleStreetSelect,
    handleHouseNumberChange,
    handleUnitNumberChange,
    handleVisitTypeChange,
  } = useDoorToDoorForm();

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
          label="Suburb"
          value={selectedSuburb}
          placeholder="Choose a suburb..."
          onSelect={handleSuburbSelect}
        />
        <StreetSelect
          label="Street"
          value={selectedStreet}
          placeholder="Choose a street..."
          disabled={!selectedSuburb}
          suburbId={selectedSuburb?.id}
          onSelect={handleStreetSelect}
        />
        <TextInput
          label="House Number"
          value={houseNumber}
          placeholder="Enter house number..."
          disabled={!selectedStreet}
          on_change={handleHouseNumberChange}
        />
        <TextInput
          label="Unit Number"
          value={unitNumber}
          placeholder="Enter unit number..."
          disabled={!houseNumber}
          on_change={handleUnitNumberChange}
        />
        <VisitTypeSelect
          value={visitType}
          disabled={!houseNumber}
          on_change={handleVisitTypeChange}
        />
        {houseNumber && <Space />}
        {houseNumber && <SaveTextButton on_click={onDidDismiss} />}
      </IonContent>
    </ResponsiveModal>
  );
}
