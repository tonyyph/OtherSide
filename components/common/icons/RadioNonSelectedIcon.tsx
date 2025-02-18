import { View } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";
import { memoFC } from "@/utils";
import { useColorPalette } from "@/hooks/use-color-palette";

export const RadioNonSelectedIcon = memoFC(
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
            fill={"black"}
            stroke={iconFill}
            strokeWidth={1.5}
            d="M4.75 12a7.25 7.25 0 1 1 14.5 0 7.25 7.25 0 0 1-14.5 0Z"
          />
        </Svg>
      </View>
    );
  }
);
