import { useState } from "react";
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton } from "@ionic/react";
import { ResponsiveModal } from "@ui/components/display/responsive-modal/ResponsiveModal";
import { TextInput } from "@ui/components/inputs/text/TextInput";
import { SuburbSelect } from "./suburb-select/SuburbSelect";
import { StreetSelect } from "./street-select/StreetSelect";
import type { Suburb } from "@shared/database/schemas/suburb";
import type { Street } from "@shared/database/schemas/street";

type DoorToDoorModalProps = {
  isOpen: boolean;
  onDidDismiss: () => void;
};

export function DoorToDoorModal({ isOpen, onDidDismiss }: DoorToDoorModalProps) {
  const [selectedSuburb, setSelectedSuburb] = useState<Suburb | undefined>();
  const [selectedStreet, setSelectedStreet] = useState<Street | undefined>();
  const [houseNumber, setHouseNumber] = useState("");
  const [unitNumber, setUnitNumber] = useState("");

  const handleSuburbSelect = (suburb: Suburb) => {
    setSelectedSuburb(suburb);
    setSelectedStreet(undefined); // Reset downstream values when suburb changes
    setHouseNumber("");
    setUnitNumber("");
  };

  const handleStreetSelect = (street: Street) => {
    setSelectedStreet(street);
    setHouseNumber(""); // Reset downstream values when street changes
    setUnitNumber("");
  };

  const handleHouseNumberChange = (value: string) => {
    setHouseNumber(value);
    setUnitNumber(""); // Reset unit number when house number changes
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
        <StreetSelect
          label="Select Street"
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
          disabled={!selectedStreet}
          on_change={setUnitNumber}
        />
      </IonContent>
    </ResponsiveModal>
  );
}
