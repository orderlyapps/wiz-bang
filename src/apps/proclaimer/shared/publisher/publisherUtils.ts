import { localStorageKeys } from "@util/constants/localStorageKeys";
import type { Publisher } from "@shared/database/schemas/publisher";

export function getStoredPublisher(): Publisher | null {
  const stored = localStorage.getItem(localStorageKeys.selectedPublisher);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as Publisher;
  } catch {
    return null;
  }
}

export function setStoredPublisher(publisher: Publisher): void {
  localStorage.setItem(localStorageKeys.selectedPublisher, JSON.stringify(publisher));
}

export function clearStoredPublisher(): void {
  localStorage.removeItem(localStorageKeys.selectedPublisher);
}

export function hasSelectedPublisher(): boolean {
  return getStoredPublisher() !== null;
}

export function getPublisherDisplayName(publisher: Publisher): string {
  const given = publisher.display_name ?? publisher.first_name;
  return `${given} ${publisher.last_name}`;
}
