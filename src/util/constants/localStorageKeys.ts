export const localStorageKeys = {
  themeMode: "theme_mode",
  fontSize: "font_size",
  authToken: "auth_token",
  mapViewLocation: "map_view",
  selectedCongregation: "selected_congregation",
  selectedPublisher: "selected_publisher",
  filterSortPresets: "filter_sort_presets",
  filterSortActivePreset: "filter_sort_active_preset",
  publisherGenderFilter: "publisher_gender_filter",
  publisherSortOrder: "publisher_sort_order",
  screenshotSettings: "screenshot_settings",
  mapStyle: "map_style",
  customLocalStyleSettings: "custom_local_style_settings",
  doorToDoorForm: "door_to_door_form",
  recentMaps: "recent_maps",
  mapDisplayMode: "map_display_mode",
  selectedMapId: "selected_map_id",
  avFilterSortPresets: "av_filter_sort_presets",
  avFilterSortActivePreset: "av_filter_sort_active_preset",
} as const;

export const localStorageKeyWithVariant = (
  key: keyof typeof localStorageKeys,
  variant: string,
): string => `${localStorageKeys[key]}:${variant}`;
