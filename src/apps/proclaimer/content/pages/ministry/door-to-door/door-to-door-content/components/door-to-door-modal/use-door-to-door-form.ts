import { useEffect, useState } from "react";
import { loadDoorToDoorForm, saveDoorToDoorForm } from "./door-to-door-form-storage";
import type { Suburb } from "@shared/database/schemas/suburb";
import type { Street } from "@shared/database/schemas/street";

function belongsToSuburb(street: Street, suburb?: Suburb): boolean {
  return !!suburb && street.suburb_id === suburb.id;
}

function getInitialState() {
  const stored = loadDoorToDoorForm();
  const suburb = stored?.suburb;
  const street =
    stored?.street && belongsToSuburb(stored.street, suburb) ? stored.street : undefined;
  return {
    suburb,
    street,
    house_number: street ? (stored?.house_number ?? "") : "",
    unit_number: street ? (stored?.unit_number ?? "") : "",
  };
}

export type UseDoorToDoorFormResult = {
  selectedSuburb: Suburb | undefined;
  selectedStreet: Street | undefined;
  houseNumber: string;
  unitNumber: string;
  handleSuburbSelect: (suburb: Suburb) => void;
  handleStreetSelect: (street: Street) => void;
  handleHouseNumberChange: (value: string) => void;
  handleUnitNumberChange: (value: string) => void;
};

export function useDoorToDoorForm(): UseDoorToDoorFormResult {
  const initialState = getInitialState();
  const [selectedSuburb, setSelectedSuburb] = useState<Suburb | undefined>(initialState.suburb);
  const [selectedStreet, setSelectedStreet] = useState<Street | undefined>(initialState.street);
  const [houseNumber, setHouseNumber] = useState(initialState.house_number);
  const [unitNumber, setUnitNumber] = useState(initialState.unit_number);

  useEffect(() => {
    saveDoorToDoorForm({
      suburb: selectedSuburb,
      street: selectedStreet,
      house_number: houseNumber,
      unit_number: unitNumber,
    });
  }, [selectedSuburb, selectedStreet, houseNumber, unitNumber]);

  function handleSuburbSelect(suburb: Suburb) {
    setSelectedSuburb(suburb);
    setSelectedStreet(undefined);
    setHouseNumber("");
    setUnitNumber("");
  }

  function handleStreetSelect(street: Street) {
    setSelectedStreet(street);
    setHouseNumber("");
    setUnitNumber("");
  }

  function handleHouseNumberChange(value: string) {
    setHouseNumber(value);
    setUnitNumber("");
  }

  function handleUnitNumberChange(value: string) {
    setUnitNumber(value);
  }

  return {
    selectedSuburb,
    selectedStreet,
    houseNumber,
    unitNumber,
    handleSuburbSelect,
    handleStreetSelect,
    handleHouseNumberChange,
    handleUnitNumberChange,
  };
}
