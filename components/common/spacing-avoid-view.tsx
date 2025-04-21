import { memoFC } from "@/utils";
import { Platform, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  style?: ViewStyle;
};

export const BottomIndicatorAvoidingView = memoFC(() => {
  const { bottom } = useSafeAreaInsets();

  return <View style={{ height: Platform.OS === "ios" ? bottom : 24 }} />;
});

export const TopIndicatorAvoidingView = memoFC(({ style }: Props) => {
  const { top } = useSafeAreaInsets();
  return <View style={[{ height: top }, style]} />;
});
