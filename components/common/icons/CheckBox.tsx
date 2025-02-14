import { View } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";
import { memoFC } from "@/utils";
import { useColorPalette } from "@/hooks/use-color-palette";

export const CheckBox = memoFC(
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
            fill={iconFill}
            d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Z"
          />
          <Path
            fill="black"
            d="M15.914 9.206a.583.583 0 0 0-.828 0l-4.346 4.351-1.826-1.831a.596.596 0 1 0-.828.857l2.24 2.24a.583.583 0 0 0 .828 0l4.76-4.76a.584.584 0 0 0 0-.857Z"
          />
        </Svg>
      </View>
    );
  }
);
