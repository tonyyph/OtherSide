import { type ColorKey, themeVariables } from "@/lib/theme";
// import { FeatureFlag, useFeatureFlag } from './use-feature-flag'
import { useColorScheme } from "./useColorScheme";

type GetColorOptions = {
  alpha?: number;
};

/**
 * Not able to use feature flag in burndown-chart somehow
 */
export function useColorPalette() {
  // const { colorScheme } = useColorScheme();
  // const isDynamicColorPaletteEnabled = useFeatureFlag(
  //   FeatureFlag.DynamicColorPalette,
  // )

  const getColor = (colorKey: ColorKey, options?: GetColorOptions) => {
    const { alpha = 1 } = options ?? {};
    return null;
  };

  return {
    getColor
  };
}
