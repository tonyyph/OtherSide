import { View } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";
import { memoFC } from "@/utils";
import { useColorPalette } from "@/hooks/use-color-palette";

export const Heart = memoFC(
  ({ size = 24, style, ...props }: SvgProps & IconProps = {}) => {
    const { getColor } = useColorPalette();

    const iconFill = getColor("--primary");
    return (
      <View style={[{ width: size, height: size }, style]}>
        <Svg
          width={size}
          height={size}
          fill="none"
          {...props}
          viewBox="0 0 24 24"
        >
          <Path
            fill={iconFill}
            fillRule="evenodd"
            d="M20.177 5.005a6.29 6.29 0 0 0-8.162-.64 6.27 6.27 0 0 0-10.01 5.28 6.276 6.276 0 0 0 1.847 4.207l6.212 6.224a2.78 2.78 0 0 0 3.901 0l6.212-6.225a6.276 6.276 0 0 0 0-8.846Zm-1.41 7.466-6.212 6.214a.759.759 0 0 1-1.08 0L5.262 12.44a4.294 4.294 0 0 1 0-6.005 4.27 4.27 0 0 1 6.001 0 1 1 0 0 0 1.42 0 4.27 4.27 0 0 1 6.002 0 4.294 4.294 0 0 1 .08 6.005v.03Z"
            clipRule="evenodd"
          />
        </Svg>
      </View>
    );
  }
);
