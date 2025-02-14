import { Animated, View, ViewStyle } from "react-native";
import { memoFC } from "@/utils";
import * as iconsList from "./icons";
export type IconNameType = keyof typeof iconsList;

export const icons = iconsList as Record<
  IconName,
  React.MemoExoticComponent<(props?: IconProps) => React.JSX.Element>
>;
export type IconComponentProps = IconProps & {
  name: IconName;
  wrapperStyle?: ViewStyle;
  showBadge?: boolean;
};

export const Icon = memoFC(
  ({ name, showBadge, wrapperStyle, ...rest }: IconComponentProps) => {
    if (!name) {
      return null;
    }
    const IconComponent = icons[name];
    return (
      <View style={wrapperStyle}>
        <IconComponent {...rest} />
        {!!showBadge && (
          <Animated.View className="w-3 h-3 border-[2px] bg-red-500 border-[#E5ECEF] absolute -top-1 -right-1 rounded-full" />
        )}
      </View>
    );
  }
);
