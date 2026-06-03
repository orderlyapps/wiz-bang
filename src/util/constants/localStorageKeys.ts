export const localStorageKeys = {
  themeMode: "theme_mode",
  fontSize: "font_size",
  authToken: "auth_token",
  mapViewLocation: "map_view",
  selectedCongregation: "selected_congregation",
  selectedPublisher: "selected_publisher",
} as const;

export const localStorageKeyWithVariant = (
  key: keyof typeof localStorageKeys,
  variant: string,
): string => `${localStorageKeys[key]}:${variant}`;
