import { View } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";
import { memoFC } from "@/utils";
import { useColorPalette } from "@/hooks/use-color-palette";

export const CloseIcon = memoFC(
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
          viewBox="0 0 16 16"
        >
          <Path
            fill={iconFill}
            fillRule="evenodd"
            d="M12.471 3.529c.26.26.26.682 0 .942l-8 8a.667.667 0 1 1-.942-.943l8-8c.26-.26.682-.26.942 0Z"
            clipRule="evenodd"
          />
          <Path
            fill={iconFill}
            fillRule="evenodd"
            d="M3.529 3.529c.26-.26.682-.26.942 0l8 8a.667.667 0 1 1-.942.942l-8-8a.667.667 0 0 1 0-.942Z"
            clipRule="evenodd"
          />
        </Svg>
      </View>
    );
  }
);
