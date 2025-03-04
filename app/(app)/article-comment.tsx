import { Button } from "@/components/ui/button";

import { Text } from "@/components/ui/text";
import { useEngagement } from "@/hooks/article/useEngagement";
import { formatDateTime } from "@/lib/date";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { SendIcon, XIcon } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle
} from "react-native-reanimated";
function getRandomAvatarUrl() {
  const urls = ["https://i.pravatar.cc/150?img=2"];
  return urls[Math.floor(Math.random() * urls.length)];
}
export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { i18n } = useLingui();
  const navigation = useNavigation();
  const { onComment, getEngagementArticles, data } = useEngagement();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!!id) {
      getEngagementArticles(id);
    }
  }, [id]);
  const [width, setWidth] = useState(Dimensions.get("window").width);
  const ref = useRef<ScrollView>(null);

  const keyboard = useAnimatedKeyboard();
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.height.value }]
    };
  });

  useEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      headerRight: () => (
        <Button
          size="icon"
          variant="ghost"
          onPress={() => {
            router.back();
          }}
        >
          <XIcon className="size-7 text-foreground" />
        </Button>
      )
    });
  }, []);

  const onPressComment = () => {
    onComment(id, content);
    setContent("");
  };

  // const onShowBottomSheet = () => {
  //   // navigation.navigate("article-comment");
  // };

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        ref={ref}
        horizontal
        pagingEnabled
        bounces={false}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="always"
        onMomentumScrollEnd={({ nativeEvent }) => {
          Keyboard.dismiss();
        }}
        showsHorizontalScrollIndicator={false}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      >
        <View style={{ width, flex: 1, justifyContent: "space-between" }}>
          <Animated.View className="flex-1 bg-background gap-3 justify-between">
            <View className="p-5 gap-4 justify-between">
              {React.Children.toArray(
                data?.comments?.map((comment, index) => (
                  <View>
                    <View className="flex flex-row items-center gap-4">
                      <Image
                        source={{ uri: getRandomAvatarUrl() }}
                        className="h-12 w-12 rounded-full border border-border"
                      />
                      <View className=" flex-1 mb-2">
                        <Text className="text-sm font-medium text-white">
                          {comment?.user?.email}
                        </Text>
                        <Text>{comment?.text}</Text>
                        <Text className="text-sm text-muted-foreground">
                          {formatDateTime?.(comment?.createdAt) ?? null}
                        </Text>
                      </View>
                      {/* <TouchableOpacity onPress={onShowBottomSheet}>
                        <EllipsisIcon className="size-7 text-foreground" />
                      </TouchableOpacity> */}
                    </View>
                    {data?.comments?.length > 1 &&
                      data?.comments?.length - 1 > index && (
                        <View className="h-[1px] bg-border mt-2" />
                      )}
                  </View>
                ))
              )}
            </View>
            <Animated.View style={translateStyle} className="bg-muted p-4 pb-6">
              <View className="flex flex-row items-center gap-4">
                <TextInput
                  className="line-clamp-1 h-14 flex-1 truncate border rounded-full px-6 border-border bg-black text-white"
                  placeholder={t(i18n)`Enter you comment here...`}
                  placeholderTextColor={"gray"}
                  autoCapitalize="none"
                  value={content}
                  onChangeText={(text) => {
                    setContent(text);
                  }}
                />
                <TouchableOpacity onPress={onPressComment}>
                  <SendIcon className="size-7 text-foreground" />
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
