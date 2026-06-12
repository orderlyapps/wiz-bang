import { useState } from "react";
import { localStorageKeyWithVariant } from "@util/constants/localStorageKeys";
import type { ParticipationType } from "../../utils/participationTypeMap";

export type GenderFilter = "all" | "male" | "female";

export const filterLabels: Record<GenderFilter, string> = {
  all: "All",
  male: "Male",
  female: "Female",
};

function readStoredFilter(participation_type: ParticipationType | null): GenderFilter {
  if (!participation_type) return "all";
  const key = localStorageKeyWithVariant("publisherGenderFilter", participation_type);
  const stored = localStorage.getItem(key);
  if (stored === "all" || stored === "male" || stored === "female") {
    return stored;
  }
  return "all";
}

export function usePublisherFilter(participation_type: ParticipationType | null) {
  const [filter, set_filter] = useState<GenderFilter>(() => readStoredFilter(participation_type));

  function setFilter(newFilter: GenderFilter) {
    if (!participation_type) return;
    const key = localStorageKeyWithVariant("publisherGenderFilter", participation_type);
    localStorage.setItem(key, newFilter);
    set_filter(newFilter);
  }

  return { filter, setFilter };
}
