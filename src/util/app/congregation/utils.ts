import { localStorageKeys } from "@util/constants/localStorageKeys";
import type { Congregation } from "@shared/database/schemas/congregation";

export function getStoredCongregation(): Congregation | null {
  const stored = localStorage.getItem(localStorageKeys.selectedCongregation);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as Congregation;
  } catch {
    return null;
  }
}

export function setStoredCongregation(congregation: Congregation): void {
  localStorage.setItem(localStorageKeys.selectedCongregation, JSON.stringify(congregation));
}

export function clearStoredCongregation(): void {
  localStorage.removeItem(localStorageKeys.selectedCongregation);
}

export function hasSelectedCongregation(): boolean {
  return getStoredCongregation() !== null;
}
