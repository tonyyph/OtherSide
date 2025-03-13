import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useAnimatedKeyboard } from "@/hooks";
import { memoFC } from "@/utils";

type Props = {
  value?: number;
};
export const KeyboardSpacer = memoFC(({ value = 0 }: Props) => {
  const { keyboardHeight } = useAnimatedKeyboard();
  const style = useAnimatedStyle(() => ({
    height: keyboardHeight.value - value
  }));

  return <Animated.View style={style} />;
});
