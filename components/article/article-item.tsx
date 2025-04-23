import ArticleDetailScreen from "@/app/(app)/article-comment";
import { useEngagement } from "@/hooks/article/useEngagement";
import { formatDateTime } from "@/lib/date";
import { cn } from "@/lib/utils";
import { useUserAGuidingStore } from "@/stores/user-guiding/store";
import { exactDesign } from "@/utils";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import LottieView from "lottie-react-native";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarClock,
  MessageCircle,
  Rows4Icon,
  SendIcon,
  Share2Icon,
  ThumbsDown,
  ThumbsUp
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  Platform,
  Share,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle
} from "react-native-reanimated";
import Tooltip from "react-native-walkthrough-tooltip";
import { BottomSheet } from "../common/bottom-sheet";
import { Icon } from "../common/icon";
import { KeyboardSpacer } from "../common/keyboard-spacer";
import { toast } from "../common/toast";
import { Text } from "../ui/text";
import { useUserArticleStore } from "@/stores/user-article/store";

export const ArticleItem = ({
  item,
  contentHeight = 2.45,
  handleBookmark: changeBookmark,
  handleShare: handleShareArticle,
  isShowPerspective,
  onPressToPerspective
}: any) => {
  const { height } = useWindowDimensions();
  const { step, setStep } = useUserAGuidingStore();
  const [defaultImg, setDefaultImg] = useState(item?.imageUrl);
  const { isUpdateArticled } = useUserArticleStore();

  const nextStep = () => {
    setStep(step + 1);
  };
  const [content, setContent] = useState("");
  const [isLike, setIsLike] = useState(item?.isLike);
  const [isDislike, setIsDislike] = useState(item?.isDislike);
  const [likeCount, setLikeCount] = useState(item?.likeCount);
  const [dislikeCount, setDislikeCount] = useState(item?.dislikeCount);
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

  useEffect(() => {
    if (isUpdateArticled) {
      setLikeCount(item?.likeCount);
      setDislikeCount(item?.dislikeCount);
      setIsLike(item?.isLike);
      setIsDislike(item?.isDislike);
    }
  }, [
    item,
    isUpdateArticled,
    setLikeCount,
    setDislikeCount,
    setIsLike,
    setIsDislike
  ]);

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
      handleShareArticle("facebook, twitter, whatsapp", item.id);
      await Share.share({
        message: `${title} ${"https://otherside-jet.vercel.app/get-app"} -via OtherSide India`,
        url: `https://otherside-jet.vercel.app/get-app`
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const commentCount = !!data ? data.comments?.length : item.commentCount;
  const isBookmarked = item.isBookmarked;
  const onPressComment = () => {
    sheetRef.current?.present();
  };

  const handleBookmark = () => {
    changeBookmark();
    if (isBookmarked) {
      onDeleteBookmark(item.id);
    } else {
      onBookmark(item.id);
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
        className={" flex-1 gap-3 justify-between"}
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
                maxHeight: height / (isShowPerspective ? contentHeight : 2.2)
              }}
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
                  {item.title ?? "Unknown Title"}
                </Text>
              </View>
              {step === 1 && !!item?.content && (
                <View className="w-full rounded-xl absolute top-28">
                  <Tooltip
                    isVisible={step === 1}
                    tooltipStyle={styles.tooltipStyle}
                    onClose={() => {
                      nextStep();
                    }}
                    placement="top"
                    content={
                      <Text className="color-gray-950 text-bs">
                        Or you want to view a different approach to the article,
                        swipe left. If you want to return, simply swipe right.
                      </Text>
                    }
                  >
                    <View className="w-full mt-3 flex flex-row gap-2 rounded-xl justify-between bg-slate-700">
                      <LottieView
                        style={styles.lottieIcon}
                        source={require("@/assets/json/sleft.json")}
                        autoPlay
                        loop
                      />
                      <LottieView
                        style={styles.lottieIcon}
                        source={require("@/assets/json/sright.json")}
                        autoPlay
                        loop
                      />
                    </View>
                  </Tooltip>
                </View>
              )}
              {step === 2 && !!item?.content && (
                <View className="rounded-xl absolute items-center  top-16">
                  <Tooltip
                    isVisible={step === 2}
                    onClose={() => {
                      nextStep();
                    }}
                    placement="top"
                    content={
                      <Text className="color-gray-950 text-bs">
                        To move to the next article, simply swipe up. If you
                        want to go back to the previous one, just swipe down.
                        Happy reading!
                      </Text>
                    }
                  >
                    <View className="mt-3 items-center gap-2 rounded-xl justify-between bg-slate-700">
                      <LottieView
                        style={styles.lottieIcon}
                        source={require("@/assets/json/sup.json")}
                        autoPlay
                        loop
                      />
                      <LottieView
                        style={styles.lottieIcon}
                        source={require("@/assets/json/sdown.json")}
                        autoPlay
                        loop
                      />
                    </View>
                  </Tooltip>
                </View>
              )}

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
            {isShowPerspective && (
              <View
                className={cn(
                  "items-end px-1",
                  item?.side === "Right" && "items-start"
                )}
              >
                <Tooltip
                  isVisible={step === 0}
                  content={
                    <Text className="color-gray-950 text-bs">
                      You can tap here to view the other perspective of the
                      article.
                    </Text>
                  }
                  placement="bottom"
                  onClose={nextStep}
                >
                  <TouchableOpacity
                    onPress={onPressToPerspective}
                    className="flex-row bg-primary items-center gap-1 py-1 px-2 rounded-full"
                  >
                    {item?.side === "Right" ? (
                      <ArrowLeftIcon className="text-black size-5" />
                    ) : (
                      <ArrowRightIcon className="text-black size-5" />
                    )}
                    <Text className="text-black text-sm font-medium">
                      {item?.side === "Right"
                        ? "Left Perspective"
                        : "Right Perspective"}
                    </Text>
                  </TouchableOpacity>
                </Tooltip>
              </View>
            )}

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
};

const styles = StyleSheet.create({
  tooltipStyle: { width: "100%" },
  lottieIcon: {
    width: 120,
    height: 120
  }
});
