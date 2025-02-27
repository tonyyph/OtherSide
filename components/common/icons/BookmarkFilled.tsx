import { View } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";
import { memoFC } from "@/utils";
import { useColorPalette } from "@/hooks/use-color-palette";

export const BookmarkFilled = memoFC(
  ({ size = 20, style, ...props }: SvgProps & IconProps = {}) => {
    const { getColor } = useColorPalette();

    const iconFill = getColor("--primary");
    return (
      <View style={[{ width: size, height: size }, style]}>
        <Svg
          width={size}
          height={size}
          fill="none"
          {...props}
          viewBox="0 0 48 48"
        >
          <Path
            fill={"#0077db"}
            fillRule="evenodd"
            d="M36.5 43c-.309 0-.616-.095-.876-.283L24 34.348l-11.624 8.369A1.5 1.5 0 0 1 10 41.5v-30C10 7.916 12.916 5 16.5 5h15c3.584 0 6.5 2.916 6.5 6.5v30a1.499 1.499 0 0 1-1.5 1.5z"
            clipRule="evenodd"
          />
        </Svg>
      </View>
    );
  }
);
