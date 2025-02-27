import {
  Dimensions,
  FlatList,
  ImageBackground,
  LayoutChangeEvent,
  Pressable,
  Share,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";

import { Icon } from "@/components/common/icon";
import { toast } from "@/components/common/toast";
import { HomeSkeleton } from "@/components/skeleton/home-skeleton";
import { dummyPosts } from "@/components/test/dummyPost";
import { useMemoFunc } from "@/hooks/commons/useMemoFunc";
import { formatDateTime } from "@/lib/date";
import { useUserSettingsStore } from "@/stores";
import { useUserBookmarkStore } from "@/stores/user-bookmark/store";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { router } from "expo-router";
import {
  CalendarClock,
  MessageCircle,
  Share2Icon,
  ThumbsDown,
  ThumbsUp
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FooterGradient } from "@/components/common/footer-gradient";

export default function HomeScreen() {
  const [activePostId, setActivePostId] = useState();
  const [posts, setPosts] = useState<any>([]);
  const { height } = useWindowDimensions();
  const { i18n } = useLingui();
  const { top, bottom } = useSafeAreaInsets();
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const { setHideTabBarStatus, hideTabBarStatus } = useUserSettingsStore();
  const { addBookmark } = useUserBookmarkStore();
  const [isExpanded, setIsExpanded] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const didSetExpanded = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setPosts(dummyPosts?.articles);
    };
    fetchPosts();
  }, []);

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

  async function handleShare({ title }: { title: string }) {
    try {
      await Share.share({
        message: `${title} ${"https://otherside.com"} -via OtherSide`
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  }

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
              source={{ uri: item.imageUrl }}
              className="h-[320px]"
              resizeMode="cover"
            >
              <View className="border p-2 gap-4 border-blue-100 rounded-full bottom-7 right-3 absolute bg-white">
                <TouchableOpacity
                  onPress={() => {
                    setBookmarked(!bookmarked);
                    addBookmark(item);
                  }}
                >
                  <Icon
                    name={bookmarked ? "BookmarkFilled" : "Bookmark"}
                    className="text-foreground"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleShare({ title: item.title })}
                >
                  <Share2Icon className="text-background size-5" />
                </TouchableOpacity>
              </View>
            </ImageBackground>
            <View className="flex-1 bg-background rounded-t-2xl bottom-3 gap-4 px-4">
              <View
                className="gap-4 flex-1"
                style={{ maxHeight: height * 0.44 }}
              >
                <View className="flex-row justify-between mt-4 gap-x-4">
                  <View
                    style={{
                      backgroundColor:
                        item?.side === "Right" ? "#ef4444" : "#3b82f6"
                    }}
                    className="rounded-full px-3 py-[2px] self-start top-1 items-center justify-center"
                  >
                    <Text className="!text-sm !text-blue-50 font-semiBold">
                      {item?.side ?? "Left"}
                    </Text>
                  </View>
                  <Text
                    numberOfLines={2}
                    className="text-foreground font-bold text-xl flex-1"
                  >
                    {t(i18n)`${item.title}`}
                  </Text>
                </View>
                <Text
                  ellipsizeMode="tail"
                  className="flex-1 text-muted-foreground text-lg font-medium"
                >
                  {t(i18n)`${item.content}`}
                </Text>
              </View>

              <View className="flex flex-row items-center gap-2">
                <View
                  className="h-[4px] bg-green-500"
                  style={{
                    flex: item?.likeCount / (item.dislikeCount + item.likeCount)
                  }}
                />
                <View
                  className="h-[4px] bg-red-500"
                  style={{
                    flex:
                      item?.dislikeCount / (item.dislikeCount + item.likeCount)
                  }}
                />
              </View>

              <View className="flex flex-row justify-between gap-2">
                <View className="flex flex-row items-center gap-2">
                  <CalendarClock className="size-5 text-muted-foreground" />
                  <Text className="text-foreground text-xs">
                    {formatDateTime?.(item?.createdAt) ?? null}
                  </Text>
                </View>
                <View className="flex flex-row items-center gap-3">
                  <View className="flex flex-row items-center gap-1">
                    <ThumbsUp className="size-5 text-green-500" />
                    <Text className="text-foreground text-sm">
                      {item.likeCount}
                    </Text>
                  </View>
                  <View className="flex flex-row items-center gap-1">
                    <ThumbsDown className="size-5 text-red-500" />
                    <Text className="text-foreground text-sm">
                      {item.dislikeCount}
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="flex flex-row items-center justify-center gap-1"
                    onPress={() => router.push("/article-comment")}
                  >
                    <MessageCircle className="size-5 text-muted-foreground" />
                    <Text className="text-foreground text-sm">
                      {item?.commentCount}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const renderItem = ({ item }: { item: any }) => {
    const customData = [
      {
        ...item?.leftPerspective,
        side: "Left",
        isBookmarked: item?.isBookmarked,
        createdAt: item?.createdAt
      },
      {
        ...item?.rightPerspective,
        side: "Right",
        isBookmarked: item?.isBookmarked,
        createdAt: item?.createdAt
      }
    ];
    return (
      <View className="flex-1">
        {!isContentLoaded && <HomeSkeleton />}
        <FlatList
          data={customData}
          horizontal
          renderItem={renderHorizontalItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          onContentSizeChange={(contentHeight) => {
            if (contentHeight > 0) {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
              timeoutRef.current = setTimeout(() => {
                setIsContentLoaded(true);
              }, 500);
            }
          }}
        />
      </View>
    );
  };

  return (
    <View className=" flex-1 bg-background">
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        pagingEnabled
        ListEmptyComponent={() => <HomeSkeleton />}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        showsVerticalScrollIndicator={false}
      />
      <FooterGradient />
    </View>
  );
}
