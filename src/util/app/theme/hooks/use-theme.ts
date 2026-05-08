import { getStoredTheme, getSystemTheme, setStoredTheme, applyTheme } from "@util/app/theme";
import type { ThemeMode } from "@util/app/theme/types";
import { useState, useEffect, useCallback } from "react";

export function useTheme() {
  const [theme_mode, set_theme_mode] = useState<ThemeMode>(() => getStoredTheme() ?? "auto");
  const [resolved_theme, set_resolved_theme] = useState<"light" | "dark">(() => {
    const stored = getStoredTheme();
    if (stored === "light") return "light";
    if (stored === "dark") return "dark";
    return getSystemTheme();
  });

  const setTheme = useCallback((mode: ThemeMode) => {
    setStoredTheme(mode);
    set_theme_mode(mode);
    applyTheme(mode);

    if (mode === "auto") {
      set_resolved_theme(getSystemTheme());
    } else {
      set_resolved_theme(mode);
    }
  }, []);

  useEffect(() => {
    const media_query = window.matchMedia("(prefers-color-scheme: dark)");

    const handle_change = () => {
      if (theme_mode === "auto") {
        set_resolved_theme(getSystemTheme());
        applyTheme("auto");
      }
    };

    media_query.addEventListener("change", handle_change);
    return () => media_query.removeEventListener("change", handle_change);
  }, [theme_mode]);

  return {
    theme_mode,
    resolved_theme,
    setTheme,
  };
}
