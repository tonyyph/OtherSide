import { useNavigation } from "@react-navigation/native";
import React, {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle
} from "react";
import {
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { memoFC, SCREEN_HEIGHT } from "@/utils";
import { useMemoFunc, useMountedEffect } from "@/hooks";
import { CloseIcon } from "./icons";
import { BottomModalHeader } from "./bottom-modal-header";
import { TopIndicatorAvoidingView } from "./spacing-avoid-view";
import { cn } from "@/lib/utils";

type Props = PropsWithChildren<{
  title?: string;
  enableFullScreen?: boolean;
  noHeader?: boolean;
  hasTopBar?: boolean;
  saving?: boolean;
}>;
export const BottomModalScreen = memoFC(
  forwardRef<{ dismiss?: () => Promise<void> }, Props>(function Component(
    { title, hasTopBar = true, noHeader, children, saving = false }: Props,
    ref
  ) {
    const { goBack } = useNavigation();
    const prevSharedValue = useSharedValue(0);
    const sharedValue = useSharedValue(SCREEN_HEIGHT);

    const dismiss = useMemoFunc(async () => {
      return new Promise<void>((resolve) => {
        sharedValue.value = withTiming(SCREEN_HEIGHT, { duration: 300 }, () => {
          runOnJS(resolve)();
        });
      });
    });

    const onClose = useMemoFunc(() => {
      sharedValue.value = withTiming(SCREEN_HEIGHT, { duration: 300 }, () => {
        runOnJS(goBack)();
      });
    });

    useImperativeHandle(ref, () => {
      return {
        dismiss: dismiss
      };
    });

    const tap = Gesture.Pan()
      .failOffsetX([0, 0])
      .onStart(() => {
        prevSharedValue.value = sharedValue.value;
      })
      .onUpdate((event) => {
        sharedValue.value = Math.max(
          0,
          prevSharedValue.value + event.translationY
        );
      })
      .onEnd(() => {
        if (sharedValue.value > 100) {
          runOnJS(onClose)();
        } else {
          sharedValue.value = withTiming(0, { duration: 300 });
        }
      });

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: sharedValue.value }]
      };
    });

    const backgroundAnimatedStyle = useAnimatedStyle(() => ({
      opacity: interpolate(sharedValue.value, [0, SCREEN_HEIGHT], [1, 0])
    }));

    useMountedEffect(() => {
      sharedValue.value = withTiming(0, { duration: 300 });
    });

    const renderContent = () => {
      if (Platform.OS === "android") {
        return (
          <Animated.View
            className={cn(
              "bg-white rounded-tl-[24px] rounded-tr-[24px]",
              animatedStyle
            )}
          >
            {!noHeader && (
              <View className="flex-row p-4 items-center bg-gray-100 rounded-tl-[24px] rounded-tr-[24px]">
                <Text className="text-lg font-semibold">{title}</Text>
                <View className="flex-grow" />
                {saving && (
                  <Text className="text-xs text-gray-700 mr-1">Saving...</Text>
                )}
                <TouchableOpacity
                  onPress={onClose}
                  className="w-8 h-8 rounded-lg justify-center items-center bg-white"
                >
                  <CloseIcon size={16} />
                </TouchableOpacity>
              </View>
            )}
            {children}
          </Animated.View>
        );
      }
      return (
        <GestureDetector gesture={tap}>
          <Animated.View
            className={cn(
              "bg-white rounded-tl-[24px] rounded-tr-[24px]",
              animatedStyle
            )}
          >
            {!noHeader && <BottomModalHeader {...{ title, saving, onClose }} />}
            {children}
          </Animated.View>
        </GestureDetector>
      );
    };

    return (
      <>
        {hasTopBar && (
          <TopIndicatorAvoidingView
            style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
          />
        )}
        <View className="justify-end flex-1 bg-overlay">
          <Animated.View
            className={cn("absolute inset-0", backgroundAnimatedStyle)}
          >
            <Pressable className="flex-1" onPress={onClose} />
          </Animated.View>
          {renderContent()}
        </View>
      </>
    );
  })
);
