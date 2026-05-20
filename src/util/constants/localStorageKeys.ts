export const localStorageKeys = {
  themeMode: "theme_mode",
  authToken: "auth_token",
  mapViewLocation: "map_view",
} as const;

export const localStorageKeyWithVariant = (
  key: keyof typeof localStorageKeys,
  variant: string,
): string => `${localStorageKeys[key]}:${variant}`;
