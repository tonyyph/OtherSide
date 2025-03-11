import { useEngagement } from "@/hooks/article/useEngagement";
import { formatDateTime } from "@/lib/date";
import { useUserSettingsStore } from "@/stores";
import { router } from "expo-router";
import {
  CalendarClock,
  MessageCircle,
  Share2Icon,
  ThumbsDown,
  ThumbsUp
} from "lucide-react-native";
import {
  Dimensions,
  ImageBackground,
  Platform,
  Pressable,
  Share,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../common/icon";
import { toast } from "../common/toast";
import { Text } from "../ui/text";
import { exactDesign } from "@/utils";

export const ArticleItem = ({ item }: any) => {
  const { height } = useWindowDimensions();
  const { setHideTabBarStatus } = useUserSettingsStore();
  const { top, bottom } = useSafeAreaInsets();
  const {
    onReactionLike,
    onReactionDisLike,
    onBookmark,
    onComment,
    getEngagementArticles,
    onDeleteBookmark,
    onDeleteDisLike,
    onDeleteLike,
    data
  } = useEngagement();

  async function handleShare({ title }: { title: string }) {
    try {
      await Share.share({
        message: `${title} ${"https://othersideindia.com"} -via OtherSide India`
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const like = !!data ? data.likesCount : item.likeCount;
  const dislike = !!data ? data.dislikesCount : item.dislikeCount;
  const commentCount = !!data ? data.comments?.length : item.commentCount;
  const totalReactionCount = like + dislike;
  const isBookmarked = !!data
    ? data.bookmarksCount === 0
      ? false
      : true
    : item.isBookmarked;

  const onPressComment = () => {
    router.push({
      pathname: "/article-comment",
      params: { id: item.id }
    });
  };

  const handleBookmark = () => {
    if (isBookmarked) {
      onDeleteBookmark(item.id);
    } else {
      onBookmark(item.id);
    }
  };

  return (
    <Pressable onPress={() => setHideTabBarStatus(false)}>
      <View
        className={" flex-1 gap-3 justify-between"}
        style={{
          height: Platform.OS === "ios" ? height : height - 24,
          width: Dimensions.get("window").width
        }}
      >
        <View className="flex-1">
          <ImageBackground
            source={{
              uri:
                item.imageUrl ??
                "https://reliasoftware.com/images/careers/relia-software-office.webp"
            }}
            // className="h-[360px]"
            style={{ height: exactDesign(360) }}
            resizeMode="cover"
          >
            <View className="border p-2 gap-4 border-blue-100 rounded-full bottom-7 right-3 absolute bg-white">
              <TouchableOpacity onPress={handleBookmark}>
                <Icon
                  name={isBookmarked ? "BookmarkFilled" : "Bookmark"}
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
            <View className="gap-4 flex-1" style={{ maxHeight: height * 0.44 }}>
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
                  {`${item.title}`}
                </Text>
              </View>
              <Text
                ellipsizeMode="tail"
                className="flex-1 text-muted-foreground text-lg font-medium"
              >
                {`${item.content}`}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <View
                className="h-[4px] bg-green-500"
                style={{
                  flex:
                    like === 0 && dislike === 0 ? 1 : like / totalReactionCount
                }}
              />
              <View
                className="h-[4px] bg-red-500"
                style={{
                  flex:
                    like === 0 && dislike === 0
                      ? 1
                      : dislike / totalReactionCount
                }}
              />
            </View>

            <View className="flex flex-row justify-between gap-2">
              <View className="flex flex-row items-center gap-2">
                <CalendarClock className="size-6 text-muted-foreground" />
                <Text className="text-foreground text-sm">
                  {formatDateTime?.(item?.createdAt) ?? null}
                </Text>
              </View>
              <View className="flex flex-row items-center gap-3">
                <View className="flex flex-row items-center gap-1">
                  <TouchableOpacity onPress={() => onReactionLike(item?.id)}>
                    <ThumbsUp className="size-6 text-green-500" />
                  </TouchableOpacity>
                  <Text className="text-foreground text-sm">{like}</Text>
                </View>
                <View className="flex flex-row items-center gap-1">
                  <TouchableOpacity onPress={() => onReactionDisLike(item?.id)}>
                    <ThumbsDown className="size-6 text-red-500" />
                  </TouchableOpacity>
                  <Text className="text-foreground text-sm">{dislike}</Text>
                </View>
                <View className="flex flex-row items-center gap-1">
                  <TouchableOpacity onPress={onPressComment}>
                    <MessageCircle className="size-6 text-muted-foreground" />
                  </TouchableOpacity>
                  <Text className="text-foreground text-sm">
                    {commentCount}
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
