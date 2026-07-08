import { useState } from "react";
import { localStorageKeyWithVariant } from "@util/constants/localStorageKeys";
import type {
  MapLogFilterSortPreset,
  MapLogFilters,
  MapLogSortOrder,
  CheckoutFilter,
} from "./types";
import {
  DEFAULT_PRESET_IDS,
  DEFAULT_ACTIVE_PRESET_ID,
  defaultMapLogPresets,
} from "./defaultMapLogPresets";

export type { MapLogFilterSortPreset, MapLogFilters, MapLogSortOrder };

const VARIANT = "map_log";

const VALID_CHECKOUT_FILTERS = new Set<CheckoutFilter>([
  "any",
  "checked_out_only",
  "hide_checked_out",
]);
const VALID_SORT_ORDERS = new Set<MapLogSortOrder>([
  "alphabetical",
  "recent_activity",
  "oldest_activity",
]);

function isPreset(value: unknown): value is MapLogFilterSortPreset {
  if (typeof value !== "object" || value === null) return false;
  const p = value as Record<string, unknown>;
  if (typeof p.id !== "string" || typeof p.name !== "string") return false;
  if (typeof p.sort_order !== "string" || !VALID_SORT_ORDERS.has(p.sort_order as MapLogSortOrder))
    return false;
  if (typeof p.filter !== "object" || p.filter === null) return false;
  const f = p.filter as Record<string, unknown>;
  if (
    typeof f.checkout_filter !== "string" ||
    !VALID_CHECKOUT_FILTERS.has(f.checkout_filter as CheckoutFilter)
  )
    return false;
  if (typeof f.untagged_only !== "boolean") return false;
  if (!Array.isArray(f.tag_ids) || f.tag_ids.some((t) => typeof t !== "string")) return false;
  if (f.min_weeks_since_activity !== null && typeof f.min_weeks_since_activity !== "number")
    return false;
  return true;
}

function readStoredPresets(): MapLogFilterSortPreset[] {
  const stored = localStorage.getItem(
    localStorageKeyWithVariant("mapLogFilterSortPresets", VARIANT),
  );
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isPreset);
  } catch {
    return [];
  }
}

function writeStoredPresets(presets: MapLogFilterSortPreset[]) {
  localStorage.setItem(
    localStorageKeyWithVariant("mapLogFilterSortPresets", VARIANT),
    JSON.stringify(presets),
  );
}

function readActivePresetId(): string {
  return (
    localStorage.getItem(localStorageKeyWithVariant("mapLogFilterSortActivePreset", VARIANT)) ??
    DEFAULT_ACTIVE_PRESET_ID
  );
}

function writeActivePresetId(id: string) {
  localStorage.setItem(localStorageKeyWithVariant("mapLogFilterSortActivePreset", VARIANT), id);
}

export function useMapLogPresets() {
  const [user_presets, set_user_presets] = useState<MapLogFilterSortPreset[]>(() =>
    readStoredPresets(),
  );
  const [active_preset_id, set_active_preset_id] = useState<string>(() => readActivePresetId());

  const all_presets: MapLogFilterSortPreset[] = [...defaultMapLogPresets, ...user_presets];
  const active_preset =
    all_presets.find((p) => p.id === active_preset_id) ?? defaultMapLogPresets[0];
  const is_default_active = DEFAULT_PRESET_IDS.has(active_preset.id);

  function selectPreset(id: string) {
    writeActivePresetId(id);
    set_active_preset_id(id);
  }

  function createPreset(name: string) {
    const new_preset: MapLogFilterSortPreset = {
      id: crypto.randomUUID(),
      name,
      filter: active_preset.filter,
      sort_order: active_preset.sort_order,
    };
    const updated = [...user_presets, new_preset];
    writeStoredPresets(updated);
    set_user_presets(updated);
    writeActivePresetId(new_preset.id);
    set_active_preset_id(new_preset.id);
  }

  function renamePreset(id: string, name: string) {
    if (DEFAULT_PRESET_IDS.has(id)) return;
    const updated = user_presets.map((p) => (p.id === id ? { ...p, name } : p));
    writeStoredPresets(updated);
    set_user_presets(updated);
  }

  function deletePreset(id: string) {
    if (DEFAULT_PRESET_IDS.has(id)) return;
    const updated = user_presets.filter((p) => p.id !== id);
    writeStoredPresets(updated);
    set_user_presets(updated);
    if (active_preset_id === id) {
      writeActivePresetId(DEFAULT_ACTIVE_PRESET_ID);
      set_active_preset_id(DEFAULT_ACTIVE_PRESET_ID);
    }
  }

  function updatePreset(filter: MapLogFilters, sort_order: MapLogSortOrder) {
    if (DEFAULT_PRESET_IDS.has(active_preset.id)) return;
    const updated = user_presets.map((p) =>
      p.id === active_preset.id ? { ...p, filter, sort_order } : p,
    );
    writeStoredPresets(updated);
    set_user_presets(updated);
  }

  return {
    presets: all_presets,
    active_preset,
    is_default_active,
    selectPreset,
    createPreset,
    renamePreset,
    deletePreset,
    updatePreset,
  };
}
