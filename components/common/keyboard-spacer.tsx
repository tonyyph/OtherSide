import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useAnimatedKeyboard } from "@/hooks";
import { memoFC } from "@/utils";

type Props = {};
export const KeyboardSpacer = memoFC(({}: Props) => {
  const { keyboardHeight } = useAnimatedKeyboard();
  const style = useAnimatedStyle(() => ({
    height: keyboardHeight.value
  }));

  return <Animated.View style={style} />;
});
