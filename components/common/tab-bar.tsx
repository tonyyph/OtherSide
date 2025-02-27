import { cn } from "@/lib/utils";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import {
  BookmarkIcon,
  CompassIcon,
  HouseIcon,
  type LucideIcon,
  UserCircle
} from "lucide-react-native";
import { rem } from "nativewind";
import {
  Pressable,
  type PressableProps,
  View,
  TouchableWithoutFeedback
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { useEffect, useRef } from "react";
import { useUserSettingsStore } from "@/stores/user-settings/store";

type TabBarItemProps = {
  focused: boolean;
  icon: LucideIcon;
  descriptor: BottomTabBarProps["descriptors"][string];
};

function TabBarItem({
  icon: Icon,
  focused,
  descriptor,
  ...props
}: TabBarItemProps & PressableProps) {
  const { options } = descriptor;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={focused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      className={"h-12 w-12 items-center justify-center"}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      {...props}
    >
      <Icon
        className={cn(
          "size-6",
          focused ? "text-primary-foreground" : "text-muted-foreground"
        )}
      />
    </Pressable>
  );
}

const TAB_BAR_ICONS = {
  index: HouseIcon,
  explore: CompassIcon,
  bookmarks: BookmarkIcon,
  profile: UserCircle
};

const TAB_BAR_ITEM_WIDTH = (3 + 1) * rem.get();

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const tabIndicatorPosition = useSharedValue(state.index * TAB_BAR_ITEM_WIDTH);
  const tabBarTranslateY = useSharedValue(0);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);
  const { hideTabBarStatus, setHideTabBarStatus } = useUserSettingsStore();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tabIndicatorPosition.value }]
  }));

  const tabBarStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(state.index !== 0 ? 0 : tabBarTranslateY.value, {
          duration: 450
        })
      }
    ]
  }));

  function showTabBar() {
    tabBarTranslateY.value = 0;

    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      tabBarTranslateY.value = 100;
      setHideTabBarStatus(true);
    }, 4500);
  }

  useEffect(() => {
    if (!hideTabBarStatus) {
      showTabBar();
    }
  }, [hideTabBarStatus, showTabBar]);

  useEffect(() => {
    hideTimer.current = setTimeout(() => {
      tabBarTranslateY.value = 100;
      setHideTabBarStatus(true);
    }, 4500);

    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [setHideTabBarStatus]);

  return (
    <View className="bg-transparent flex">
      <Animated.View
        style={[tabBarStyle]}
        className="absolute bottom-9 flex-row items-center justify-center gap-3 self-center rounded-2xl border border-border bg-background p-2"
      >
        <Animated.View
          style={[animatedStyle]}
          className="absolute left-2 h-12 w-12 rounded-xl bg-primary"
        />
        <View className="flex-row items-center gap-4">
          {state.routes.map((route, index) => {
            function onPress() {
              Haptics.selectionAsync();

              tabIndicatorPosition.value = withTiming(
                index * TAB_BAR_ITEM_WIDTH,
                { duration: 300 }
              );

              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true
              });

              if (state.index !== index && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }

              showTabBar();
            }

            function onLongPress() {
              navigation.emit({
                type: "tabLongPress",
                target: route.key
              });
            }

            return (
              <TabBarItem
                key={route.key}
                icon={TAB_BAR_ICONS[route.name as keyof typeof TAB_BAR_ICONS]}
                focused={state.index === index}
                descriptor={descriptors[route.key]}
                onPress={onPress}
                onLongPress={onLongPress}
              />
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
}
