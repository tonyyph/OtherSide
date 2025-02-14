import { View } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";
import { memoFC } from "@/utils";
import { useColorPalette } from "@/hooks/use-color-palette";

export const Bookmark = memoFC(
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
          viewBox="0 0 24 24"
        >
          <Path
            fill={"#0077db"}
            fillRule="evenodd"
            d="M7 4a1 1 0 0 0-1 1v14.057l5.419-3.87a1 1 0 0 1 1.162 0L18 19.056V5a1 1 0 0 0-1-1H7ZM4.879 2.879A3 3 0 0 1 7 2h10a3 3 0 0 1 3 3v16a1 1 0 0 1-1.581.814L12 17.229l-6.419 4.585A1 1 0 0 1 4 21V5a3 3 0 0 1 .879-2.121Z"
            clipRule="evenodd"
          />
        </Svg>
      </View>
    );
  }
);
