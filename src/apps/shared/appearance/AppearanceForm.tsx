import { useFontSize } from "@util/app/font-size/hooks/use-font-size";
import { FontSizeSelector } from "@util/app/font-size/font-size-selector/FontSizeSelector";
import { useTheme } from "@util/app/theme/hooks/use-theme";
import { ThemeSelector } from "@util/app/theme/theme-selector/ThemeSelector";

export function AppearanceForm() {
  const { font_size, setFontSize } = useFontSize();
  const { theme_mode, setTheme } = useTheme();

  return (
    <>
      <ThemeSelector value={theme_mode} onChange={setTheme} />
      <FontSizeSelector value={font_size} onChange={setFontSize} />
    </>
  );
}
