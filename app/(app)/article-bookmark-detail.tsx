import { BottomSheet } from "@/components/common/bottom-sheet";
import { Icon } from "@/components/common/icon";
import { KeyboardSpacer } from "@/components/common/keyboard-spacer";
import { useEngagement } from "@/hooks/article/useEngagement";
import { formatDateTime } from "@/lib/date";
import { exactDesign } from "@/utils";
import { toast } from "@backpackapp-io/react-native-toast";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeftIcon,
  CalendarClock,
  MessageCircle,
  Rows4Icon,
  SendIcon,
  Share2Icon,
  ThumbsDown,
  ThumbsUp
} from "lucide-react-native";
import { useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  Platform,
  ScrollView,
  Share,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArticleDetailScreen from "./article-comment";

export default function ArticleBookmarkDetailScreen() {
  const { articleString } = useLocalSearchParams();
  const item = JSON.parse(articleString.toString());
  const [isLike, setIsLike] = useState(item?.isLike);
  const [isDislike, setIsDislike] = useState(item?.isDislike);
  const [likeCount, setLikeCount] = useState(item?.likeCount);
  const [dislikeCount, setDislikeCount] = useState(item?.dislikeCount);
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const [defaultImg, setDefaultImg] = useState(item?.imageUrl ?? "");
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [content, setContent] = useState("");
  const sheetRef = useRef<BottomSheetModal>(null);
  const keyboard = useAnimatedKeyboard();
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.height.value }]
    };
  });

  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToEnd = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const {
    onReactionLike,
    onReactionDisLike,
    onBookmark,
    onComment,
    onDeleteBookmark,
    data
  } = useEngagement();

  const handleLike = () => {
    if (isDislike) {
      setLikeCount(likeCount + 1);
      setDislikeCount(dislikeCount - 1);
    }
    if (!isDislike && !isLike) {
      setLikeCount(likeCount + 1);
    }
    setIsLike(true);
    setIsDislike(false);
    onReactionLike(item?.id);
  };
  const handleDislike = () => {
    if (isLike) {
      setDislikeCount(dislikeCount + 1);
      setLikeCount(likeCount - 1);
    }
    if (!isDislike && !isLike) {
      setDislikeCount(dislikeCount + 1);
    }
    setIsDislike(true);
    setIsLike(false);
    onReactionDisLike(item?.id);
  };

  async function handleShare({ title }: { title: string }) {
    try {
      await Share.share({
        message: `${title} ${"https://otherside-jet.vercel.app/get-app"} -via OtherSide India`,
        url: `https://otherside-jet.vercel.app/get-app`
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const commentCount = !!data ? data.comments?.length : item.commentCount;

  const onPressComment = () => {
    sheetRef.current?.present();
  };

  const handleBookmark = () => {
    if (isBookmarked) {
      onDeleteBookmark(item.id);
      setIsBookmarked(false);
    } else {
      onBookmark(item.id);
      setIsBookmarked(true);
    }
  };

  const onSendComment = () => {
    Keyboard.dismiss();
    onComment(item?.id, content);
    setContent("");
  };

  return (
    <View className="flex-1">
      <View
        className="p-2 rounded-full border border-blue-100 z-10 left-6 absolute bg-white"
        style={{ top: top }}
      >
        <TouchableOpacity onPress={router.back}>
          <ArrowLeftIcon className="text-background size-5" />
        </TouchableOpacity>
      </View>
      <View
        className={" flex-1 gap-3 bg-background justify-between"}
        style={{
          height: Platform.OS === "ios" ? height : height - 24,
          width: Dimensions.get("window").width
        }}
      >
        <View className="flex-1">
          <ImageBackground
            source={{
              uri: defaultImg
            }}
            onError={() => {
              setDefaultImg(
                "https://image5.photobiz.com/1592/14_20171212102313_8219173_large.jpg"
              );
            }}
            style={{ height: exactDesign(320) }}
            resizeMode="cover"
          >
            <View className="border p-2 gap-4 border-blue-100 rounded-full opacity-80 bottom-7 right-3 absolute bg-white">
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
            <View
              className="gap-4 flex-1"
              style={{
                maxHeight: height / 2
              }}
            >
              <View className="flex-row justify-between mt-4 gap-x-4">
                <View
                  style={{
                    backgroundColor:
                      (item?.perspectiveType ?? "left") === "right"
                        ? "#ef4444"
                        : "#3b82f6"
                  }}
                  className="rounded-full px-3 py-[2px] self-start top-1 items-center justify-center"
                >
                  <Text className="!text-sm !text-blue-50 font-semiBold">
                    {(item?.perspectiveType ?? "left") === "left"
                      ? "Left"
                      : "Right"}
                  </Text>
                </View>
                <Text
                  numberOfLines={2}
                  className="text-foreground font-bold text-xl flex-1"
                >
                  {item.title ?? "Unknown Title"}
                </Text>
              </View>
              {!!item.content ? (
                <Text
                  numberOfLines={20}
                  ellipsizeMode="tail"
                  className="flex-1 text-muted-foreground text-lg font-medium"
                >
                  {item.content}
                </Text>
              ) : (
                <Rows4Icon className="size-[200px] text-muted-foreground self-center top-20" />
              )}
            </View>

            <View className="flex flex-row items-center gap-2">
              <View
                className="h-[4px] bg-green-500 rounded-full"
                style={{
                  flex:
                    likeCount === dislikeCount
                      ? 1
                      : likeCount / (likeCount + dislikeCount)
                }}
              />
              <View
                className="h-[4px] bg-red-500 rounded-full"
                style={{
                  flex:
                    likeCount === dislikeCount
                      ? 1
                      : dislikeCount / (likeCount + dislikeCount)
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
                  <TouchableOpacity onPress={handleLike}>
                    <ThumbsUp
                      fill={isLike ? "#12d85a" : "none"}
                      strokeWidth={1}
                      className="size-6 text-green-400"
                    />
                  </TouchableOpacity>
                  <Text className="text-foreground text-sm">{likeCount}</Text>
                </View>
                <View className="flex flex-row items-center gap-1">
                  <TouchableOpacity onPress={handleDislike}>
                    <ThumbsDown
                      fill={isDislike ? "#ef4444" : "none"}
                      strokeWidth={1}
                      className="size-6 text-red-400"
                    />
                  </TouchableOpacity>
                  <Text className="text-foreground text-sm">
                    {dislikeCount}
                  </Text>
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
      <BottomSheet ref={sheetRef} index={0} snapPoints={["80%"]}>
        <Animated.View className="gap-3 flex-1 justify-between">
          <BottomSheetScrollView
            onContentSizeChange={() => {
              scrollToEnd();
            }}
            ref={scrollViewRef}
            style={{ flex: 1 }}
          >
            <ArticleDetailScreen id={item?.id} commentData={data?.comments} />
            <KeyboardSpacer />
          </BottomSheetScrollView>
          <Animated.View style={translateStyle} className="bg-muted p-4 pb-6">
            <View className="flex flex-row items-center gap-4 border border-border rounded-2xl bg-background pt-4">
              <TextInput
                className="line-clamp-1 min-h-12 flex-1 truncate rounded-full px-6  text-white"
                placeholder={`Enter you comment here...`}
                placeholderTextColor={"#9CA3AF"}
                autoCapitalize="none"
                multiline
                value={content}
                onChangeText={(text) => {
                  setContent(text);
                }}
              />
              <TouchableOpacity onPress={onSendComment}>
                <SendIcon className="size-6 text-foreground bottom-2 right-4" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </BottomSheet>
    </View>
  );
}
