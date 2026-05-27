import {
  DEFAULT_FONT_SIZE,
  applyFontSize,
  getStoredFontSize,
  setStoredFontSize,
} from "@util/app/font-size/utils";
import type { FontSize } from "@util/app/font-size/types";
import { useState } from "react";

export function useFontSize() {
  const [font_size, set_font_size] = useState<FontSize>(
    () => getStoredFontSize() ?? DEFAULT_FONT_SIZE,
  );

  const setFontSize = (size: FontSize) => {
    setStoredFontSize(size);
    set_font_size(size);
    applyFontSize(size);
  };

  return {
    font_size,
    setFontSize,
  };
}
