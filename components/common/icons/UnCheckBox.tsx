import { View } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";
import { memoFC } from "@/utils";
import { useColorPalette } from "@/hooks/use-color-palette";

export const UnCheckBox = memoFC(
  ({ size = 28, style, ...props }: SvgProps & IconProps = {}) => {
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
            stroke={iconFill}
            fill={"transparent"}
            strokeWidth={1.5}
            fillRule="evenodd"
            d="M4.75 8A3.25 3.25 0 0 1 8 4.75h8A3.25 3.25 0 0 1 19.25 8v8A3.25 3.25 0 0 1 16 19.25H8A3.25 3.25 0 0 1 4.75 16V8Z"
            clipRule="evenodd"
          />
        </Svg>
      </View>
    );
  }
);
