import {
  Dimensions,
  FlatList,
  ImageBackground,
  LayoutChangeEvent,
  Pressable,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";

import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import {
  CalendarClock,
  MessageCircle,
  ThumbsDown,
  ThumbsUp
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUserSettingsStore } from "@/stores/user-settings/store";
import { Icon } from "@/components/common/icon";
import { useMemoFunc } from "@/hooks/commons/useMemoFunc";
import { CategoriesBar } from "@/components/common/categories-bar";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useDerivedValue,
  runOnJS
} from "react-native-reanimated";
import { dummyPosts } from "@/components/test/dummyPost";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { HomeSkeleton } from "@/components/skeleton/home-skeleton";

export default function HomeScreen() {
  const [activePostId, setActivePostId] = useState(dummyPosts[0].id);
  const [posts, setPosts] = useState<typeof dummyPosts>([]);
  const { height } = useWindowDimensions();
  const { i18n } = useLingui();
  const { top, bottom } = useSafeAreaInsets();
  const { setHideTabBarStatus, hideTabBarStatus } = useUserSettingsStore();
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  const tabBarTranslateY = useSharedValue(0);

  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  const [isExpanded, setIsExpanded] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const didSetExpanded = useRef(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setPosts(dummyPosts);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!hideTabBarStatus) {
      tabBarTranslateY.value = 0;
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => {
        runOnJS(() => {
          tabBarTranslateY.value = -120;
        })();
      }, 4500);
    }
  }, [hideTabBarStatus]);

  useEffect(() => {
    hideTimer.current = setTimeout(() => {
      tabBarTranslateY.value = -120;
      setHideTabBarStatus(true);
    }, 4500);

    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [setHideTabBarStatus]);

  const derivedTabBarTranslateY = useDerivedValue(
    () => tabBarTranslateY.value,
    []
  );

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: { itemVisiblePercentThreshold: 50 },
      onViewableItemsChanged: ({ viewableItems }: any) => {
        if (viewableItems?.length > 0 && viewableItems?.[0]?.isViewable) {
          setActivePostId(viewableItems[0].item.id);
        }
      }
    }
  ]);

  const tabBarStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(derivedTabBarTranslateY.value, {
          duration: 450
        })
      }
    ]
  }));

  const handleLayout = useMemoFunc((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height > 150) {
      setShowReadMore(true);
      if (!didSetExpanded.current) {
        setIsExpanded(false);
        didSetExpanded.current = true;
      }
    }
  });

  const renderHorizontalItem = ({ item }: { item: any }) => {
    return (
      <Pressable onPress={() => setHideTabBarStatus(false)}>
        <View
          onLayout={handleLayout}
          className={" flex-1 gap-3 justify-between"}
          style={{ height, width: Dimensions.get("window").width }}
        >
          <View
            className="flex-1"
            style={{ paddingTop: top, paddingBottom: bottom * 1.5 }}
          >
            <ImageBackground
              source={{ uri: item.imgUrl }}
              className="h-[300px]"
              resizeMode="cover"
            >
              <View className="border p-2 border-blue-100 rounded-full bottom-7 right-3 absolute bg-white">
                <TouchableOpacity onPress={() => setBookmarked(!bookmarked)}>
                  <Icon
                    name={bookmarked ? "BookmarkFilled" : "Bookmark"}
                    className="text-foreground"
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
            <View className="flex-1 bg-background rounded-t-2xl bottom-3 gap-4 px-4 justify-between">
              <View
                className="gap-4 flex-1"
                style={{ maxHeight: height * 0.55 }}
              >
                <View className="flex-row justify-between mt-4 gap-x-4">
                  <View
                    style={{
                      backgroundColor:
                        item?.side === "Left" ? "#3b82f6" : "#ef4444"
                    }}
                    className="rounded-full px-3 py-[2px] self-start top-1 items-center justify-center"
                  >
                    <Text className="!text-sm !text-blue-50 font-semiBold">
                      {item?.side}
                    </Text>
                  </View>
                  <Text
                    numberOfLines={2}
                    className="text-foreground font-bold text-lg flex-1"
                  >
                    {t(i18n)`${item.title}`}
                  </Text>
                </View>
                <Text
                  ellipsizeMode="tail"
                  className="flex-1 text-muted-foreground text-medium font-medium"
                >
                  {t(i18n)`${item.description}`}
                </Text>
              </View>

              <View className="flex flex-row items-center gap-2">
                <View
                  className="h-[4px] bg-red-500"
                  style={{ flex: item?.dislike / (item.dislike + item.like) }}
                />
                <View
                  className="h-[4px] bg-green-500"
                  style={{ flex: item?.like / (item.dislike + item.like) }}
                />
              </View>

              <View className="flex flex-row justify-between gap-2">
                <View className="flex flex-row items-center gap-2">
                  <CalendarClock className="size-5 text-muted-foreground" />
                  <Text className="text-foreground text-xs">
                    {"3 hours ago"}
                  </Text>
                </View>
                <View className="flex flex-row items-center gap-3">
                  <View className="flex flex-row items-center gap-2">
                    <ThumbsUp className="size-5 text-green-500" />
                    <Text className="text-foreground text-xs">{item.like}</Text>
                  </View>
                  <View className="flex flex-row items-center gap-2">
                    <ThumbsDown className="size-5 text-red-500" />
                    <Text className="text-foreground text-xs">
                      {item.dislike}
                    </Text>
                  </View>
                  <View className="flex flex-row items-center gap-2">
                    <MessageCircle className="size-5 text-muted-foreground" />
                    <Text className="text-foreground text-xs">
                      {item?.commentCount}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View className="flex-1">
        {!isContentLoaded && <HomeSkeleton />}
        <FlatList
          data={item?.option}
          horizontal
          renderItem={renderHorizontalItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          pagingEnabled
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          showsVerticalScrollIndicator={false}
          onContentSizeChange={(contentWidth, contentHeight) => {
            if (contentHeight > 0) {
              setIsContentLoaded(true);
            }
          }}
        />
      </View>
    );
  };

  // return <HomeSkeleton />;

  return (
    <View className=" flex-1 bg-background">
      <Animated.View
        style={[tabBarStyle]}
        className="absolute top-0 z-50 flex-row items-center justify-center self-center bg-background"
      >
        <CategoriesBar onPress={() => setHideTabBarStatus(false)} />
      </Animated.View>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        pagingEnabled
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
